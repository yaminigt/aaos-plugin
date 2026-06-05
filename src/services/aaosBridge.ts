/**
 * aaosBridge.ts
 *
 * Transport layer between the AAOS plugin UI and the backend bridge server.
 *
 * Architecture:
 *   AAOS Plugin (browser)
 *     └─ aaosBridge (this file)
 *         ├─ REST  → POST /v2/aaos/request    (fire a GET or SET request)
 *         │          GET  /v2/aaos/latest      (poll latest signal value)
 *         └─ WS    → ws://localhost:3201       (live push from bridge server)
 *
 * TODO (future integration by SOME/IP team):
 *   The backend at localhost:3201 is responsible for translating the JSON
 *   request payloads arriving at POST /v2/aaos/request into actual SOME/IP
 *   messages and forwarding them to the Cuttlefish AAOS virtual device.
 *   Responses from the device arrive back via the WebSocket channel.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL = 'http://localhost:3201'
const WS_URL = 'ws://localhost:3201'

/** Reconnect delay steps (ms): 1s → 2s → 4s → 8s → 16s → cap at 30s */
const RECONNECT_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000]

/** Browser custom event name: UI listens to this to update signal values. */
export const AAOS_SIGNAL_UPDATE_EVENT = 'aaos:someip:value'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AaosBridgeRequestPayload = {
  signalName: string
  mode: 'get' | 'set'
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
    operations?: {
      get?: {
        id: string
        kind: string
        eventGroupId?: string
        transport?: string
        port?: string
        updateCycleMs?: number
      }
      set?: {
        id: string
        kind: string
        eventGroupId?: string
        transport?: string
        port?: string
        updateCycleMs?: number
      }
    }
  }
  requestedAt: string
}

export type AaosBridgeResponse = {
  signalName: string
  value: string | number | boolean | null
  timestamp: string
  source?: string
}

// ---------------------------------------------------------------------------
// WebSocket Manager (singleton)
// ---------------------------------------------------------------------------

let ws: WebSocket | null = null
let wsReconnectAttempt = 0
let wsEnabled = false

function logWs(message: string) {
  // Replace with your logging framework if needed.
  console.info(`[aaosBridge WS] ${message}`)
}

function dispatchSignalUpdate(detail: AaosBridgeResponse) {
  window.dispatchEvent(
    new CustomEvent(AAOS_SIGNAL_UPDATE_EVENT, { detail }),
  )
}

function scheduleReconnect() {
  const delay =
    RECONNECT_DELAYS[Math.min(wsReconnectAttempt, RECONNECT_DELAYS.length - 1)]
  wsReconnectAttempt++
  logWs(`Reconnecting in ${delay}ms (attempt ${wsReconnectAttempt})…`)
  setTimeout(() => {
    if (wsEnabled) connectWebSocket()
  }, delay)
}

/**
 * Connect to the backend WebSocket server.
 *
 * The server pushes AAOS signal updates as JSON objects matching
 * AaosBridgeResponse whenever the SOME/IP layer has new data.
 *
 * TODO (SOME/IP team): The bridge server should subscribe to SOME/IP
 *   eventgroups on startup and push decoded payloads over this channel.
 */
export function connectWebSocket(): WebSocket | null {
  if (typeof WebSocket === 'undefined') {
    logWs('WebSocket not available in this environment.')
    return null
  }

  wsEnabled = true

  try {
    ws = new WebSocket(WS_URL)
  } catch (err) {
    logWs(`Failed to construct WebSocket: ${err}`)
    scheduleReconnect()
    return null
  }

  ws.onopen = () => {
    wsReconnectAttempt = 0
    logWs('Connected to backend bridge server.')
  }

  ws.onmessage = (event: MessageEvent) => {
    try {
      const data: AaosBridgeResponse = JSON.parse(event.data as string)

      // Validate minimum required fields before dispatching.
      if (!data?.signalName) {
        logWs('Received message missing signalName — skipped.')
        return
      }

      logWs(
        `Signal update received: ${data.signalName} = ${data.value}`,
      )

      // TODO (SOME/IP team): If SOME/IP payload needs further decoding
      //   (e.g. byte array → float), do it here before dispatching.
      dispatchSignalUpdate(data)
    } catch {
      logWs('Failed to parse incoming WebSocket message.')
    }
  }

  ws.onerror = (event: Event) => {
    logWs(`WebSocket error: ${JSON.stringify(event)}`)
  }

  ws.onclose = (event: CloseEvent) => {
    logWs(
      `WebSocket closed (code: ${event.code}, reason: ${event.reason || 'none'}).`,
    )
    ws = null
    if (wsEnabled) scheduleReconnect()
  }

  return ws
}

/**
 * Disconnect from the WebSocket server and stop auto-reconnect.
 */
export function disconnectWebSocket() {
  wsEnabled = false
  if (ws) {
    ws.close()
    ws = null
  }
}

// ---------------------------------------------------------------------------
// REST API
// ---------------------------------------------------------------------------

/**
 * Send an AAOS signal GET or SET request to the bridge backend.
 *
 * Endpoint: POST http://localhost:3201/v2/aaos/request
 *
 * The backend is expected to translate this into a SOME/IP message and
 * forward it to the Cuttlefish AAOS image. The response will arrive either
 * as a REST response body or — for subscribed events — via the WebSocket.
 *
 * TODO (SOME/IP team): Wire the backend's POST handler to the vsomeip client
 *   so that the payload.someip fields are used to route the SOME/IP frame.
 */
export async function sendRequest(
  payload: AaosBridgeRequestPayload,
): Promise<AaosBridgeResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/v2/aaos/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error(
        `[aaosBridge] POST /v2/aaos/request failed: ${res.status} ${res.statusText}`,
      )
      return null
    }

    const data: AaosBridgeResponse = await res.json()

    // If the backend responds immediately with the value, dispatch the event
    // so the UI updates without waiting for a WebSocket push.
    if (data?.signalName && data.value !== undefined) {
      dispatchSignalUpdate(data)
    }

    return data
  } catch (err) {
    console.error(`[aaosBridge] sendRequest error:`, err)
    return null
  }
}

/**
 * Fetch the most recently received value for a given AAOS signal.
 *
 * Endpoint: GET http://localhost:3201/v2/aaos/latest?signal=<signalName>
 *
 * TODO (SOME/IP team): The backend should cache the last decoded value
 *   received from the SOME/IP layer per signal name and return it here.
 */
export async function getLatestResponse(
  signalName: string,
): Promise<AaosBridgeResponse | null> {
  try {
    const url = `${BASE_URL}/v2/aaos/latest?signal=${encodeURIComponent(signalName)}`
    const res = await fetch(url)

    if (!res.ok) {
      console.error(
        `[aaosBridge] GET /v2/aaos/latest failed: ${res.status} ${res.statusText}`,
      )
      return null
    }

    const data: AaosBridgeResponse = await res.json()
    return data
  } catch (err) {
    console.error(`[aaosBridge] getLatestResponse error:`, err)
    return null
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const aaosBridge = {
  sendRequest,
  getLatestResponse,
  connectWebSocket,
  disconnectWebSocket,
}

export default aaosBridge
