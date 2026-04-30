# AAOS API Plugin

An [autowrx / digital.auto](https://github.com/eclipse-autowrx/autowrx) plugin that
renders the **Android Automotive OS `VehicleProperty`** catalog (~280 signals)
as a grouped, searchable, drill-down view, fully self-contained.

It is built following the official
[autowrx Plugin System](https://github.com/eclipse-autowrx/autowrx/tree/main/docs/plugin)
specification — a single IIFE bundle that registers itself on
`window.DAPlugins['page-plugin']` and is loaded by the host at runtime.

## Features

- **280 AAOS VehicleProperty signals** with full metadata (description, change
  mode, access, vehicle area, data type, VHAL version, unit, data enums, base
  ID and computed property ID).
- **Group view** with two grouping modes — `Vehicle Area` (default) and `Name`
  (token before the first underscore) — switchable via a toggle in the header.
- **Search** by signal name or group/area name; matching groups auto-expand.
- **Rich detail panel** including a property-ID composition breakdown.
- **One-click copy** for the signal name and full path.
- **Add as wishlist signal** — registers the selected AAOS signal as a custom
  wishlist (extended) API on the active model, using `api.createWishlistApi`.
  Disabled gracefully when no model is in context or the host doesn't expose
  the wishlist API.
- **Zero host coupling** — no `react-router`, no host atoms, no Tailwind.
  Styles are scoped under `.aaos-*` and injected once at mount.

## Project structure

```
aaos-plugin/
├── src/
│   ├── components/
│   │   ├── Page.tsx              # Top-level component (registered as components.Page)
│   │   ├── AaosGroupList.tsx     # Left pane — search + collapsible groups
│   │   ├── AaosSignalDetail.tsx  # Right pane — rich detail + wishlist button
│   │   └── icons.tsx             # Inline SVG icons (chevrons, search, copy, android, plus, check)
│   ├── data/
│   │   └── aaos.ts               # ~280 signals + types + helpers
│   ├── styles.ts                 # Scoped CSS string + injectStyles()
│   └── index.tsx                 # Entry point — registers on window.DAPlugins
├── build.sh                      # Build script
├── package.json                  # React + Vite deps
├── tsconfig.json                 # TS config (jsx: react-jsx, strict)
├── vite.config.js                # IIFE bundle, React externalised
└── .gitignore
```

## Building

Requires **Node.js 16+** and either **yarn** or **npm**.

```bash
# From inside aaos-plugin/
chmod +x build.sh
./build.sh
```

This produces `index.js` (and `index.js.map`) at the root of the plugin folder.

You can also run the build directly via npm:

```bash
npm install
npm run build
```

The output is a single IIFE bundle that calls
`window.DAPlugins['page-plugin'] = { components: { Page }, unmount }` and
injects its scoped stylesheet via a `<style id="aaos-plugin-styles">` tag.

## Local smoke test

Serve the folder over HTTP and open the URL in a browser to confirm the bundle
parses without errors:

```bash
npx serve .
# Then check that http://localhost:3000/index.js loads
```

The plugin only renders inside the autowrx host (it depends on `globalThis.React`
being populated), so the serve step is just a sanity check that the bundle is
reachable. Full visual testing happens after registering the URL in the
autowrx admin panel.

## Deployment

Any HTTPS host with permissive CORS will work. Common options:

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create aaos-plugin --public --source=. --remote=origin --push
# Repo settings → Pages → Deploy from branch (main, /)
```

The bundle will then be available at:

```
https://<your-user>.github.io/aaos-plugin/index.js
```

### Netlify, Vercel, S3+CloudFront, custom Nginx

See the
[autowrx deployment guide](https://github.com/eclipse-autowrx/autowrx/blob/main/docs/plugin/06-deployment.md)
for working examples. Whichever host you pick, ensure:

- `Access-Control-Allow-Origin: *`
- `Content-Type: application/javascript; charset=utf-8`
- `Cache-Control: public, max-age=31536000, immutable` (production)
- HTTPS

## Registering the plugin in autowrx

In the autowrx admin panel, create a new plugin entry with:

| Field | Value                                                         |
| ----- | ------------------------------------------------------------- |
| Name  | `AAOS API`                                                    |
| Slug  | `aaos-api`                                                    |
| URL   | `https://<your-host>/aaos-plugin/index.js` (whatever you used) |

You can then embed the plugin from anywhere in the host, for example:

```tsx
import PluginPageRender from '@/components/organisms/PluginPageRender'

<PluginPageRender
  plugin_id="aaos-api"
  data={{ model, prototype }}
/>
```

When `model` is provided, the plugin's "Add as wishlist signal" button is
enabled and signals can be persisted as `Aaos.<AREA>.<NAME>` extended APIs on
that model.

## Plugin API usage

The plugin reads the following props from the host:

```typescript
{
  data?: {
    model?: { id?: string; name?: string }      // optional — enables wishlist button
    prototype?: { id?: string; name?: string }  // unused for now
  },
  config?: { plugin_id?: string }
  api?: PluginAPI
}
```

Methods used from `api`:

- `createWishlistApi(data)` — only one used today; called when the user clicks
  **Add as wishlist signal** on the detail panel. The plugin sends:

  ```typescript
  {
    model: data.model.id,
    apiName: `Aaos.${signal.area}.${signal.name}`,
    description: signal.description,
    type: signal.access.includes('WRITE') ? 'actuator' : 'sensor',
    datatype: <VSS-style datatype mapped from signal.dataType>,
    skeleton: `Aaos.${signal.area}.${signal.name}`,
    isWishlist: true,
    unit?: signal.unit
  }
  ```

The other 13 PluginAPI methods (`updateModel`, `getComputedAPIs`,
`setRuntimeApiValues`, etc.) are typed but not currently consumed; they are
accepted as props so future versions can add features without changing the
host integration.

## Versioning

Bump `package.json` `version` and tag the git release. For deterministic cache
busting in production, switch the Vite output to a hashed filename:

```js
// vite.config.js
build: {
  lib: {
    fileName: () => 'index-[hash].js'
  }
}
```

## License

MIT
