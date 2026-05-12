# Changelog

All notable changes to the AAOS API plugin are documented here. The format
loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
this project uses [SemVer](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Removed the **Vehicle Area** grouping mode and the header toggle. Signals
  are now always grouped by their `Name` token (the prefix before the first
  underscore — INFO, HVAC, EV, …).

### Removed
- `groupAaosSignalsByArea` helper from `src/data/aaos.ts` (no longer used).
- `GroupingMode` type and `groupingMode` prop on `AaosGroupList`.

## [1.0.0] — 2026-05-07

First public release.

### Added
- ~280 AAOS `VehicleProperty` signals with full metadata (description,
  change mode, access, area, data type, version, unit, data enums, base ID
  and computed property ID).
- Group view with two grouping modes: **Vehicle Area** (default) and
  **Name** (token before the first underscore), togglable from the header.
- Live search by signal name or group/area; matching groups auto-expand.
- Right-pane signal detail with property-ID composition breakdown.
- "Add as wishlist signal" button that promotes the selected AAOS signal
  into the active model as a custom `Aaos.<AREA>.<NAME>` extended API via
  `api.createWishlistApi`.
- COVESA / VSS exact and partial match table for each AAOS signal.
- Self-contained Vite IIFE bundle that registers on
  `window.DAPlugins['page-plugin']` and uses the host's `window.React` /
  `window.ReactDOM`.
- Scoped `.aaos-*` styles injected once at mount.

[Unreleased]: https://github.com/yaminigt/aaos-plugin/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yaminigt/aaos-plugin/releases/tag/v1.0.0
