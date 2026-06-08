import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { WebSocketServer, WebSocket } from 'ws'

type SomeipMode = 'get' | 'set'

type AaosBridgeRequestPayload = {
  signalName: string
  mode: SomeipMode
  value?: string | number | boolean | null
  someip: {
    serviceId: string
    instanceId: string
    operationId?: string
    operationKind?: string
    eventGroupId?: string
    transport?: string
    port?: string
    updateCycleMs?: number
    operations?: Record<string, unknown>
  }
  requestedAt: string
}

type AaosBridgeResponse = {
  signalName: string
  value: string | number | boolean | null
  timestamp: string
  source: 'request' | 'latest' | 'websocket'
  requestId?: string
}

type RouteHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  body: string,
) => void | Promise<void>

type RouteDefinition = {
  method: 'GET' | 'POST'
  path: string
  handler: RouteHandler
}

const PORT = Number(process.env.PORT || 3201)
const ROUTES: RouteDefinition[] = []
const latestBySignal = new Map<string, AaosBridgeResponse>()
const clients = new Set<WebSocket>()

function log(message: string) {
  console.info(`[aaos-backend] ${message}`)
}

function sendJson(res: http.ServerResponse, statusCode: number, payload: unknown) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  })
  res.end(JSON.stringify(payload))
}

function readJsonBody(rawBody: string): AaosBridgeRequestPayload {
  return JSON.parse(rawBody) as AaosBridgeRequestPayload
}

function registerRoute(route: RouteDefinition) {
  ROUTES.push(route)
}

function matchRoute(method: string, pathname: string): RouteDefinition | undefined {
  return ROUTES.find((route) => route.method === method && route.path === pathname)
}

function broadcast(payload: AaosBridgeResponse) {
  const message = JSON.stringify(payload)
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  }
}

function stashLatest(payload: AaosBridgeResponse) {
  latestBySignal.set(payload.signalName, payload)
}

function normalizeResponse(payload: AaosBridgeRequestPayload): AaosBridgeResponse {
  const requestId = randomUUID()
  const value = payload.value ?? null

  return {
    signalName: payload.signalName,
    value,
    timestamp: new Date().toISOString(),
    source: 'request',
    requestId,
  }
}

function createLatestResponse(signalName?: string): AaosBridgeResponse | null {
  if (!signalName) {
    const first = latestBySignal.values().next().value as AaosBridgeResponse | undefined
    return first ?? null
  }
  return latestBySignal.get(signalName) ?? null
}

// Route registration mirrors the existing AAOS bridge contract.
registerRoute({
  method: 'POST',
  path: '/v2/aaos/request',
  handler: async (_req, res, body) => {
    try {
      const request = readJsonBody(body)

      // TODO: Forward request.someip to the Rust bridge at localhost:8080/config.
      // The Rust bridge will translate this into actual SOME/IP frames for Cuttlefish.
      const response = normalizeResponse(request)
      stashLatest(response)
      broadcast({ ...response, source: 'websocket' })

      sendJson(res, 200, response)
    } catch (err) {
      sendJson(res, 400, {
        error: 'Invalid request payload',
        message: err instanceof Error ? err.message : String(err),
      })
    }
  },
})

// Dedicated inbound value push endpoint.
// External sources (Rust bridge, test scripts, simulator) POST here to push
// a decoded signal value into the plugin UI via WebSocket broadcast.
// Body: { signalName: string, value: string | number | boolean | null, timestamp?: string }
registerRoute({
  method: 'POST',
  path: '/v2/aaos/update',
  handler: async (_req, res, body) => {
    try {
      const raw = JSON.parse(body) as {
        signalName?: string
        value?: string | number | boolean | null
        timestamp?: string
      }

      if (!raw.signalName) {
        sendJson(res, 400, { error: 'Missing required field: signalName' })
        return
      }

      const pushed: AaosBridgeResponse = {
        signalName: raw.signalName,
        value: raw.value !== undefined ? raw.value : null,
        timestamp: raw.timestamp || new Date().toISOString(),
        source: 'websocket',
      }

      stashLatest(pushed)
      broadcast(pushed)
      log(`Value pushed for ${pushed.signalName}: ${pushed.value}`)
      sendJson(res, 200, pushed)
    } catch (err) {
      sendJson(res, 400, {
        error: 'Invalid update payload',
        message: err instanceof Error ? err.message : String(err),
      })
    }
  },
})

registerRoute({
  method: 'GET',
  path: '/v2/aaos/latest',
  handler: (req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`)
    const signalName = url.searchParams.get('signal') || undefined
    const latest = createLatestResponse(signalName)

    if (!latest) {
      sendJson(res, 404, {
        error: 'No latest AAOS response available',
        signalName: signalName ?? null,
      })
      return
    }

    sendJson(res, 200, { ...latest, source: 'latest' })
  },
})

const server = http.createServer(async (req, res) => {
  const method = req.method || 'GET'
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    })
    res.end()
    return
  }

  const route = matchRoute(method, url.pathname)
  if (!route) {
    sendJson(res, 404, { error: 'Route not found' })
    return
  }

  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', async () => {
    await route.handler(req, res, body)
  })
})

const wss = new WebSocketServer({ server })

wss.on('connection', (socket) => {
  clients.add(socket)
  log(`WebSocket client connected. Total clients: ${clients.size}`)

  socket.on('message', (message) => {
    // Future bridge control messages can be handled here.
    log(`WebSocket message received: ${String(message)}`)
  })

  socket.on('close', () => {
    clients.delete(socket)
    log(`WebSocket client disconnected. Total clients: ${clients.size}`)
  })
})

server.listen(PORT, () => {
  log(`AAOS bridge server listening on http://localhost:${PORT}`)
  log('Routes registered: POST /v2/aaos/request, POST /v2/aaos/update, GET /v2/aaos/latest')
})

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    log(`Port ${PORT} is already in use. Set PORT to run the backend on a different port.`)
    process.exitCode = 1
    return
  }

  throw error
})
