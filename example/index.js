import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactDocumentViewer } from '../src';

const containerStyle = {
  maxWidth: '980px',
  margin: '24px auto',
  padding: '0 16px',
  fontFamily: 'Segoe UI, Tahoma, sans-serif',
};

function App() {
  const [document, setDocument] = useState();

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

  const loadRemotePdf = () => {
    setDocument({
      fileName: 'dummy.pdf',
      fileUri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf?demo=1',
    });
  };

  return (
    <div style={containerStyle}>
      <h2>react-document-viewer demo</h2>
      <p>Select an image or PDF from your machine, or load a public PDF URL.</p>

      <input type="file" accept="image/*,.pdf" onChange={onFileChange} />
      <button type="button" onClick={loadRemotePdf} style={{ marginLeft: '12px' }}>
        Load sample PDF URL
      </button>

      <div style={{ marginTop: '20px' }}>
        <ReactDocumentViewer document={document} />
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
