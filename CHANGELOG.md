# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.1] - 2026-11-06

### Added

- Added `'use client'` directive to root export for Next.js App Router and RSC compatibility
- Added explicit `.js` and `/index.js` resolution script in ESM build for Node.js ESM consumers
- Added consumer package validation script (`npm run check:package`) in CI and `prepack`
- Connected PDF internal links to current page navigation via `onItemClick`
- Propagated page-level PDF render and load failures to `onError`
- Added reload key tracking so `handleRetry` cleanly re-fetches and decodes TIFF documents
- Added multipage TIFF and SVG samples to the GitHub Pages demo

### Fixed

- Fixed race condition where slow previous page decode could overwrite the currently selected TIFF page
- Optimized TIFF memory footprint by decoding only requested pages on demand and freeing previous page raster data
- Prevented blank flash during TIFF page changes by delaying Object URL revocation until the replacement page renders
- Kept document navigation accessible in multi-document mode even when a single document encounters an error
- Fixed file extension resolution for URLs with hash fragments (`#`) or query strings (`?`)
- Prevented fractional page numbers from being applied in viewer state
- Reset the error boundary when any field of the active document changes, including `fileUri` and `fileData`

### Security

- Open and print for PDFs now fetch the file, require a `%PDF-` header in the first 1024 bytes, and reject payloads over 50 MB before navigating a new tab
- New tabs and print windows set `window.opener = null` before the document URL is assigned
- Reject base64 documents over 50 MB
- Reject TIFF files over 50 MB, files with more than 1000 pages, and pages larger than 25 megapixels

### Changed

- Updated the TypeScript toolchain to TypeScript 7 while retaining the TypeScript 6 compiler API for Jest compatibility
- Updated the library build configuration for TypeScript 7 module resolution rules
- Updated CI to the same layout as the sibling packages: Node 20 and 24, `npm run check`, the demo build, and a React 19 compatibility job
- Leave an existing PDF.js worker in place, and apply the CDN worker only when react-pdf still has its `pdf.worker.mjs` placeholder
- Show a grab cursor while panning images
- Refreshed dependencies inside current ranges, including React 19.3.1, MUI 9.5.0 and react-window 2.5.3

## [0.6.0] - 2026-09-23

### Changed

- Upgraded `react-pdf` to v11 (PDF.js 6) and required React 19 as a peer dependency
- Migrated virtualization to `react-window` v2 (`List` / `Grid`); mobile PDF thumbnails use a one-row `Grid`
- Updated `@testing-library/jest-dom` to v7
- Cleared npm audit findings from prior lockfile refresh

## [0.5.0] - 2026-09-03

### Added
- Virtualization for the PDF thumbnail list using `react-window`, significantly improving performance for documents with many pages.
- Virtualization for the `DocumentList` component (sidebar) for improved performance when handling large document sets.
- Responsive layout for the thumbnail list (horizontal on mobile, vertical on desktop).
- Exported `DEFAULT_PDF_WORKER_SRC` and `PDFJS_VERSION` constants for easier PDF worker configuration.

### Changed
- Refactored `useViewerCore` hook into specialized smaller hooks (`useViewerState`, `useViewerEvents`, `useDocumentActions`, `useFileLoader`, `useIsMobile`) to improve maintainability.
- Updated `pdfWorkerSrc` prop to accept `null` to disable automatic CDN configuration.
- Internal styles updated to support virtualized lists and consistent text handling.
- Optimized PDF thumbnails by removing redundant intersection observers.

### Fixed
- Improved viewer reset behavior for PDF documents, ensuring scroll position is reset when switching files or clicking reset.
- Improved overall code modularity and documentation.

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

[Unreleased]: https://github.com/nandorip/react-viewer-doc/compare/v0.6.1...HEAD
[0.6.1]: https://github.com/nandorip/react-viewer-doc/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/nandorip/react-viewer-doc/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.3...v0.5.0
[0.4.3]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/nandorip/react-viewer-doc/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/nandorip/react-viewer-doc/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/nandorip/react-viewer-doc/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/nandorip/react-viewer-doc/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/nandorip/react-viewer-doc/releases/tag/v0.2.0
