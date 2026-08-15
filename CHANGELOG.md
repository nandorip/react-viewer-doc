# Changelog

All notable changes to this project are documented in this file.

## [0.4.0] - 2026-08-15

Published as `react-viewer-doc@0.4.0`. Install with `npm install react-viewer-doc`.

### Changed

- Public component is now `ReactViewerDoc`. `ReactDocumentViewer` remains as a deprecated alias.
- Removed `react-image-pan-zoom-rotate` in favor of a small built-in pan/zoom layer.
- Replaced unmaintained `utif` with the `utif2` fork for TIFF decode.
- Image and SVG "open in new tab" now render as `<img>` in a blank document (same as print), so SVG scripts do not execute.
- Demo webpack-dev-server binds to `127.0.0.1` instead of `0.0.0.0`.
- Pinned patched versions of transitive dev dependencies (`brace-expansion`, `nanoid`, `postcss`, `fast-uri`, `js-yaml`, `body-parser`, `uuid`).

## [0.3.1] - 2026-08-13

First release of the `react-viewer-doc` package name (the GitHub repo remains `react-document-viewer`).

### Security

- `fileUri` values are restricted to `http:`, `https:`, and `blob:` before load. Relative URLs still resolve against the current origin.
- Open-in-new-tab no longer accepts `javascript:`, `file:`, or other unsafe protocols after relative-URL resolution.
- `data:` URIs must use an allowlisted document MIME (`application/pdf` or supported image types). HTML/SVG-as-script payloads are rejected.
- New tabs clear `window.opener` to reduce reverse tabnabbing.

### Fixed

- Malformed TIFF files no longer leave the viewer stuck in a loading state.
- Print and Open in new tab for TIFF use the decoded PNG of the current page.
- Keyboard shortcuts only run while the viewer is focused, so they no longer steal page-level arrow keys.
- Fullscreen toggles on and off and includes the toolbar.
- Page numbers set before a PDF/TIFF finishes loading are clamped when the total is known.

### Accessibility

- PDF thumbnails are real buttons with `aria-current="page"`.
- Document list items use the file name as their accessible name.
- The error boundary can retry and resets when the active document changes.

### Docs

- `documentIndex` is documented as an optional controlled prop (no default).
- The demo hosts the PDF.js worker locally and works under a GitHub Pages subpath.

## [0.3.0] - 2026-08-12

- Native `documents` list with sidebar and toolbar previous/next navigation.
- Controlled (`documentIndex`) and uncontrolled (`defaultDocumentIndex`) modes.
- `onDocumentChange` callback and `showDocumentList` prop.

## [0.2.0] - 2026-08-11

- Headless API: `useViewerCore` + `ViewerCanvas`.
- Custom toolbar via `extraToolbar` and `renderToolbar`.
