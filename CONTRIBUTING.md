# Contributing

Thank you for your interest in contributing to `react-viewer-doc`.

## Requirements

- Node.js 22.13+ or 24+ (required by `pdfjs-dist` and `react-pdf`)
- npm 10+

These versions are required to build and test the library. Consumers of the published npm package are not constrained by this.

## Getting started

```bash
git clone https://github.com/nandorip/react-viewer-doc.git
cd react-viewer-doc
npm install
```

## Local development

Start the demo app with live rebuild:

```bash
npm start
```

Open [http://localhost:3001](http://localhost:3001). The demo lives in `example/` and imports the component from `src/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | esbuild dev server for the demo |
| `npm test` | Run unit tests with Jest |
| `npm run build:lib` | Compile `src/` to CommonJS (`dist/cjs`) and ESM (`dist/esm`) with types |
| `npm run check:package` | Validate package manifest, ESM imports, and exported declarations |
| `npm run build` | Build the demo bundle in `example/dist` |
| `npm run publish-demo` | Build and deploy the demo to GitHub Pages |

## Project structure

```
src/           Library source (TypeScript)
dist/          Published build output (generated, not committed)
example/       Demo app and GitHub Pages bundle
```

The npm package ships only `dist/`, `README.md`, and `LICENSE` (see `files` in `package.json`).

## Testing

Run the full test suite before opening a pull request:

```bash
npm test
```

Tests live alongside the source in `src/`.

## Building the library

To produce the publishable artifacts locally:

```bash
npm run build:lib
```

This generates:

- `dist/cjs/` — CommonJS build and declarations (`index.js`, `index.d.ts`)
- `dist/esm/` — ESM build and declarations (`index.js`, `index.d.ts`)

## Publishing to npm

See [PUBLISHING.md](PUBLISHING.md) for full instructions, including 1-click GitHub Actions automated releases and owner configuration.

### Quick local release

```bash
npm run release
```

This runs unit tests, compiles CJS/ESM libraries, runs package verification checks, and publishes to npm. If your npm account requires 2FA:

```bash
npm run release -- --otp=YOUR_OTP_CODE
```

### Automated release via GitHub Actions (Recommended)

Once you set the `NPM_TOKEN` secret in your GitHub repository, you can publish without local credentials:
- **By tag:** `git tag v0.6.1 && git push origin v0.6.1`
- **By web UI:** Go to **Actions** -> **Release & Publish to npm** -> **Run workflow**.

### Deploying the demo

Pushes to `main` deploy the demo through GitHub Actions. To publish it manually:

```bash
npm run publish-demo
```

## Pull requests

1. Fork the repository and create a feature branch.
2. Make your changes with tests where applicable.
3. Run `npm test` and ensure it passes.
4. Open a pull request with a clear description of the change.

## Reporting issues

Open an issue at [github.com/nandorip/react-viewer-doc/issues](https://github.com/nandorip/react-viewer-doc/issues).
