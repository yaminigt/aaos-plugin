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
  someip: {
    serviceId: string
    instanceId: string
    operationId?: string
    eventGroupId?: string
  }
  requestedAt: string
}

type SomeipTirePressureValueEventPayload = {
  signalName?: string
  frontValue?: string | number | null
  rearValue?: string | number | null
  timestamp?: string
}

const SOMEIP_REQUEST_EVENT = 'aaos:someip:request'
const SOMEIP_TIRE_PRESSURE_VALUE_EVENT = 'aaos:someip:tire-pressure:value'

const AaosSignalDetail = ({ signal, api, modelId }: Props) => {
  const [statusState, setStatus] = useState({ kind: 'idle' } as Status)
  const [someipModeState, setSomeipMode] = useState('get')
  const [editedServiceId, setEditedServiceId] = useState('')
  const [editedInstanceId, setEditedInstanceId] = useState('')
  const [receivedFrontValueState, setReceivedFrontValue] = useState(undefined)
  const [receivedRearValueState, setReceivedRearValue] = useState(undefined)
  const [receivedSomeipAt, setReceivedSomeipAt] = useState('')
  const [isRequestInFlight, setIsRequestInFlight] = useState(false)
  const status = statusState as Status
  const someipMode = someipModeState as 'get' | 'set'
  const receivedFrontValue = receivedFrontValueState as
    | string
    | number
    | null
    | undefined
  const receivedRearValue = receivedRearValueState as
    | string
    | number
    | null
    | undefined

  const someipMatch = getSomeipMatchForAaos(signal.name)

  // Reset status and editable fields when the selected signal changes.
  useEffect(() => {
    setStatus({ kind: 'idle' })
    setSomeipMode('get')
    setEditedServiceId(someipMatch?.serviceId ?? '')
    setEditedInstanceId(someipMatch?.instanceId ?? '')
    setReceivedFrontValue(undefined)
    setReceivedRearValue(undefined)
    setReceivedSomeipAt('')
    setIsRequestInFlight(false)
  }, [signal.name])

  // Placeholder hookup for bridge communication: dispatch a browser event like
  // window.dispatchEvent(new CustomEvent('aaos:someip:tire-pressure:value', { detail: { signalName: 'TIRE_PRESSURE', frontValue: 223.1, rearValue: 221.4 } }))
  useEffect(() => {
    const onSomeipValue = (event: Event) => {
      const customEvent =
        event as CustomEvent<SomeipTirePressureValueEventPayload>
      const detail = customEvent?.detail
      if (!detail?.signalName || detail.signalName !== signal.name) return
      setReceivedFrontValue(
        detail.frontValue === undefined ? null : (detail.frontValue as any),
      )
      setReceivedRearValue(
        detail.rearValue === undefined ? null : (detail.rearValue as any),
      )
      setReceivedSomeipAt(detail.timestamp || new Date().toISOString())
      setIsRequestInFlight(false)
    }

    window.addEventListener(
      SOMEIP_TIRE_PRESSURE_VALUE_EVENT,
      onSomeipValue as EventListener,
    )
    return () => {
      window.removeEventListener(
        SOMEIP_TIRE_PRESSURE_VALUE_EVENT,
        onSomeipValue as EventListener,
      )
    }
  }, [signal.name])

  const propertyId = getAaosPropertyId(signal)
  const fullPath = getAaosFullPath(signal)
  const wishlistApiName = toWishlistApiName(signal)
  const covesaMatches = getCovesaMatchesForAaos(signal.name)
  const someipOperation = someipMatch?.operations?.[someipMode as 'get' | 'set']

  const wishlistAvailable =
    typeof api?.createWishlistApi === 'function' && !!modelId

  const handleSomeipGetClick = async () => {
    if (!someipMatch || !someipMatch.modes.includes('get')) return
    const operation = someipMatch.operations?.get
    const requestPayload: SomeipRequestPayload = {
      signalName: signal.name,
      mode: 'get',
      someip: {
        serviceId: editedServiceId || someipMatch.serviceId,
        instanceId: editedInstanceId || someipMatch.instanceId,
        operationId: operation?.id,
        eventGroupId: operation?.eventGroupId,
      },
      requestedAt: new Date().toISOString(),
    }

    setSomeipMode('get')
    setIsRequestInFlight(true)

    try {
      if (typeof api?.sendSomeipPacket === 'function') {
        await api.sendSomeipPacket(requestPayload)
      }
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

  const isTirePressureSignal = signal.name === 'TIRE_PRESSURE'

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

        {someipMatch && (
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
                      spellCheck={false}
                    />
                  </td>
                </tr>
                {someipOperation && (
                  <tr>
                    <td className="k">
                      {someipOperation.kind.charAt(0).toUpperCase() +
                        someipOperation.kind.slice(1)}{' '}
                      ID
                    </td>
                    <td className="v">{someipOperation.id}</td>
                  </tr>
                )}
                {someipOperation?.eventGroupId && (
                  <tr>
                    <td className="k">Event Group ID</td>
                    <td className="v">{someipOperation.eventGroupId}</td>
                  </tr>
                )}
                {isTirePressureSignal ? (
                  <>
                    <tr>
                      <td className="k">Tire Pressure Front Value</td>
                      <td className="v">
                        {receivedFrontValue === undefined ? (
                          <span className="aaos-value-placeholder">
                            {isRequestInFlight
                              ? 'Waiting for front tire value from image...'
                              : 'Press Get to request front tire value'}
                          </span>
                        ) : (
                          <span className="aaos-value-chip">
                            {String(receivedFrontValue)}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="k">Tire Pressure Rear Value</td>
                      <td className="v">
                        {receivedRearValue === undefined ? (
                          <span className="aaos-value-placeholder">
                            {isRequestInFlight
                              ? 'Waiting for rear tire value from image...'
                              : 'Press Get to request rear tire value'}
                          </span>
                        ) : (
                          <span className="aaos-value-chip">
                            {String(receivedRearValue)}
                          </span>
                        )}
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
                  </>
                ) : (
                  <tr>
                    <td className="k">Received Value</td>
                    <td className="v">
                      <span className="aaos-value-placeholder">
                        Signal-specific display is available for TIRE_PRESSURE.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="aaos-someip-actions" style={{ marginTop: 10 }}>
              <button
                type="button"
                disabled={!someipMatch.modes.includes('get')}
                className={cx(
                  'aaos-segment-btn',
                  someipMode === 'get' && someipMatch.modes.includes('get') && 'is-active',
                  !someipMatch.modes.includes('get') && 'is-disabled',
                )}
                onClick={handleSomeipGetClick}
              >
                {isRequestInFlight ? 'Getting...' : 'Get'}
              </button>
              <button
                type="button"
                disabled={!someipMatch.modes.includes('set')}
                className={cx(
                  'aaos-segment-btn',
                  someipMode === 'set' && someipMatch.modes.includes('set') && 'is-active',
                  !someipMatch.modes.includes('set') && 'is-disabled',
                )}
                onClick={() => someipMatch.modes.includes('set') && setSomeipMode('set')}
              >
                Set
              </button>
            </div>
          </>
        )}

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
