# Handoff for the next agent

Updated: 2026-10-14

## Current state

- Repository: `react-viewer-doc`, branch `main`.
- Release version: `0.6.1`. (npm latest published is `0.6.0`).
- The repository includes bug fixes, memory optimizations for multi-page TIFFs, security improvements for print window openers, PDF link/error callbacks, Next.js/RSC `'use client'` support, and automated package integration verification (`npm run check:package`).

## Changes made in this cycle

1. **TIFF performance & race condition prevention**:
   - `src/Viewer/TiffHelpers.ts`: Added AbortSignal support, recognized `image/tif` MIME alias, implemented on-demand page decoding, and deallocated previous page raster memory upon switching.
   - `src/hooks/useTiffImage.ts`: AbortController-driven request cancellation, session-based page synchronization to prevent slow previous page renders from overwriting the selected page, and delayed Object URL revocation to prevent screen flashing.
   - `src/hooks/useTiffImage.test.ts` & `src/Viewer/TiffHelpers.test.ts`: Complete unit tests covering concurrency, lazy decoding, retry, cancellation, and error handling.

2. **Security & robustness**:
   - `src/hooks/useDocumentActions.ts`: Set `printWindow.opener = null` when opening remote PDFs to prevent reverse tabnabbing vulnerabilities. Wrapped cross-origin PDF print in try/catch.
   - `src/Viewer/FileHelpers.ts`: Stripped query parameters and URL hash fragments (`[?#]`) when parsing file extensions.
   - `src/hooks/useViewerState.ts`: Enforced `Number.isInteger` on page numbers to prevent fractional page navigation.

3. **Error recovery & navigation**:
   - `src/Viewer/index.tsx`: Kept document navigation controls available when in multi-document mode even if the active document fails to load.
   - `src/hooks/useFileLoader.ts`: Added `reloadKey` state and retry trigger to restart TIFF and document loading cleanly.

4. **PDF integration**:
   - `src/components/ViewerCanvas/index.tsx`: Attached `onItemClick` to `Document` to connect PDF internal links (bookmarks/outlines) to current page navigation.
   - Added `onLoadError` and `onRenderError` callbacks to `Page` to propagate page-level errors to `onError`.

5. **Packaging, Tooling & CI**:
   - `src/index.ts`: Added `'use client'` directive for Next.js and RSC compatibility.
   - `scripts/post-build.cjs`: Post-processes ESM build output to append explicit `.js` extensions for relative imports.
   - `scripts/check-package.cjs`: Validates package manifest (`main`, `module`, `types`, `exports`), declarations, and relative ESM imports.
   - `package.json`: Added `check:package` script and wired it into `prepublishOnly`.
   - `.github/workflows/ci.yml`: Updated Node matrix to `[22, 24]` and added the package check step.
   - Updated documentation (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `example/index.js`).

## Verification

- `npm test`: 11 test suites passed, 121 tests passed.
- `npm run build:lib`: Built CommonJS (`dist/cjs/`) and ESM (`dist/esm/`).
- `npm run check:package`: Passed with full manifest and import resolution validation.
- `npm run build`: Demo built successfully with production esbuild bundle.
- `npm pack --dry-run`: Verified package contents.

## Next action to publish

1. Authenticate with npm: `npm login`.
2. Confirm identity: `npm whoami`.
3. Run `npm publish`.
4. Deploy demo: `npm run publish-demo`.
5. Confirm npm release: `npm view react-viewer-doc version dist-tags --json`.
