import {
  AaosDataType,
  AaosSignal,
  getAaosFullPath,
  getAaosPropertyId,
} from '../data/aaos'
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

const AaosSignalDetail = ({ signal, api, modelId }: Props) => {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  // Reset status when the selected signal changes.
  useEffect(() => {
    setStatus({ kind: 'idle' })
  }, [signal.name])

  const propertyId = getAaosPropertyId(signal)
  const fullPath = getAaosFullPath(signal)
  const wishlistApiName = toWishlistApiName(signal)

  const wishlistAvailable =
    typeof api?.createWishlistApi === 'function' && !!modelId

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
