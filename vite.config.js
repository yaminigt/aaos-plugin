import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// AAOS plugin build config.
//
// Output is a single IIFE bundle (`index.js`) that registers itself on
// `window.DAPlugins['page-plugin']`. React, ReactDOM and the JSX runtime are
// provided globally by the autowrx host, so they MUST be externalised — never
// bundle them into the plugin or the host's React instance and the plugin's
// React instance will diverge and hooks will fail.

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.tsx',
      formats: ['iife'],
      name: 'AaosPlugin',
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOMClient',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    outDir: '.',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2018',
  },
})
