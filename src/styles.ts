// All styles for the plugin live in this single CSS string. We inject it as a
// <style id="aaos-plugin-styles"> tag at plugin load time. Class names are
// scoped with the `.aaos-` prefix to avoid collisions with the host app.

const STYLE_ID = 'aaos-plugin-styles'

const CSS = `
.aaos-root {
  --aaos-bg: #ffffff;
  --aaos-fg: #0f172a;
  --aaos-muted: #64748b;
  --aaos-muted-soft: #94a3b8;
  --aaos-border: #e2e8f0;
  --aaos-border-strong: #cbd5e1;
  --aaos-primary: #aa1c5d;
  --aaos-primary-soft: rgba(170, 28, 93, 0.10);
  --aaos-primary-soft-2: rgba(170, 28, 93, 0.05);
  --aaos-radius: 6px;
  --aaos-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 480px;
  background: var(--aaos-bg);
  color: var(--aaos-fg);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  border-radius: var(--aaos-radius);
  overflow: hidden;
  box-sizing: border-box;
}
.aaos-root *,
.aaos-root *::before,
.aaos-root *::after { box-sizing: border-box; }

.aaos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--aaos-border);
  flex-shrink: 0;
}
.aaos-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--aaos-primary);
}
.aaos-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.aaos-header-counter {
  font-size: 12px;
  font-weight: 500;
  color: var(--aaos-muted);
}

.aaos-mode-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--aaos-muted);
}
.aaos-mode-pillgroup {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--aaos-border);
  background: #f1f5f9;
  border-radius: 6px;
  padding: 2px;
}
.aaos-mode-pill {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--aaos-muted);
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.aaos-mode-pill:hover { color: var(--aaos-fg); }
.aaos-mode-pill.is-active {
  background: #ffffff;
  color: var(--aaos-primary);
  box-shadow: var(--aaos-shadow-sm);
}

.aaos-body {
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  min-height: 0;
  overflow: hidden;
}

.aaos-left {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--aaos-border);
  overflow: hidden;
}
.aaos-right {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.aaos-search-wrap {
  position: relative;
  padding: 12px 12px 8px 12px;
}
.aaos-search-icon {
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-25%);
  color: var(--aaos-muted);
  pointer-events: none;
}
.aaos-input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 36px;
  border: 1px solid var(--aaos-border-strong);
  border-radius: var(--aaos-radius);
  background: #ffffff;
  color: var(--aaos-fg);
  font: inherit;
  outline: none;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.aaos-input::placeholder { color: var(--aaos-muted-soft); }
.aaos-input:focus {
  border-color: var(--aaos-primary);
  box-shadow: 0 0 0 3px var(--aaos-primary-soft);
}

.aaos-list {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 0 12px 12px 12px;
}
.aaos-empty {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--aaos-muted);
  padding: 24px 0;
}

.aaos-group {
  display: flex;
  flex-direction: column;
}
.aaos-group-btn {
  appearance: none;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border-radius: var(--aaos-radius);
  font: inherit;
  font-weight: 600;
  color: var(--aaos-fg);
  cursor: pointer;
  transition: background-color 120ms ease;
}
.aaos-group-btn:hover { background: var(--aaos-primary-soft); }
.aaos-group-btn.is-open { background: var(--aaos-primary-soft-2); }
.aaos-group-left {
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.aaos-group-chevron { color: var(--aaos-muted); }
.aaos-badge {
  display: inline-flex;
  min-width: 22px;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  background: #e2e8f0;
  color: var(--aaos-muted);
  font-size: 11px;
  font-weight: 500;
}

.aaos-signals {
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  margin: 2px 0 4px 0;
}
.aaos-signal-btn {
  appearance: none;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  padding: 6px 8px;
  border-radius: 4px;
  font: inherit;
  font-size: 13px;
  color: var(--aaos-muted);
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.aaos-signal-btn:hover { background: var(--aaos-primary-soft); }
.aaos-signal-btn.is-selected {
  background: var(--aaos-primary-soft);
  color: var(--aaos-primary);
  font-weight: 500;
}
.aaos-signal-name {
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aaos-signal-tag {
  flex: 0 0 auto;
  margin-left: 8px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--aaos-muted-soft);
}

.aaos-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--aaos-muted);
  text-align: center;
  padding: 24px;
}
.aaos-placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--aaos-primary-soft);
  color: var(--aaos-primary);
}
.aaos-placeholder-title {
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
}
.aaos-placeholder-sub {
  margin-top: 4px;
  font-size: 12px;
  color: var(--aaos-muted-soft);
}

.aaos-detail { display: flex; flex-direction: column; width: 100%; }
.aaos-detail-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 8px 8px 16px;
  background: var(--aaos-primary-soft);
}
.aaos-detail-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--aaos-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aaos-area-pill {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  border-radius: var(--aaos-radius);
  background: var(--aaos-primary);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.aaos-detail-body { padding: 16px; }
.aaos-section-title {
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: var(--aaos-fg);
  margin: 0 0 8px 0;
}
.aaos-section-title.has-spacing { padding-top: 16px; }

.aaos-prop-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--aaos-border);
  border-radius: var(--aaos-radius);
  overflow: hidden;
  font-size: 13px;
}
.aaos-prop-table tr + tr { border-top: 1px solid var(--aaos-border); }
.aaos-prop-table td {
  padding: 8px 12px;
  vertical-align: top;
}
.aaos-prop-table td.k {
  width: 38%;
  background: #f8fafc;
  color: var(--aaos-muted);
  font-weight: 500;
}
.aaos-prop-table td.v {
  color: var(--aaos-fg);
  word-break: break-word;
}

.aaos-copy-btn {
  appearance: none;
  background: transparent;
  border: 1px solid var(--aaos-border-strong);
  color: var(--aaos-muted);
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 120ms ease, border-color 120ms ease, background-color 120ms ease;
}
.aaos-copy-btn:hover {
  color: var(--aaos-primary);
  border-color: var(--aaos-primary);
  background: var(--aaos-primary-soft);
}
.aaos-copy-btn.is-done {
  color: #16a34a;
  border-color: #16a34a;
  background: rgba(22, 163, 74, 0.08);
}

.aaos-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.aaos-btn {
  appearance: none;
  border: 1px solid var(--aaos-primary);
  background: var(--aaos-primary);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: var(--aaos-radius);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: filter 120ms ease, opacity 120ms ease;
}
.aaos-btn:hover { filter: brightness(0.95); }
.aaos-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.aaos-btn.is-secondary {
  background: transparent;
  color: var(--aaos-primary);
}
.aaos-btn.is-success {
  border-color: #16a34a;
  background: #16a34a;
}

.aaos-status {
  margin-top: 8px;
  font-size: 12px;
  min-height: 16px;
}
.aaos-status.is-error { color: #dc2626; }
.aaos-status.is-success { color: #16a34a; }
.aaos-status.is-info { color: var(--aaos-muted); }
`

export const injectStyles = () => {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.appendChild(document.createTextNode(CSS))
  document.head.appendChild(style)
}
