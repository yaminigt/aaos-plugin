import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// AAOS plugin build config.
//
// Output is a single IIFE bundle (`index.js`) that registers itself on
// `window.DAPlugins['page-plugin']`. React and ReactDOM are provided by the
// autowrx host on `window.React` / `window.ReactDOM`, so we externalise them.
//
// IMPORTANT: we do NOT externalise `react/jsx-runtime` even though the autowrx
// docs suggest doing so. The host only populates `window.React` and
// `window.ReactDOM` at runtime — there is no `window.jsxRuntime`, so an IIFE
// that expects it crashes with "jsxRuntime is not defined" the moment the
// browser executes the bundle. Bundling the small jsx-runtime helpers into
// the plugin avoids the crash and they still call into the host's React
// instance, so React is never duplicated.

export default defineConfig({
  plugins: [react()],
  // Browsers don't define `process`. The bundled react/jsx-runtime guards its
  // dev-only warnings with `process.env.NODE_ENV !== "production"`, so without
  // these substitutions the IIFE crashes on load with "process is not defined".
  // Replacing them at build time also lets Rollup tree-shake the dev branch.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    global: 'globalThis',
  },
  build: {
    lib: {
      entry: './src/index.tsx',
      formats: ['iife'],
      name: 'AaosPlugin',
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOMClient',
        },
      },
    },
    outDir: '.',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2018',
    minify: 'esbuild',
  },
})
