# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.3] - 2026-09-03

### Fixed

- Updated dependencies and improved code quality

## [0.4.2] - 2026-08-15

### Changed

- GitHub repository renamed to [`nandorip/react-viewer-doc`](https://github.com/nandorip/react-viewer-doc)

## [0.4.1] - 2026-08-15

This is a maintainer/toolchain release. The published component API and peer dependencies are unchanged.

### Changed

- Replaced the Babel + Webpack toolchain with TypeScript (`tsc`) for the library and esbuild for the demo
- README is now consumer-focused; contributor and publish docs live in `CONTRIBUTING.md`
- `dist/` is no longer committed; it is produced by `prepublishOnly`
- Added `publish-demo` (`gh-pages`) for manual GitHub Pages deploys

## [0.4.0] - 2026-08-15

Published as `react-viewer-doc@0.4.0`.

### Changed

- Public component is now `ReactViewerDoc`. `ReactDocumentViewer` remains as a deprecated alias
- Removed `react-image-pan-zoom-rotate` in favor of a small built-in pan/zoom layer
- Replaced unmaintained `utif` with the `utif2` fork for TIFF decode
- Image and SVG "open in new tab" now render as `<img>` in a blank document (same as print), so SVG scripts do not execute

### Security

- Demo webpack-dev-server was bound to `127.0.0.1` (superseded by the esbuild demo server in 0.4.1)
- Pinned patched versions of transitive dev dependencies

## [0.3.1] - 2026-08-13

First release of the `react-viewer-doc` package name.

### Security

- `fileUri` values are restricted to `http:`, `https:`, and `blob:` before load. Relative URLs still resolve against the current origin
- Open-in-new-tab no longer accepts `javascript:`, `file:`, or other unsafe protocols after relative-URL resolution
- `data:` URIs must use an allowlisted document MIME (`application/pdf` or supported image types)
- New tabs clear `window.opener` to reduce reverse tabnabbing

### Fixed

- Malformed TIFF files no longer leave the viewer stuck in a loading state
- Print and Open in new tab for TIFF use the decoded PNG of the current page
- Keyboard shortcuts only run while the viewer is focused
- Fullscreen toggles on and off and includes the toolbar
- Page numbers set before a PDF/TIFF finishes loading are clamped when the total is known

### Accessibility

- PDF thumbnails are real buttons with `aria-current="page"`
- Document list items use the file name as their accessible name
- The error boundary can retry and resets when the active document changes

## [0.3.0] - 2026-08-12

### Added

- Native `documents` list with sidebar and toolbar previous/next navigation
- Controlled (`documentIndex`) and uncontrolled (`defaultDocumentIndex`) modes
- `onDocumentChange` callback and `showDocumentList` prop

## [0.2.0] - 2026-08-11

### Added

- Headless API: `useViewerCore` + `ViewerCanvas`
- Custom toolbar via `extraToolbar` and `renderToolbar`

[Unreleased]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/nandorip/react-viewer-doc/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/nandorip/react-viewer-doc/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/nandorip/react-viewer-doc/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/nandorip/react-viewer-doc/releases/tag/v0.2.0
