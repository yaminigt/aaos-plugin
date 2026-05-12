import { AAOS_SIGNALS, AaosSignal } from '../data/aaos'
import AaosGroupList from './AaosGroupList'
import AaosSignalDetail from './AaosSignalDetail'
import { AndroidIcon } from './icons'

const React: any = (globalThis as any).React
const { useState } = React

export type PluginAPI = {
  updateModel?: (updates: any) => Promise<any>
  updatePrototype?: (updates: any) => Promise<any>
  getComputedAPIs?: (model_id?: string) => Promise<any>
  getApiDetail?: (api_name: string, model_id?: string) => Promise<any>
  listVSSVersions?: () => Promise<string[]>
  getRuntimeApiValues?: () => Record<string, any>
  replaceAPIs?: (api_data_url: string, model_id?: string) => Promise<void>
  setRuntimeApiValues?: (values: Record<string, any>) => void
  setActiveTab?: (tab: string, pluginSlug?: string) => void
  createWishlistApi?: (data: any) => Promise<any>
  updateWishlistApi?: (id: string, data: any) => Promise<any>
  deleteWishlistApi?: (id: string) => Promise<void>
  getWishlistApi?: (name: string, model_id?: string) => Promise<any>
  listWishlistApis?: (model_id?: string) => Promise<any>
  uploadFile?: (file: File) => Promise<{ url: string }>
}

export type PageProps = {
  data?: {
    model?: { id?: string; name?: string }
    prototype?: { id?: string; name?: string }
  }
  config?: { plugin_id?: string }
  api?: PluginAPI
}

const Page = ({ data, api }: PageProps) => {
  const [selectedSignal, setSelectedSignal] = useState<AaosSignal | null>(null)

  const groupCount = new Set(AAOS_SIGNALS.map((s) => s.group)).size
  const modelId = data?.model?.id

  return (
    <div className="aaos-root">
      <div className="aaos-header">
        <div className="aaos-header-title">
          <AndroidIcon />
          <span>AAOS Vehicle Properties</span>
        </div>
        <div className="aaos-header-right">
          <div className="aaos-header-counter">
            {AAOS_SIGNALS.length} signals · {groupCount} groups
          </div>
        </div>
      </div>

      <div className="aaos-body">
        <AaosGroupList
          signals={AAOS_SIGNALS}
          selectedSignal={selectedSignal}
          onSelectSignal={setSelectedSignal}
        />

        <div className="aaos-right">
          {selectedSignal ? (
            <AaosSignalDetail
              signal={selectedSignal}
              api={api}
              modelId={modelId}
            />
          ) : (
            <div className="aaos-placeholder">
              <div className="aaos-placeholder-icon">
                <AndroidIcon size={56} />
              </div>
              <div className="aaos-placeholder-title">
                Select an AAOS signal to view its details
              </div>
              <div className="aaos-placeholder-sub">
                Pick a signal from the list on the left
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
