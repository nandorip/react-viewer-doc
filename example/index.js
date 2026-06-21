import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactDocumentViewer } from 'react-document-viewer';

const containerStyle = {
  maxWidth: '980px',
  margin: '24px auto',
  padding: '0 16px',
  fontFamily: 'Segoe UI, Tahoma, sans-serif',
  width: '100%',
  boxSizing: 'border-box',
};

const viewerWrapperStyle = {
  marginTop: '20px',
  width: '100%',
  minHeight: 'clamp(280px, 60vh, 600px)',
};

function App() {
  const [document, setDocument] = useState();
  const [theme, setTheme] = useState('light');

  const onFileChange = event => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const [, fileData] = result.split(',');

      setDocument({
        fileName: file.name,
        fileData,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{
      ...containerStyle,
      color: theme === 'dark' ? '#f5f5f5' : '#111111',
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
      minHeight: '100vh',
    }}>
      <h2>react-document-viewer demo</h2>
      <p>Select an image, SVG, TIFF, or PDF from your machine.</p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="file" accept="image/*,.pdf,.svg,.tif,.tiff" onChange={onFileChange} />
        <button type="button" onClick={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))}>
          {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        </button>
      </div>

      <div style={{ marginTop: '12px', fontSize: '14px' }}>
        {document ? `Selected file: ${document.fileName}` : 'No file selected'}
      </div>

      <div style={viewerWrapperStyle}>
        <ReactDocumentViewer
          document={document}
          theme={theme}
          locale="pt-BR"
          height="clamp(280px, 65vh, 600px)"
          pdfWorkerSrc="/pdf.worker.min.mjs"
          labels={{
            download: 'Baixar arquivo',
            print: 'Imprimir documento',
            fullscreen: 'Ver em tela cheia',
          }}
        />
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);