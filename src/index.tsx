import Page from './components/Page'
import { injectStyles } from './styles'

declare global {
  interface Window {
    DAPlugins?: Record<string, any>
  }
}

if (!window.DAPlugins) {
  window.DAPlugins = {}
}

window.DAPlugins['page-plugin'] = {
  components: { Page },
  unmount: (container?: HTMLElement | null) => {
    if (container) container.innerHTML = ''
  },
}

injectStyles()
