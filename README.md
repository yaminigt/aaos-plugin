# AAOS API Plugin

> An [autowrx / digital.auto](https://github.com/eclipse-autowrx/autowrx) plugin
> that turns your model's plugin tab into a fully searchable browser of the
> Android Automotive OS `VehicleProperty` catalog (~280 signals), with
> one-click "Add as wishlist signal" wiring.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![autowrx plugin](https://img.shields.io/badge/autowrx-page--plugin-blue)
![Build: Vite IIFE](https://img.shields.io/badge/Build-Vite%20IIFE-yellow)

---

## Quick install (≈30 seconds)

You can install this plugin in two ways:

### Option 1 — From the digital.auto Marketplace (recommended)

Listed at: **<paste-marketplace-url-here-after-submission>**

Click **Install** on the listing — autowrx will create the plugin entry
on your instance automatically.

### Option 2 — Manual (works on any autowrx fork, no marketplace needed)

In your autowrx admin panel go to **Admin → Plugins → New** and paste:

| Field | Value |
| --- | --- |
| **Name** | `AAOS API` |
| **Type / Section** | `Prototype Plugin` |
| **URL (entry point)** | `https://yaminigt.github.io/aaos-plugin/index.js` |
| **Config** | `{}` |

Save. The plugin is now available on every model and prototype on that
instance — no code changes required, no rebuild, no host fork.

> **Tip:** want to pin to a specific version that won't change under you? Use
> the version-pinned URL once a release is tagged:
> `https://cdn.jsdelivr.net/gh/yaminigt/aaos-plugin@v1.0.0/index.js`

---

## What it does

When a user opens the plugin on a prototype/model:

- **Browse 280 AAOS VehicleProperty signals**, grouped by their `Name` token
  (the prefix before the first underscore — INFO, HVAC, EV, …), with live
  search.
- **Inspect rich detail** for any signal — description, change mode, access,
  data type, unit, data enums, base ID, computed property ID and full path.
- **Compare with COVESA**: each AAOS signal shows the corresponding
  COVESA / VSS exact and partial matches.
- **Promote signals to the model's wishlist** — one click registers the AAOS
  signal as a custom `Aaos.<AREA>.<NAME>` extended API on the active model
  via `api.createWishlistApi()`.

---

## Why use it

- **Zero host coupling** — does not import any host code, no Tailwind, no
  React Router, no host atoms. Styles are scoped under `.aaos-*` and
  injected once at mount, so it cannot break the rest of the host.
- **Self-contained dataset** — AAOS signals and COVESA matches ship inside
  the bundle, so it works offline and against any autowrx instance.
- **Works on every autowrx fork** — uses only the documented public Plugin
  API (`window.DAPlugins['page-plugin']` + the `api`/`data`/`config` props).

---

## Compatibility

- autowrx host that supports the documented
  [Plugin System](https://github.com/eclipse-autowrx/autowrx/tree/main/docs/plugin)
  (`Prototype Plugin` section in admin).
- Modern evergreen browsers (Chrome, Edge, Firefox, Safari).
- Plugin code is a single IIFE bundle that uses the host's `window.React` /
  `window.ReactDOM` — React must be present on the host (true for autowrx).

---

## Project structure

```
aaos-plugin/
├── src/
│   ├── components/
│   │   ├── Page.tsx              # Top-level component (registered as components.Page)
│   │   ├── AaosGroupList.tsx     # Left pane — search + collapsible groups
│   │   ├── AaosSignalDetail.tsx  # Right pane — rich detail + COVESA matches + wishlist
│   │   └── icons.tsx             # Inline SVG icons
│   ├── data/
│   │   ├── aaos.ts               # ~280 signals + types + helpers
│   │   └── aaos_covesa_matches.ts# AAOS → COVESA exact/partial match table
│   ├── styles.ts                 # Scoped CSS string + injectStyles()
│   └── index.tsx                 # Entry point — registers on window.DAPlugins
├── build.sh                      # Build script
├── package.json                  # React + Vite deps
├── tsconfig.json                 # TS config (jsx: react-jsx, strict)
├── vite.config.js                # IIFE bundle, React externalised
├── LICENSE                       # MIT
├── CHANGELOG.md
└── .gitignore
```

---

## Building from source (only if you want to fork it)

Requires **Node.js 16+** and **npm** (or yarn).

```bash
npm install
npm run build
```

This produces `index.js` and `index.js.map` at the root of the plugin folder.
Push to any HTTPS host (GitHub Pages, Netlify, Vercel, Cloudflare R2, S3 +
CloudFront…) — see the
[autowrx deployment guide](https://github.com/eclipse-autowrx/autowrx/blob/main/docs/plugin/06-deployment.md)
for details. Whichever host you pick, ensure:

- `Access-Control-Allow-Origin: *`
- `Content-Type: application/javascript; charset=utf-8`
- `Cache-Control: public, max-age=31536000, immutable` (production)
- HTTPS

### Local smoke test

```bash
npx serve .
# Open http://localhost:3000/index.js — should serve the bundle
```

The plugin only renders inside an autowrx host (it expects `globalThis.React`
to be populated), so the serve step is just a sanity check.

---

## Plugin API usage

```typescript
type PageProps = {
  data?: {
    model?: { id?: string; name?: string }      // optional — enables the wishlist button
    prototype?: { id?: string; name?: string }
  }
  config?: { plugin_id?: string }
  api?: PluginAPI
}
```

The only host method consumed today is `api.createWishlistApi`, called when
the user clicks **Add as wishlist signal**. The plugin sends:

```typescript
{
  model: data.model.id,
  apiName: `Aaos.${signal.area}.${signal.name}`,
  description: signal.description,
  type: signal.access.includes('WRITE') ? 'actuator' : 'sensor',
  datatype: <VSS-style datatype mapped from signal.dataType>,
  skeleton: `Aaos.${signal.area}.${signal.name}`,
  isWishlist: true,
  unit?: signal.unit,
}
```

All other PluginAPI methods (`updateModel`, `getComputedAPIs`,
`setRuntimeApiValues`, etc.) are typed but not currently consumed.

---

## Updating the plugin

When you push a new version to `main` and GitHub Pages redeploys, hosts that
reference the unversioned URL will pick up the new build on the next page
load. If a particular host is caching aggressively, append a query string in
the admin panel — e.g. `…/index.js?v=2`.

For predictable upgrades, prefer the **version-pinned jsDelivr URL** above
and bump the tag (`v1.0.0` → `v1.1.0`) when a host wants to upgrade.

---

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Plugin script execution error: jsxRuntime is not defined` | Old build that externalised `react/jsx-runtime` | Use a recent build (≥ v1.0.0); ensure `react/jsx-runtime` is bundled, not externalised |
| `process is not defined` | Bundle still references `process.env.NODE_ENV` | Vite `define` must replace `process.env.NODE_ENV` with `"production"` — see `vite.config.js` |
| Plugin URL returns a GitHub login page | Repo / Pages source is **private** | Make the repo public, or host the bundle on Netlify/Vercel/S3 |
| "Add as wishlist signal" button is disabled | Plugin opened without a `model` in `data` | Open from a prototype that belongs to a model |

---

## Contributing

Pull requests welcome. Keep changes self-contained (no host imports),
prefix every new CSS class with `.aaos-`, and never `import React from 'react'`
in plugin code — always use `const React: any = (globalThis as any).React`.

---

## License

[MIT](./LICENSE)
