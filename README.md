# react-viewer-doc

A React component for viewing PDF, TIFF, SVG and common image files, with pan, zoom, rotate and i18n. Optimized for performance with large documents and many pages using virtualization.

[Demo](https://nandorip.github.io/react-viewer-doc/)

## Requirements

- React: `>=18 <20`
- Peer UI: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`

## Install

```bash
npm install react-viewer-doc
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Usage

```tsx
import { ReactViewerDoc } from 'react-viewer-doc';

function App() {
  return (
    <ReactViewerDoc
      document={{
        fileUri: 'https://example.com/document.pdf',
        fileName: 'document.pdf',
      }}
      height="600px"
    />
  );
}
```

### TypeScript

```ts
import {
  ReactViewerDoc,
  useViewerCore,
  ViewerCanvas,
  type DocumentData,
  type ViewerProps,
  type ToolbarActions,
} from 'react-viewer-doc';

const document: DocumentData = {
  fileName: 'report.pdf',
  fileData: 'JVBERi0xLjQK...',
};

const props: ViewerProps = {
  document,
  locale: 'pt-BR',
  theme: 'light',
};
```

`ReactDocumentViewer` is still exported as a deprecated alias of `ReactViewerDoc`.

## Properties

| Name | Type | Default | Description |
| --- | --- | :---: | --- |
| document | `DocumentData` | — | Single document to display |
| document.fileName | `string` | — | File name (used for type detection and download) |
| document.fileUri | `string` | — | `http(s)`, `blob:` or relative URL |
| document.fileData | `string` | — | Base64 or `data:` URI |
| documents | `DocumentData[]` | — | List of documents. Takes precedence over `document` when non-empty |
| documentIndex | `number` | — | Controlled active index. Omit for uncontrolled mode |
| defaultDocumentIndex | `number` | `0` | Initial index when `documentIndex` is omitted |
| onDocumentChange | `function` | — | `(index, document) => void` |
| showDocumentList | `boolean` | `true` | Sidebar list when there is more than one document |
| height | `string` \| `number` | `clamp(280px, 60vh, 600px)` | Viewer height |
| locale | `'en-US'` \| `'pt-BR'` \| `'es-ES'` | `'en-US'` | Built-in translations |
| labels | `Labels` | — | Override any toolbar or status label |
| theme | `'light'` \| `'dark'` | `'light'` | Color theme |
| extraToolbar | `ReactNode` \| `function` | — | Extra controls in the default toolbar |
| renderToolbar | `function` | — | `(actions: ToolbarActions) => ReactNode` — replace the toolbar |
| pdfWorkerSrc | `string` | unpkg CDN | PDF.js worker URL |
| onLoad | `function` | — | Called when the document loads |
| onError | `function` | — | `(error: string) => void` |

Supported files: PDF, PNG, JPEG, GIF, WebP, SVG and TIFF. `fileUri` is limited to `http:`, `https:` and `blob:`. `data:` input must use an allowed document MIME type.

## Examples

```tsx
// PDF from base64
<ReactViewerDoc
  document={{ fileData: 'JVBERi0xLjQK...', fileName: 'report.pdf' }}
  locale="en-US"
  onLoad={() => console.log('loaded')}
  onError={(error) => console.error(error)}
/>
```

```tsx
// Image from URL
<ReactViewerDoc
  document={{ fileUri: 'https://example.com/photo.jpg', fileName: 'photo.jpg' }}
  height="80vh"
/>
```

```tsx
// Multiple documents
<ReactViewerDoc
  documents={[
    { id: '1', fileName: 'contrato.pdf', fileData: 'JVBERi0xLjQK...' },
    { id: '2', fileName: 'foto.jpg', fileUri: 'https://example.com/foto.jpg' },
  ]}
  locale="pt-BR"
  onDocumentChange={(index, doc) => console.log(index, doc.fileName)}
/>
```

When `documents` has more than one item, the viewer shows a sidebar list and previous/next document controls. Use `showDocumentList={false}` to keep only the toolbar navigation.

```tsx
// Extra toolbar buttons
<ReactViewerDoc
  document={doc}
  extraToolbar={(actions) => (
    <button type="button" onClick={actions.download}>Download</button>
  )}
/>
```

```tsx
// Replace the entire toolbar
<ReactViewerDoc
  document={doc}
  renderToolbar={(actions: ToolbarActions) => (
    <div>
      <button type="button" onClick={actions.zoomIn}>+</button>
      <button type="button" onClick={actions.zoomOut}>-</button>
      <button type="button" onClick={actions.download}>Download</button>
    </div>
  )}
/>
```

## Headless API

Use `useViewerCore` for state and actions, and `ViewerCanvas` to render without the built-in toolbar:

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
      <button type="button" onClick={viewer.actions.zoomIn}>+</button>
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

`ViewerCanvas` imports the required `react-pdf` CSS. Consumers do not need extra stylesheets.

## PDF worker

By default the PDF.js worker is loaded from the unpkg CDN. Host it locally in production and pass the URL:

```tsx
<ReactViewerDoc document={doc} pdfWorkerSrc="/pdf.worker.min.mjs" />
```

Copy `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` to your public folder.

## Keyboard shortcuts

Shortcuts apply only while the viewer is focused.

| Shortcut | Action |
| --- | --- |
| `Ctrl` + `+` | Zoom in |
| `Ctrl` + `-` | Zoom out |
| `→` | Next PDF / TIFF page |
| `←` | Previous PDF / TIFF page |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, testing, and publishing instructions.

Local development requires Node.js 20+. The published package has no Node.js version constraint for consumers.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.
