# react-document-viewer

A versatile React component for viewing documents, supporting both images (JPG, PNG) and PDF files. Features include zooming, rotating, and panning for images, plus full PDF navigation.

## Features

- 📄 **PDF Support**: View PDF files from URLs or base64 strings.
- 🖼️ **Image Support**: View JPG, JPEG, PNG, GIF, and WebP files with pan, zoom, and rotate.
- 🔗 **Flexible Data**: Support for `fileUri` (URL or Data URI) and `fileData` (pure base64).
- 🛠️ **Customizable**: Add extra buttons to the toolbar with `extraToolbar`.
- 🌍 **Internationalization**: Customizable labels for all buttons and messages.
- ⌨️ **Accessibility**: Keyboard shortcuts (Ctrl +/- for zoom, Arrows for PDF pages) and ARIA support.
- 💾 **Actions**: Built-in Download, Print, and Fullscreen support.
- 💻 **TypeScript**: Built with TypeScript for better developer experience.
- 🎨 **MUI Integration**: Uses Material UI v6+ for a modern and accessible interface.

## Installation

```bash
npm install react-document-viewer
```

Note: This package requires `@mui/material`, `@mui/icons-material`, `@emotion/react`, and `@emotion/styled` as peer dependencies.
It also expects `react` and `react-dom` to be installed by your application.

## Usage

### Viewing a PDF via Base64 with Custom Labels

```tsx
import { ReactDocumentViewer } from 'react-document-viewer';

function App() {
  return (
    <div style={{ height: '500px' }}>
      <ReactDocumentViewer
        document={{
          fileData: 'JVBERi0xLjQK...', // base64 string
          fileName: 'document.pdf'
        }}
        locale="en-US"
        pdfWorkerSrc="/pdf.worker.min.mjs"
        labels={{
          download: 'Download PDF',
          print: 'Print Document',
          loading: 'Preparing viewer...'
        }}
        onLoad={() => console.log('Ready!')}
      />
    </div>
  );
}
```

### Viewing an Image via URL

```tsx
import { ReactDocumentViewer } from 'react-document-viewer';

function App() {
  return (
    <ReactDocumentViewer
      document={{
        fileUri: 'https://example.com/image.jpg',
        fileName: 'nature.jpg'
      }}
      height="80vh"
      extraToolbar={<button onClick={() => alert('Custom Action')}>Custom</button>}
    />
  );
}
```

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `document` | `object` | The document to display. |
| `document.fileData` | `string` (optional) | Base64 encoded file content. |
| `document.fileUri` | `string` (optional) | URL or Data URI of the file. |
| `document.fileName` | `string` | Name of the file (used for extension detection). |
| `height` | `string \| number` (optional) | Height of the viewer container (default: `600px`). |
| `extraToolbar` | `ReactNode` (optional) | Custom components to be added to the left side of the toolbar. |
| `labels` | `object` (optional) | Custom text for buttons and status messages. |
| `locale` | `'en-US' \| 'pt-BR' \| 'es-ES'` (optional) | Built-in label set to use (default: `en-US`). |
| `pdfWorkerSrc` | `string` (optional) | Custom PDF.js worker URL. Defaults to a versioned unpkg URL. |
| `onLoad` | `function` (optional) | Callback function called when the document is successfully loaded. |
| `onError` | `function` (optional) | Callback function called when an error occurs during loading. |

### Internationalization

Use `locale` for built-in translations and `labels` to override any individual text.

```tsx
<ReactDocumentViewer
  locale="pt-BR"
  labels={{
    reset: 'Centralizar',
    unsupportedFile: 'Arquivo nao suportado'
  }}
/>
```

Built-in locales:

- `en-US`
- `pt-BR`
- `es-ES`

### Labels Object

| Key | Default (`en-US`) |
| :--- | :--- |
| `zoomIn` | `Zoom in` |
| `zoomOut` | `Zoom out` |
| `rotate` | `Rotate` |
| `reset` | `Reset` |
| `nextPage` | `Next page` |
| `prevPage` | `Previous page` |
| `download` | `Download` |
| `print` | `Print` |
| `openInNew` | `Open in new tab` |
| `fullscreen` | `Fullscreen` |
| `loading` | `Loading document...` |
| `error` | `Unable to load document` |
| `unsupportedFile` | `Unsupported file type` |
| `thumbnails` | `Thumbnails` |
| `defaultDocumentName` | `document` |
| `printDocumentTitle` | `Document` |
| `errorBoundary` | `Sorry, something went wrong while loading the viewer.` |
| `currentPage` | `Current page` |

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl` + `+` / `=` | Zoom In |
| `Ctrl` + `-` | Zoom Out |
| `Arrow Right` | Next PDF Page |
| `Arrow Left` | Previous PDF Page |

## Development

```bash
npm install
npm start
```

Open `http://localhost:3001` to view the demo.

Run the test suite:

```bash
npm test -- --runInBand
```

## Build

To build the library:

```bash
npm run build:lib
```

This will generate both the transpiled JavaScript and the TypeScript definitions in the `dist` folder.

## Publishing

The npm package is built from `dist` during `npm pack`/`npm publish` via the `prepack` script. Use this command to inspect what will be published:

```bash
npm pack --dry-run
```

## Notes

- PDF rendering depends on the PDF.js worker. By default this package uses a versioned unpkg worker URL; pass `pdfWorkerSrc` if your application requires a local asset, strict CSP, or offline support.
- Remote documents must be served with browser-compatible CORS headers.

## License

MIT © [Fernando Pires Reherman](https://github.com/nandorip)
