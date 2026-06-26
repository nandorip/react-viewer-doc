# react-document-viewer

A versatile React component for viewing documents with support for PDF, images (JPG, PNG, GIF, WebP, TIFF), and SVG files.

## ✨ Features

- 📄 **PDF Support** — View PDFs from URLs or base64 with full navigation
- 🖼️ **Image Support** — JPG, PNG, GIF, WebP, TIFF, SVG with pan, zoom, rotate
- 🔗 **Flexible Input** — `fileUri` (URL/data URI) or `fileData` (base64)
- 🛠️ **Toolbar Actions** — Download, Print, Fullscreen, Thumbnails
- 🌐 **i18n** — Built-in locales (en-US, pt-BR, es-ES) + custom labels
- ⌨️ **Keyboard Shortcuts** — Ctrl +/- for zoom, arrows for PDF pages
- 🎨 **MUI Interface** — Modern Material Design components
- 💻 **TypeScript** — Full type definitions included

## Quick Start

```bash
npm install react-document-viewer
```

```tsx
import { ReactDocumentViewer } from 'react-document-viewer';

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
npm install react-document-viewer
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
| `document` | `object` | — | **Required.** Document to display |
| `document.fileData` | `string` | — | Base64 encoded file |
| `document.fileUri` | `string` | — | URL or Data URI |
| `document.fileName` | `string` | — | File name for extension detection |
| `height` | `string \| number` | `600px` | Viewer height |
| `locale` | `'en-US' \| 'pt-BR' \| 'es-ES'` | `'en-US'` | Built-in translations |
| `labels` | `object` | — | Override any label text |
| `extraToolbar` | `ReactNode` | — | Custom buttons in toolbar |
| `pdfWorkerSrc` | `string` | unpkg CDN | Custom PDF.js worker URL |
| `onLoad` | `() => void` | — | Document loaded callback |
| `onError` | `(error: string) => void` | — | Error callback |

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

| Shortcut | Action |
|----------|--------|
| `Ctrl` + `+` | Zoom In |
| `Ctrl` + `-` | Zoom Out |
| `→` | Next PDF Page |
| `←` | Previous PDF Page |

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

## License

MIT © [Fernando Pires Reherman](https://github.com/nandorip)