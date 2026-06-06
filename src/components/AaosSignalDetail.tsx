import {
  AaosDataType,
  AaosSignal,
  getAaosFullPath,
  getAaosPropertyId,
} from '../data/aaos'
import { getCovesaMatchesForAaos } from '../data/aaos_covesa_matches'
import {
  getSomeipMatchForAaos,
} from '../data/aaos_someip_matches'
import { CheckIcon, CopyIcon, PlusIcon } from './icons'
import aaosBridge, {
  AAOS_SIGNAL_UPDATE_EVENT,
  LEGACY_AAOS_SIGNAL_UPDATE_EVENT,
} from '../services/aaosBridge'

const React: any = (globalThis as any).React
const { useEffect, useState } = React

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(' ')

// Map AAOS data types to the closest VSS-style datatype string accepted by the
// host wishlist API. The host stores `datatype` as a free-form string but
// normalising helps interop with downstream tools.
const dataTypeToVssDatatype = (dt: AaosDataType): string => {
  switch (dt) {
    case 'STRING':
      return 'string'
    case 'BOOLEAN':
      return 'boolean'
    case 'INT32':
      return 'int32'
    case 'INT32_VEC':
      return 'int32[]'
    case 'INT64':
      return 'int64'
    case 'INT64_VEC':
      return 'int64[]'
    case 'FLOAT':
      return 'float'
    case 'FLOAT_VEC':
      return 'float[]'
    case 'BYTES':
      return 'uint8[]'
    case 'MIXED':
    default:
      return 'string'
  }
}

const inferVssType = (signal: AaosSignal): string => {
  if (signal.access.includes('READ_WRITE') || signal.access.includes('WRITE')) {
    return 'actuator'
  }
  return 'sensor'
}

// Compose the VSS-style API name we'll register as a wishlist entry. Using the
// AAOS full path makes it easy to recognise alongside COVESA `Vehicle.*`
// signals (which the host already understands).
const toWishlistApiName = (signal: AaosSignal) =>
  `Aaos.${signal.area}.${signal.name}`

type CopyButtonProps = {
  text: string
  ariaLabel?: string
}

const CopyButton = ({ text, ariaLabel }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
      }
      setCopied(true)
    } catch {
      // Silently ignore — we still indicate failure by not switching state.
    }
  }

  return (
    <button
      type="button"
      className={cx('aaos-copy-btn', copied && 'is-done')}
      onClick={handleCopy}
      aria-label={ariaLabel || 'Copy'}
      title={copied ? 'Copied!' : 'Copy'}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

type Props = {
  signal: AaosSignal
  api?: any
  modelId?: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

type SomeipRequestPayload = {
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

type SomeipValueEventPayload = {
  signalName?: string
  value?: string | number | boolean | null
  timestamp?: string
}

const SOMEIP_REQUEST_EVENT = 'aaos:someip:request'

// Connect the WebSocket bridge once when the module first loads.
// The bridge auto-reconnects on disconnect.
aaosBridge.connectWebSocket()

const getSomeipModesFromAccess = (
  access: string[],
): Array<'get' | 'set'> => {
  const hasRead = access.includes('READ') || access.includes('READ_WRITE')
  const hasWrite = access.includes('WRITE') || access.includes('READ_WRITE')
  const modes: Array<'get' | 'set'> = []
  if (hasRead) modes.push('get')
  if (hasWrite) modes.push('set')
  return modes
}

const AaosSignalDetail = ({ signal, api, modelId }: Props) => {
  const [statusState, setStatus] = useState({ kind: 'idle' } as Status)
  const [someipModeState, setSomeipMode] = useState('get')
  const [editedServiceId, setEditedServiceId] = useState('')
  const [editedInstanceId, setEditedInstanceId] = useState('')
  const [editedEventId, setEditedEventId] = useState('')
  const [valueState, setValue] = useState('')
  const [receivedSomeipAt, setReceivedSomeipAt] = useState('')
  const [isRequestInFlight, setIsRequestInFlight] = useState(false)
  const status = statusState as Status
  const someipMode = someipModeState as 'get' | 'set'

  const someipMatch = getSomeipMatchForAaos(signal.name)
  const availableModes = getSomeipModesFromAccess(signal.access)
  const canGet = availableModes.includes('get')
  const canSet = availableModes.includes('set')
  const isValueEditable = canSet
  const someipOperation = someipMatch?.operations?.[someipMode]

  // Reset status and editable fields when the selected signal changes.
  useEffect(() => {
    setStatus({ kind: 'idle' })
    setSomeipMode('get')
    setEditedServiceId(someipMatch?.serviceId ?? '')
    setEditedInstanceId(someipMatch?.instanceId ?? '')
    setEditedEventId(
      someipMatch?.operations?.get?.id || someipMatch?.operations?.set?.id || '',
    )
    setValue('')
    setReceivedSomeipAt('')
    const nextMode = availableModes.includes('get')
      ? 'get'
      : availableModes.includes('set')
        ? 'set'
        : 'get'
    setSomeipMode(nextMode)
    setIsRequestInFlight(false)
  }, [signal.name])

  // Placeholder hookup for bridge communication: dispatch a browser event like
  // window.dispatchEvent(new CustomEvent('aaos:signal:update', { detail: { signalName: 'TIRE_PRESSURE', value: 221.4 } }))
  useEffect(() => {
    const onSomeipValue = (event: Event) => {
      const customEvent = event as CustomEvent<SomeipValueEventPayload>
      const detail = customEvent?.detail
      if (!detail?.signalName || detail.signalName !== signal.name) return
      setValue(detail.value === undefined ? '' : String(detail.value))
      setReceivedSomeipAt(detail.timestamp || new Date().toISOString())
      setIsRequestInFlight(false)
    }

    window.addEventListener(
      AAOS_SIGNAL_UPDATE_EVENT,
      onSomeipValue as EventListener,
    )
    window.addEventListener(
      LEGACY_AAOS_SIGNAL_UPDATE_EVENT,
      onSomeipValue as EventListener,
    )
    return () => {
      window.removeEventListener(
        AAOS_SIGNAL_UPDATE_EVENT,
        onSomeipValue as EventListener,
      )
      window.removeEventListener(
        LEGACY_AAOS_SIGNAL_UPDATE_EVENT,
        onSomeipValue as EventListener,
      )
    }
  }, [signal.name])

  const propertyId = getAaosPropertyId(signal)
  const fullPath = getAaosFullPath(signal)
  const wishlistApiName = toWishlistApiName(signal)
  const covesaMatches = getCovesaMatchesForAaos(signal.name)

  const wishlistAvailable =
    typeof api?.createWishlistApi === 'function' && !!modelId

  const handleSomeipGetClick = async () => {
    if (!canGet) return
    const operation = someipMatch?.operations?.get
    const requestPayload: SomeipRequestPayload = {
      signalName: signal.name,
      mode: 'get',
      someip: {
        serviceId: editedServiceId || someipMatch?.serviceId || '',
        instanceId: editedInstanceId || someipMatch?.instanceId || '',
        operationId: editedEventId || operation?.id,
        operationKind: operation?.kind,
        eventGroupId: operation?.eventGroupId,
        transport: operation?.transport,
        port: operation?.port,
        updateCycleMs: operation?.updateCycleMs,
        operations: {
          get: someipMatch?.operations?.get
            ? {
                id: someipMatch.operations.get.id,
                kind: someipMatch.operations.get.kind,
                eventGroupId: someipMatch.operations.get.eventGroupId,
                transport: someipMatch.operations.get.transport,
                port: someipMatch.operations.get.port,
                updateCycleMs: someipMatch.operations.get.updateCycleMs,
              }
            : undefined,
          set: someipMatch?.operations?.set
            ? {
                id: someipMatch.operations.set.id,
                kind: someipMatch.operations.set.kind,
                eventGroupId: someipMatch.operations.set.eventGroupId,
                transport: someipMatch.operations.set.transport,
                port: someipMatch.operations.set.port,
                updateCycleMs: someipMatch.operations.set.updateCycleMs,
              }
            : undefined,
        },
      },
      requestedAt: new Date().toISOString(),
    }

    setSomeipMode('get')
    setIsRequestInFlight(true)

    try {
      // Send GET request to the bridge backend (POST /v2/aaos/request).
      // If the backend responds with an immediate value it is dispatched
      // as 'aaos:signal:update' inside sendRequest; otherwise the value
      // arrives via the WebSocket push channel.
      // TODO (SOME/IP team): backend translates this payload to a SOME/IP frame
      //   using payload.someip fields (serviceId, instanceId, operationId, etc.)
      await aaosBridge.sendRequest(requestPayload)
    } catch (err: any) {
      setIsRequestInFlight(false)
      const message =
        err?.message || 'Failed to send SOME/IP GET request package.'
      setStatus({ kind: 'error', message })
    }

    window.dispatchEvent(
      new CustomEvent(SOMEIP_REQUEST_EVENT, {
        detail: requestPayload,
      }),
    )
  }

  const handleSomeipSetClick = async () => {
    if (!availableModes.includes('set')) return
    const operation = someipMatch?.operations?.set
    const requestPayload: SomeipRequestPayload = {
      signalName: signal.name,
      mode: 'set',
      value: valueState,
      someip: {
        serviceId: editedServiceId || someipMatch?.serviceId || '',
        instanceId: editedInstanceId || someipMatch?.instanceId || '',
        operationId: editedEventId || operation?.id,
        operationKind: operation?.kind,
        eventGroupId: operation?.eventGroupId,
        transport: operation?.transport,
        port: operation?.port,
        updateCycleMs: operation?.updateCycleMs,
        operations: {
          get: someipMatch?.operations?.get
            ? {
                id: someipMatch.operations.get.id,
                kind: someipMatch.operations.get.kind,
                eventGroupId: someipMatch.operations.get.eventGroupId,
                transport: someipMatch.operations.get.transport,
                port: someipMatch.operations.get.port,
                updateCycleMs: someipMatch.operations.get.updateCycleMs,
              }
            : undefined,
          set: someipMatch?.operations?.set
            ? {
                id: someipMatch.operations.set.id,
                kind: someipMatch.operations.set.kind,
                eventGroupId: someipMatch.operations.set.eventGroupId,
                transport: someipMatch.operations.set.transport,
                port: someipMatch.operations.set.port,
                updateCycleMs: someipMatch.operations.set.updateCycleMs,
              }
            : undefined,
        },
      },
      requestedAt: new Date().toISOString(),
    }

    setSomeipMode('set')
    setIsRequestInFlight(true)

    try {
      // Send SET request to the bridge backend (POST /v2/aaos/request).
      // payload.value carries the user-entered value to write.
      // TODO (SOME/IP team): backend translates this payload to a SOME/IP SET
      //   method call using payload.someip.operationId and payload.value.
      await aaosBridge.sendRequest(requestPayload)
    } catch (err: any) {
      setIsRequestInFlight(false)
      const message =
        err?.message || 'Failed to send SOME/IP SET request package.'
      setStatus({ kind: 'error', message })
    }

    window.dispatchEvent(
      new CustomEvent(SOMEIP_REQUEST_EVENT, {
        detail: requestPayload,
      }),
    )
  }

  const handleAddWishlist = async () => {
    if (!wishlistAvailable) return
    try {
      setStatus({ kind: 'loading' })
      await api.createWishlistApi({
        model: modelId,
        apiName: wishlistApiName,
        description: signal.description,
        type: inferVssType(signal),
        datatype: dataTypeToVssDatatype(signal.dataType),
        skeleton: wishlistApiName,
        isWishlist: true,
        ...(signal.unit ? { unit: signal.unit } : {}),
      })
      setStatus({
        kind: 'success',
        message: `Added "${wishlistApiName}" as a wishlist signal.`,
      })
    } catch (err: any) {
      const message =
        err?.message || 'Failed to add as wishlist signal. See host toast.'
      setStatus({ kind: 'error', message })
    }
  }

  const properties: Array<{ key: string; value: string }> = [
    { key: 'Signal', value: signal.name },
    { key: 'Group (Name)', value: signal.group },
    { key: 'Full Path', value: fullPath },
    { key: 'Property ID', value: propertyId },
    { key: 'Description', value: signal.description },
    { key: 'Change Mode', value: signal.changeMode },
    { key: 'Access', value: signal.access.join(', ') },
    { key: 'Vehicle Area', value: signal.area },
    { key: 'Data Type', value: signal.dataType },
    { key: 'VHAL Version', value: String(signal.version) },
  ]
  if (signal.unit) properties.push({ key: 'Unit', value: signal.unit })
  if (signal.dataEnum && signal.dataEnum.length > 0) {
    properties.push({ key: 'Data Enum', value: signal.dataEnum.join(', ') })
  }
  if (signal.dataEnumBitFlags) {
    properties.push({ key: 'Bit Flags', value: 'data_enum_bit_flags' })
  }

  return (
    <div className="aaos-detail">
      <div className="aaos-detail-bar">
        <div className="aaos-detail-name">
          <span>{signal.name}</span>
          <CopyButton text={signal.name} ariaLabel="Copy signal name" />
        </div>
        <div className="aaos-area-pill">{signal.area}</div>
      </div>

      <div className="aaos-detail-body">
        <div className="aaos-section-title">AAOS VehicleProperty</div>
        <table className="aaos-prop-table">
          <tbody>
            {properties.map((p) => (
              <tr key={p.key}>
                <td className="k">{p.key}</td>
                <td className="v">{p.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="aaos-section-title has-spacing">
          COVESA matching signals
        </div>
        <table className="aaos-prop-table">
          <tbody>
            <tr>
              <td className="k">Exact matches</td>
              <td className="v">
                {covesaMatches.exact.length === 0 ? (
                  <span>—</span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {covesaMatches.exact.map((m) => (
                      <div
                        key={`exact-${m}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                        }}
                      >
                        <span>{m}</span>
                        <CopyButton
                          text={m}
                          ariaLabel="Copy exact COVESA match"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="k">Partial matches</td>
              <td className="v">
                {covesaMatches.partial.length === 0 ? (
                  <span>—</span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {covesaMatches.partial.map((m) => (
                      <div
                        key={`partial-${m}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                        }}
                      >
                        <span>{m}</span>
                        <CopyButton
                          text={m}
                          ariaLabel="Copy partial COVESA match"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <>
          <div className="aaos-section-title has-spacing">
            SOME/IP Mapping
          </div>
          <table className="aaos-prop-table">
            <tbody>
              <tr>
                <td className="k">Service ID</td>
                <td className="v">
                  <input
                    className="aaos-edit-field"
                    value={editedServiceId}
                    onChange={(e: any) => setEditedServiceId(e.target.value)}
                    placeholder="Enter Service ID"
                    spellCheck={false}
                  />
                </td>
              </tr>
              <tr>
                <td className="k">Instance ID</td>
                <td className="v">
                  <input
                    className="aaos-edit-field"
                    value={editedInstanceId}
                    onChange={(e: any) => setEditedInstanceId(e.target.value)}
                    placeholder="Enter Instance ID"
                    spellCheck={false}
                  />
                </td>
              </tr>
              <tr>
                <td className="k">Event ID</td>
                <td className="v">
                  <input
                    className="aaos-edit-field"
                    value={editedEventId}
                    onChange={(e: any) => setEditedEventId(e.target.value)}
                    placeholder="Enter Event ID"
                    spellCheck={false}
                  />
                </td>
              </tr>
              <tr>
                <td className="k">Value</td>
                <td className="v">
                  <input
                    className="aaos-edit-field"
                    value={valueState}
                    onChange={(e: any) => setValue(e.target.value)}
                    placeholder={
                      isRequestInFlight
                        ? 'Waiting for value from image...'
                        : canGet
                          ? 'Press Get to request value'
                          : 'Enter value to set'
                    }
                    readOnly={!isValueEditable}
                    spellCheck={false}
                  />
                </td>
              </tr>
              <tr>
                <td className="k">Last Response Time</td>
                <td className="v">
                  {receivedSomeipAt ? (
                    <span className="aaos-value-meta">{receivedSomeipAt}</span>
                  ) : (
                    <span className="aaos-value-placeholder">No response yet</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="aaos-someip-actions" style={{ marginTop: 10 }}>
            <button
              type="button"
              disabled={!canGet}
              className={cx(
                'aaos-segment-btn',
                someipMode === 'get' && canGet && 'is-active',
                !canGet && 'is-disabled',
              )}
              onClick={handleSomeipGetClick}
            >
              {isRequestInFlight ? 'Getting...' : 'Get'}
            </button>
            <button
              type="button"
              disabled={!canSet}
              className={cx(
                'aaos-segment-btn',
                someipMode === 'set' && canSet && 'is-active',
                !canSet && 'is-disabled',
              )}
              onClick={handleSomeipSetClick}
            >
              Set
            </button>
          </div>
        </>

        <div className="aaos-section-title has-spacing">
          Property ID Composition
        </div>
        <table className="aaos-prop-table">
          <tbody>
            <tr>
              <td className="k">Base ID</td>
              <td className="v">{signal.baseId}</td>
            </tr>
            <tr>
              <td className="k">Group</td>
              <td className="v">SYSTEM (0x10000000)</td>
            </tr>
            <tr>
              <td className="k">Vehicle Area</td>
              <td className="v">{signal.area}</td>
            </tr>
            <tr>
              <td className="k">Data Type</td>
              <td className="v">{signal.dataType}</td>
            </tr>
            <tr>
              <td className="k">Computed ID</td>
              <td className="v">{propertyId}</td>
            </tr>
          </tbody>
        </table>

        <div className="aaos-actions">
          <button
            type="button"
            className={cx('aaos-btn', !wishlistAvailable && 'is-secondary')}
            onClick={handleAddWishlist}
            disabled={!wishlistAvailable || status.kind === 'loading'}
            title={
              wishlistAvailable
                ? `Register ${wishlistApiName} as a wishlist signal on this model`
                : 'Wishlist API is unavailable in this context'
            }
          >
            <PlusIcon />
            {status.kind === 'loading'
              ? 'Adding…'
              : 'Add as wishlist signal'}
          </button>
          <CopyButton text={fullPath} ariaLabel="Copy full path" />
        </div>

        <div
          className={cx(
            'aaos-status',
            status.kind === 'error' && 'is-error',
            status.kind === 'success' && 'is-success',
            status.kind !== 'error' && status.kind !== 'success' && 'is-info',
          )}
        >
          {status.kind === 'success' && status.message}
          {status.kind === 'error' && status.message}
          {status.kind === 'idle' && !wishlistAvailable && (
            <span>
              {api?.createWishlistApi
                ? 'No model in context — wishlist signals require a model.'
                : 'Wishlist API not provided by host.'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AaosSignalDetail
