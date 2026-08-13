# react-viewer-doc

[![npm](https://img.shields.io/npm/v/react-viewer-doc.svg)](https://www.npmjs.com/package/react-viewer-doc)
[![CI](https://github.com/nandorip/react-document-viewer/actions/workflows/ci.yml/badge.svg)](https://github.com/nandorip/react-document-viewer/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/react-viewer-doc.svg)](./LICENSE)

A versatile React component for viewing documents with support for PDF, images (JPG, PNG, GIF, WebP, TIFF), and SVG files.

**Demo:** [nandorip.github.io/react-document-viewer](https://nandorip.github.io/react-document-viewer/)

## Features

- **PDF Support** — View PDFs from URLs or base64 with full navigation
- **Image Support** — JPG, PNG, GIF, WebP, TIFF, SVG with pan, zoom, rotate
- **Flexible Input** — `fileUri` (URL/data URI) or `fileData` (base64)
- **Multiple documents** — Sidebar list plus previous/next toolbar navigation
- **Toolbar Actions** — Download, Print, Fullscreen, Thumbnails
- **i18n** — Built-in locales (en-US, pt-BR, es-ES) + custom labels
- **Keyboard Shortcuts** — Ctrl +/- for zoom, arrows for PDF/TIFF pages (viewer must be focused)
- **MUI Interface** — Modern Material Design components with light/dark theme
- **Headless API** — `useViewerCore` hook + `ViewerCanvas` for full UI control
- **TypeScript** — Full type definitions included

## Quick Start

```bash
npm install react-viewer-doc
```

```tsx
import { ReactDocumentViewer } from 'react-viewer-doc';

function App() {
  return (
    <ReactDocumentViewer
      document={{
        fileUri: 'https://example.com/document.pdf',
        fileName: 'document.pdf'
      }}
      height="600px"
    />
  );
}
```

## Installation

```bash
npm install react-viewer-doc
```

**Peer dependencies required:**

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react react-dom
```

## Usage

### PDF from Base64

```tsx
<ReactDocumentViewer
  document={{
    fileData: 'JVBERi0xLjQK...',
    fileName: 'report.pdf'
  }}
  locale="en-US"
  labels={{
    download: 'Download PDF',
    loading: 'Preparing viewer...'
  }}
  onLoad={() => console.log('Document loaded')}
  onError={(err) => console.error(err)}
/>
```

### Image from URL

```tsx
<ReactDocumentViewer
  document={{
    fileUri: 'https://example.com/photo.jpg',
    fileName: 'photo.jpg'
  }}
  height="80vh"
/>
```

### Multiple documents (list)

```tsx
<ReactDocumentViewer
  documents={[
    {
      id: '1',
      fileName: 'contrato.pdf',
      fileData: 'JVBERi0xLjQK...',
    },
    {
      id: '2',
      fileName: 'foto.jpg',
      fileUri: 'https://example.com/foto.jpg',
    },
    {
      id: '3',
      fileName: 'logo.png',
      fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...',
    },
  ]}
  locale="pt-BR"
  onDocumentChange={(index, doc) => console.log(index, doc.fileName)}
/>
```

When `documents` has more than one item, the viewer shows:
- A **sidebar list** to pick the active file
- **Previous / next document** controls in the toolbar

Use `showDocumentList={false}` to hide the sidebar and keep only the toolbar navigation.

### Local File Upload

```tsx
import { useState } from 'react';

function FileUploader() {
  const [doc, setDoc] = useState();

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const [, data] = String(reader.result).split(',');
      setDoc({ fileName: file.name, fileData: data });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input type="file" onChange={handleFile} />
      {doc && <ReactDocumentViewer document={doc} />}
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `document` | `object` | — | Document to display |
| `document.fileData` | `string` | — | Base64 encoded file |
| `document.fileUri` | `string` | — | URL or Data URI |
| `document.fileName` | `string` | — | File name for extension detection |
| `documents` | `DocumentData[]` | — | List of documents to browse |
| `documentIndex` | `number` | — | Controlled active index. Omit for uncontrolled mode. A non-empty `documents` array takes precedence over `document`. |
| `defaultDocumentIndex` | `number` | `0` | Initial index when `documentIndex` is omitted |
| `onDocumentChange` | `(index, doc) => void` | — | Fired when the active document changes |
| `showDocumentList` | `boolean` | `true` | Sidebar list when multiple documents |
| `height` | `string \| number` | `clamp(280px, 60vh, 600px)` | Viewer height |
| `locale` | `'en-US' \| 'pt-BR' \| 'es-ES'` | `'en-US'` | Built-in translations |
| `labels` | `object` | — | Override any label text |
| `theme` | `'light' \| 'dark'` | `'light'` | Viewer color theme |
| `extraToolbar` | `ReactNode \| (actions) => ReactNode` | — | Extra buttons in the default toolbar |
| `renderToolbar` | `(actions) => ReactNode` | — | Replace the entire toolbar |
| `pdfWorkerSrc` | `string` | unpkg CDN | Custom PDF.js worker URL |
| `onLoad` | `() => void` | — | Document loaded callback |
| `onError` | `(error: string) => void` | — | Error callback |

## Custom Toolbar

### Add buttons to the default toolbar

```tsx
<ReactDocumentViewer
  document={doc}
  extraToolbar={(actions) => (
    <button onClick={actions.download}>Download</button>
  )}
/>
```

`extraToolbar` accepts a React node or a function that receives `ToolbarActions` (`zoomIn`, `zoomOut`, `rotate`, `reset`, `nextPage`, `prevPage`, `setPageNumber`, `download`, `print`, `openInNew`, `toggleFullscreen`, `toggleSidebar`, `getZoom`, `getPageNumber`, `getTotalPages`, `isPdf`, plus optional `nextDocument` / `prevDocument` / `setDocumentIndex` / `getDocumentIndex` / `getDocumentCount` / `getCurrentDocument` when more than one document is loaded).

### Replace the entire toolbar

```tsx
<ReactDocumentViewer
  document={doc}
  renderToolbar={(actions) => (
    <div>
      <button onClick={actions.zoomIn}>+</button>
      <button onClick={actions.zoomOut}>-</button>
      <button onClick={actions.download}>Download</button>
    </div>
  )}
/>
```

When `renderToolbar` is provided, the default MUI toolbar is not rendered.

## Headless API

Use `useViewerCore` for state and actions, and `ViewerCanvas` to render the document without the built-in toolbar:

```tsx
import { useViewerCore, ViewerCanvas } from 'react-viewer-doc';

function MyViewer({ doc }) {
  const viewer = useViewerCore({
    document: doc,
    theme: 'dark',
    onLoad: () => console.log('loaded'),
    onError: (err) => console.error(err),
  });

  return (
    <div>
      <MyCustomToolbar
        zoom={viewer.state.zoom}
        onZoomIn={viewer.actions.zoomIn}
        onDownload={viewer.actions.handleDownload}
      />
      <ViewerCanvas
        state={viewer.state}
        actions={viewer.actions}
        theme="dark"
        height="600px"
      />
    </div>
  );
}
```

`ViewerCanvas` imports the required `react-pdf` CSS internally. No extra stylesheet setup is needed for consumers.

## PDF Worker

By default, the PDF.js worker is loaded from the unpkg CDN. Host the worker locally in production (CSP, offline, and supply-chain control) and pass its URL:

```tsx
<ReactDocumentViewer
  document={doc}
  pdfWorkerSrc="/pdf.worker.min.mjs"
/>
```

Copy the worker from `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` to your public folder. The demo (`npm run dev`) already copies it to `example/public/pdf.worker.min.mjs`.

## Labels

```tsx
<ReactDocumentViewer
  document={doc}
  labels={{
    zoomIn: 'Aumentar',
    zoomOut: 'Diminuir',
    rotate: 'Girar',
    reset: 'Resetar',
    download: 'Baixar',
    print: 'Imprimir',
    fullscreen: 'Tela cheia',
    thumbnails: 'Miniaturas',
    loading: 'Carregando...',
    error: 'Erro ao carregar'
  }}
/>
```

## Keyboard Shortcuts

Shortcuts apply only while the viewer is focused (click inside the viewer or tab to it).

| Shortcut | Action |
|----------|--------|
| `Ctrl` + `+` | Zoom In |
| `Ctrl` + `-` | Zoom Out |
| `→` | Next PDF / TIFF Page |
| `←` | Previous PDF / TIFF Page |

## Development

```bash
# Install dependencies
npm install

# Start demo server
npm run dev

# Run tests
npm test

# Build for publishing
npm run build:lib
```

## Browser Support

Requires ES2020+ features. Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT © [Fernando Pires Reherman](https://github.com/nandorip)