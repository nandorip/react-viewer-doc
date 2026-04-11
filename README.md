# react-document-viewer

A versatile React component for viewing documents, supporting both images (JPG, PNG) and PDF files. Features include zooming, rotating, and panning for images, plus full PDF navigation.

## Features

- 📄 **PDF Support**: View PDF files from URLs or base64 strings.
- 🖼️ **Image Support**: View JPG, JPEG, and PNG files with pan, zoom, and rotate.
- 🔗 **Flexible Data**: Support for `fileUri` (URL or Data URI) and `fileData` (pure base64).
- 🛠️ **Customizable**: Add extra buttons to the toolbar with `extraToolbar`.
- 💻 **TypeScript**: Built with TypeScript for better developer experience.
- 🎨 **MUI Integration**: Uses Material UI v6+ for a modern and accessible interface.

## Installation

```bash
npm install react-document-viewer
```

Note: This package requires `@mui/material`, `@mui/icons-material`, `@emotion/react`, and `@emotion/styled` as peer dependencies.

## Usage

### Viewing a PDF via Base64

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
| `extraToolbar` | `ReactNode` (optional) | Custom components to be added to the left side of the toolbar. |

## Development

```bash
npm install
npm start
```

Open `http://localhost:3001` to view the demo.

## Build

To build the library:

```bash
npm run build:lib
```

This will generate both the transpiled JavaScript and the TypeScript definitions in the `dist` folder.

## License

MIT © [Fernando Pires Reherman](https://github.com/nandorip)
