import React, { useState, useCallback, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactViewerDoc, useViewerCore, ViewerCanvas } from 'react-viewer-doc';

export const PDF_WORKER_SRC = (() => {
  const pathName = window.location.pathname;
  const base = pathName.endsWith('/') ? pathName : pathName.replace(/\/[^/]*$/, '/');
  return `${window.location.origin}${base}pdf.worker.min.mjs`;
})();

export const SAMPLE_BASE = (() => {
  const pathName = typeof window !== 'undefined' ? window.location.pathname : '/';
  const base = pathName.endsWith('/') ? pathName : pathName.replace(/\/[^/]*$/, '/');
  return typeof window !== 'undefined' ? `${window.location.origin}${base}` : '';
})();

const SAMPLES = [
  {
    id: 'pdf',
    label: 'Tracemonkey PDF',
    fileName: 'tracemonkey.pdf',
    fileUri: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    icon: '📄',
    color: '#ef4444',
  },
  {
    id: 'tiff',
    label: 'Multipage TIFF',
    fileName: 'multipage.tiff',
    fileUri: `${SAMPLE_BASE}samples/multipage.tiff`,
    icon: '📑',
    color: '#f59e0b',
  },
  {
    id: 'svg',
    label: 'Vector SVG',
    fileName: 'vector.svg',
    fileUri: `${SAMPLE_BASE}samples/vector.svg`,
    icon: '📐',
    color: '#06b6d4',
  },
  {
    id: 'img',
    label: 'Nature Image',
    fileName: 'nature.jpg',
    fileUri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000',
    icon: '🖼️',
    color: '#22c55e',
  },
  {
    id: 'img2',
    label: 'City Image',
    fileName: 'city.jpg',
    fileUri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1000',
    icon: '🌆',
    color: '#3b82f6',
  },
  {
    id: 'img3',
    label: 'Abstract Image',
    fileName: 'abstract.jpg',
    fileUri: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1000',
    icon: '🎨',
    color: '#a855f7',
  },
];

const DEMO_DOCUMENTS = SAMPLES.map((sample) => ({
  id: sample.id,
  fileName: sample.fileName,
  fileUri: sample.fileUri,
}));

const THEME = {
  light: {
    bg: '#f8f9fa',
    surface: '#ffffff',
    surface2: '#f3f4f6',
    border: '#e5e7eb',
    borderHover: '#d1d5db',
    text: '#111827',
    textMuted: '#6b7280',
    textDim: '#9ca3af',
    accent: '#6366f1',
    accentLight: '#eef2ff',
    shadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
    shadowLg: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.04)',
  },
  dark: {
    bg: '#0b0d14',
    surface: '#16181f',
    surface2: '#1e2030',
    border: '#2a2d3a',
    borderHover: '#3a3d4a',
    text: '#e1e4e8',
    textMuted: '#9ca3af',
    textDim: '#6b7280',
    accent: '#818cf8',
    accentLight: '#1e1f3a',
    shadow: '0 1px 3px rgba(0,0,0,0.3)',
    shadowLg: '0 10px 25px -5px rgba(0,0,0,0.5)',
  },
};

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function useTheme() {
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const toggle = useCallback(() => setDark((d) => !d), []);
  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);
  const t = dark ? THEME.dark : THEME.light;
  return { dark, toggle, t };
}

const VIEW_MODES = [
  { key: 'default', label: 'Standard', desc: 'extraToolbar' },
  { key: 'custom', label: 'Custom Toolbar', desc: 'renderToolbar' },
  { key: 'headless', label: 'Headless', desc: 'useViewerCore' },
  { key: 'documents', label: 'Documents', desc: 'documents[]' },
];

function ViewModeSelector({ mode, onChange }) {
  return (
    <div className="modes">
      {VIEW_MODES.map((item) => (
        <button
          key={item.key}
          className={mode === item.key ? 'active' : undefined}
          onClick={() => onChange(item.key)}
        >
          <strong>{item.label}</strong>
          <span>{item.desc}</span>
        </button>
      ))}
    </div>
  );
}

function HeadlessViewer({ doc, dark, height, labels, t }) {
  const viewer = useViewerCore({
    document: doc,
    theme: dark ? 'dark' : 'light',
    pdfWorkerSrc: PDF_WORKER_SRC,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex', gap: 6, padding: '8px 12px',
        background: dark ? '#1e2030' : '#f3f4f6',
        borderBottom: `1px solid ${dark ? '#2a2d3a' : '#e5e7eb'}`,
        alignItems: 'center', flexWrap: 'wrap',
      }}>
        <button onClick={viewer.actions.zoomIn} style={sBtn(t)} title="Zoom in">🔍+</button>
        <button onClick={viewer.actions.zoomOut} style={sBtn(t)} title="Zoom out">🔍−</button>
        <button onClick={viewer.actions.rotate} style={sBtn(t)} title="Rotate">🔄</button>
        <button onClick={viewer.actions.toggleSidebar} style={sBtn(t)} title="Thumbnails">🖼️</button>
        <button onClick={viewer.actions.resetViewState} style={sBtn(t)} title="Reset">↺</button>
        <span style={{ fontSize: 11, color: '#6b7280', margin: '0 4px' }}>|</span>
        <button onClick={viewer.actions.prevPage} disabled={viewer.state.pageNumber <= 1} style={sBtn(t)}>◀</button>
        <span style={{ fontSize: 12, fontWeight: 600, color: dark ? '#e1e4e8' : '#111827' }}>
          {viewer.state.pageNumber}/{viewer.state.totalPages || '-'}
        </span>
        <button onClick={viewer.actions.nextPage} disabled={viewer.state.pageNumber >= viewer.state.totalPages} style={sBtn(t)}>▶</button>
        <span style={{ fontSize: 11, color: '#6b7280', margin: '0 4px' }}>|</span>
        <button onClick={viewer.actions.handleDownload} style={sBtn(t)} title="Download">💾</button>
      </div>
      <ViewerCanvas
        state={viewer.state}
        actions={viewer.actions}
        labels={labels}
        theme={dark ? 'dark' : 'light'}
        height={height}
      />
    </div>
  );
}

function sBtn(t) {
  return {
    padding: '4px 10px', borderRadius: 6, border: `1px solid ${t.border}`,
    background: t.surface, cursor: 'pointer', fontSize: 13, color: t.text,
  };
}

export function App() {
  const { dark, toggle, t } = useTheme();
  const [doc, setDoc] = useState();
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [viewMode, setViewMode] = useState('default');
  const [documents, setDocuments] = useState(null);
  const [documentIndex, setDocumentIndex] = useState(0);

  const handleFile = useCallback((file) => {
    if (!file) return;
    setDocuments(null);
    setViewMode((mode) => (mode === 'documents' ? 'default' : mode));
    setFileInfo({ name: file.name, size: file.size, type: file.type });
    const reader = new FileReader();
    reader.onload = () => {
      const [, data] = String(reader.result).split(',');
      setDoc({ fileName: file.name, fileData: data });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const loadSample = useCallback((sample) => {
    setDocuments(null);
    setViewMode((mode) => (mode === 'documents' ? 'default' : mode));
    setFileInfo({ name: sample.fileName, type: sample.id === 'pdf' ? 'pdf' : 'image', size: 0 });
    setDoc({ fileName: sample.fileName, fileUri: sample.fileUri });
  }, []);

  const loadDocumentBundle = useCallback(() => {
    setDoc(null);
    setDocuments(DEMO_DOCUMENTS);
    setDocumentIndex(0);
    setViewMode('documents');
    setFileInfo({
      name: `Bundle (${DEMO_DOCUMENTS.length} files)`,
      type: 'bundle',
      size: 0,
      activeFile: DEMO_DOCUMENTS[0].fileName,
    });
  }, []);

  const handleDocumentChange = useCallback((index, activeDoc) => {
    setDocumentIndex(index);
    setFileInfo((prev) => (prev ? { ...prev, activeFile: activeDoc.fileName } : prev));
  }, []);

  const handleUrlLoad = useCallback(() => {
    if (!urlInput.trim()) return;
    setDocuments(null);
    setViewMode((mode) => (mode === 'documents' ? 'default' : mode));
    const fileName = urlInput.split('/').pop() || 'document.pdf';
    setFileInfo({ name: fileName, type: 'remote', size: 0 });
    setDoc({ fileName, fileUri: urlInput.trim() });
    setShowUrlInput(false);
    setUrlInput('');
  }, [urlInput]);

  const labels = {
    download: 'Download',
    print: 'Print',
    fullscreen: 'Fullscreen',
    thumbnails: 'Thumbnails',
    loading: 'Loading document...',
    documents: 'Documents',
    nextDocument: 'Next document',
    prevDocument: 'Previous document',
    currentDocument: 'Current document',
  };

  const hasDocuments = documents && documents.length > 0;
  const showViewer = Boolean(doc) || hasDocuments;

  const sampleKind = (sample) => (
    sample.id === 'pdf' ? 'PDF' : sample.id === 'tiff' ? 'TIFF' : sample.id === 'svg' ? 'SVG' : 'Image'
  );

  return (
    <div style={{ minHeight: '100vh' }}>
      <header className="topbar">
        <div className="brand">
          <div className="mark">rv</div>
          <div>
            <h1>react-viewer-doc</h1>
            <p>PDF, TIFF, SVG and images</p>
          </div>
        </div>
        <div className="top-actions">
          <span className="pill">v0.6.1</span>
          <button className="ghost" onClick={toggle}>{dark ? 'Light' : 'Dark'}</button>
        </div>
      </header>

      <main className="page">
        <div className="intro">
          <h2>Look at a document, then change the API.</h2>
          <p>Upload a file or open a sample. Switch between the standard toolbar, a custom toolbar, the headless hook and a document list.</p>
        </div>

        <div className="layout">
          <aside className="side">
            <div
              className="drop"
              style={{ borderColor: dragOver ? 'var(--accent)' : undefined, background: dragOver ? 'var(--accent-soft)' : undefined }}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                id="fileInput" type="file"
                accept="image/*,.pdf,.svg,.tif,.tiff"
                style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <strong>Upload a document</strong>
              <span>Drag and drop or click to browse.</span>
              <div className="formats">
                <i>PDF</i><i>TIFF</i><i>SVG</i><i>JPG</i><i>PNG</i><i>WebP</i>
              </div>
            </div>

            <button className="linkish" onClick={() => setShowUrlInput(!showUrlInput)}>
              {showUrlInput ? 'Hide URL' : 'Load from URL'}
            </button>
            {showUrlInput && (
              <div className="url-row">
                <input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlLoad()}
                  placeholder="https://example.com/document.pdf"
                />
                <button className="load" onClick={handleUrlLoad}>Load</button>
              </div>
            )}

            <div className="kicker">Samples</div>
            <div className="samples">
              <button
                className={viewMode === 'documents' && hasDocuments ? 'sample active' : 'sample'}
                onClick={loadDocumentBundle}
              >
                <b style={{ background: 'var(--accent)' }} />
                <span>
                  <strong>All Samples</strong>
                  <small>{DEMO_DOCUMENTS.length} files · documents[]</small>
                </span>
              </button>
              {SAMPLES.map((sample) => {
                const active = doc?.fileName === sample.fileName;
                return (
                  <button
                    key={sample.id}
                    className={active ? 'sample active' : 'sample'}
                    onClick={() => loadSample(sample)}
                  >
                    <b style={{ background: sample.color }} />
                    <span>
                      <strong>{sample.label}</strong>
                      <small>{sampleKind(sample)}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="stage">
            <div className="stage-head">
              <ViewModeSelector mode={viewMode} onChange={setViewMode} />
            </div>
            {showViewer && fileInfo && (
              <div className="filebar">
                <strong>{fileInfo.activeFile || fileInfo.name || doc?.fileName}</strong>
                {hasDocuments && <span>{documentIndex + 1} / {documents.length}</span>}
                {fileInfo.size > 0 && <span>{formatFileSize(fileInfo.size)}</span>}
                <button onClick={() => { setDoc(null); setDocuments(null); setFileInfo(null); setDocumentIndex(0); }}>Close</button>
              </div>
            )}

            <div className="viewer-frame">
          {!showViewer ? (
            <div className="empty">
              <div>
                <strong>Select a file or sample to preview</strong>
                <span>Supports PDF, images, TIFF and SVG</span>
              </div>
            </div>
          ) : viewMode === 'documents' && hasDocuments ? (
            <ReactViewerDoc
              documents={documents}
              documentIndex={documentIndex}
              onDocumentChange={handleDocumentChange}
              pdfWorkerSrc={PDF_WORKER_SRC}
              theme={dark ? 'dark' : 'light'}
              locale="en-US"
              height="clamp(420px, 72vh, 820px)"
              extraToolbar={(actions) => (
                <>
                  <button
                    onClick={() => actions.prevDocument?.()}
                    title="Previous document"
                    style={{ padding: '4px 8px', borderRadius: 4, border: `1px solid ${t.border}`, background: t.surface, cursor: 'pointer', fontSize: 12 }}
                  >
                    ◀ Doc
                  </button>
                  <button
                    onClick={() => actions.nextDocument?.()}
                    title="Next document"
                    style={{ padding: '4px 8px', borderRadius: 4, border: `1px solid ${t.border}`, background: t.surface, cursor: 'pointer', fontSize: 12 }}
                  >
                    Doc ▶
                  </button>
                  <button
                    onClick={() => alert(
                      `Document: ${actions.getCurrentDocument?.()?.fileName}\n`
                      + `Index: ${(actions.getDocumentIndex?.() ?? 0) + 1}/${actions.getDocumentCount?.() ?? 0}`,
                    )}
                    title="Document info"
                    style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #6366f1', background: 'transparent', color: '#6366f1', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  >
                    ℹ️ Doc Info
                  </button>
                </>
              )}
              labels={labels}
            />
          ) : viewMode === 'default' ? (
            <ReactViewerDoc
              document={doc}
              theme={dark ? 'dark' : 'light'}
              locale="en-US"
              pdfWorkerSrc={PDF_WORKER_SRC}
              height="clamp(420px, 72vh, 820px)"
              extraToolbar={(actions) => (
                <>
                  <button
                    onClick={actions.download}
                    title="Download (custom)"
                    style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #6366f1', background: 'transparent', color: '#6366f1', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  >
                    ⬇ Custom DL
                  </button>
                  <button
                    onClick={() => alert(`Zoom: ${(actions.getZoom() * 100).toFixed(0)}% | Page: ${actions.getPageNumber()}/${actions.getTotalPages()}`)}
                    title="Info"
                    style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #6366f1', background: 'transparent', color: '#6366f1', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  >
                    ℹ️ Info
                  </button>
                </>
              )}
              labels={labels}
            />
          ) : viewMode === 'custom' ? (
            <ReactViewerDoc
              document={doc}
              theme={dark ? 'dark' : 'light'}
              locale="en-US"
              pdfWorkerSrc={PDF_WORKER_SRC}
              height="clamp(420px, 72vh, 820px)"
              renderToolbar={(actions) => (
                <div style={{
                  display: 'flex', gap: 6, padding: '8px 12px',
                  justifyContent: 'center', flexWrap: 'wrap',
                  background: dark ? '#1e2030' : '#f3f4f6',
                  borderBottom: `1px solid ${dark ? '#2a2d3a' : '#e5e7eb'}`,
                }}>
                  <button onClick={actions.zoomIn} style={sBtn(t)} title="Zoom in">➕ Zoom in</button>
                  <button onClick={actions.zoomOut} style={sBtn(t)} title="Zoom out">➖ Zoom out</button>
                  <button onClick={actions.rotate} style={sBtn(t)} title="Rotate">🔄 Rotate</button>
                  <button onClick={actions.prevPage} disabled={actions.getPageNumber() <= 1} style={sBtn(t)}>◀ Prev</button>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 8px', alignSelf: 'center' }}>
                    {actions.getPageNumber()}/{actions.getTotalPages() || '-'}
                  </span>
                  <button onClick={actions.nextPage} disabled={actions.getPageNumber() >= actions.getTotalPages()} style={sBtn(t)}>Next ▶</button>
                  <button onClick={actions.reset} style={sBtn(t)}>↺ Reset</button>
                  <button onClick={actions.download} style={sBtn(t)}>💾 Download</button>
                </div>
              )}
              labels={labels}
            />
          ) : (
            <HeadlessViewer doc={doc} dark={dark} height="clamp(420px, 72vh, 820px)" labels={labels} t={t} />
          )}
            </div>
          </section>
        </div>

        <div className="kicker">API modes</div>
        <div className="cards">
          {[
            { label: 'extraToolbar', desc: 'Add buttons to the default toolbar.' },
            { label: 'renderToolbar', desc: 'Replace the toolbar with your own controls.' },
            { label: 'useViewerCore', desc: 'Read state and actions without the built-in chrome.' },
            { label: 'ViewerCanvas', desc: 'Render the document and supply the surrounding UI.' },
            { label: 'documents', desc: 'Move through a list with previous and next.' },
          ].map((item) => (
            <article key={item.label} className="card">
              <strong>{item.label}</strong>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="kicker">Quick examples</div>
        <div className="code">
          <pre>{`// 1. Multiple documents with native list + navigation
<ReactViewerDoc
  documents={[
    { id: '1', fileName: 'contrato.pdf', fileData: 'JVBERi0xLjQK...' },
    { id: '2', fileName: 'foto.jpg', fileUri: 'https://example.com/foto.jpg' },
    { id: '3', fileName: 'logo.png', fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB...' },
  ]}
  onDocumentChange={(index, doc) => console.log(index, doc.fileName)}
/>

// 2. Add custom buttons to default toolbar
<ReactViewerDoc
  document={doc}
  extraToolbar={(actions) => (
    <button onClick={actions.download}>Download</button>
  )}
/>

// 3. Replace the entire toolbar
<ReactViewerDoc
  document={doc}
  renderToolbar={(actions) => (
    <div>
      <button onClick={actions.zoomIn}>+</button>
      <button onClick={actions.zoomOut}>-</button>
      <button onClick={actions.download}>Download</button>
    </div>
  )}
/>

// 4. Headless — full control with hook + canvas
import { useViewerCore, ViewerCanvas } from 'react-viewer-doc';

function MyViewer({ doc }) {
  const viewer = useViewerCore({ document: doc });

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
      />
    </div>
  );
}`}</pre>
        </div>

        <footer>react-viewer-doc · MIT License · React, MUI and pdf.js</footer>
      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
