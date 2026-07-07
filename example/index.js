import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactDocumentViewer, useViewerCore, ViewerCanvas } from 'react-document-viewer';

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

function IconUpload() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon({ type }) {
  if (type === 'pdf') return '📄';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(type)) return '🖼️';
  return '📁';
}

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function useTheme() {
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const toggle = useCallback(() => setDark((d) => !d), []);
  const t = dark ? THEME.dark : THEME.light;
  return { dark, toggle, t };
}

function ViewModeSelector({ mode, onChange, t }) {
  const modes = [
    { key: 'default', label: 'Standard', desc: 'extraToolbar' },
    { key: 'custom', label: 'Custom Toolbar', desc: 'renderToolbar' },
    { key: 'headless', label: 'Headless', desc: 'useViewerCore' },
  ];
  return (
    <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
      {modes.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          style={{
            padding: '8px 16px', borderRadius: 8,
            border: mode === m.key ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
            background: mode === m.key ? t.accentLight : t.surface,
            color: t.text, cursor: 'pointer', fontSize: 12, fontWeight: 600,
            transition: 'all 0.15s',
          }}
        >
          {m.label}
          <span style={{ display: 'block', fontSize: 10, fontWeight: 400, color: t.textMuted, marginTop: 1 }}>{m.desc}</span>
        </button>
      ))}
    </div>
  );
}

function HeadlessViewer({ doc, dark, height, labels, t }) {
  const viewer = useViewerCore({
    document: doc,
    theme: dark ? 'dark' : 'light',
    pdfWorkerSrc: undefined,
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

function App() {
  const { dark, toggle, t } = useTheme();
  const [doc, setDoc] = useState();
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [viewMode, setViewMode] = useState('default');

  const handleFile = useCallback((file) => {
    if (!file) return;
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
    setFileInfo({ name: sample.fileName, type: sample.id === 'pdf' ? 'pdf' : 'image', size: 0 });
    setDoc({ fileName: sample.fileName, fileUri: sample.fileUri });
  }, []);

  const handleUrlLoad = useCallback(() => {
    if (!urlInput.trim()) return;
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
  };

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, transition: 'all 0.3s' }}>
      {/* Header */}
      <header style={{
        background: `linear-gradient(135deg, ${t.accent}15 0%, ${t.surface} 100%)`,
        borderBottom: `1px solid ${t.border}`,
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '14px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${t.accent}, #a855f7)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 18, fontWeight: 700,
            }}>DV</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
                react-document-viewer
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: -1 }}>
                React component · PDF & Image viewer
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              fontSize: 11, fontWeight: 600,
              background: t.accentLight, color: t.accent,
              padding: '3px 10px', borderRadius: 20,
            }}>v0.2.0</span>
            <button onClick={toggle} style={{
              padding: '8px 14px', borderRadius: 8, border: `1px solid ${t.border}`,
              background: t.surface, color: t.text, cursor: 'pointer',
              fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
            }}>
              {dark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>
        {/* Upload Area */}
        <div
          className="fade-in"
          style={{
            border: `2px dashed ${dragOver ? t.accent : t.border}`,
            borderRadius: 16, padding: '40px 24px', textAlign: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
            background: dragOver
              ? (dark ? '#1e1f3a' : '#f0f0ff')
              : t.surface,
            boxShadow: t.shadow,
          }}
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
          <div style={{ marginBottom: 12 }}><IconUpload /></div>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
            Upload a document
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 16 }}>
            Drag & drop or click to browse — PDF, images, TIFF, SVG
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 6,
              background: t.surface2, border: `1px solid ${t.border}`, color: t.textMuted,
            }}>PDF</span>
            <span style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 6,
              background: t.surface2, border: `1px solid ${t.border}`, color: t.textMuted,
            }}>JPG · PNG · GIF</span>
            <span style={{
              fontSize: 11, padding: '3px 10px', borderRadius: 6,
              background: t.surface2, border: `1px solid ${t.border}`, color: t.textMuted,
            }}>WebP · TIFF · SVG</span>
          </div>
        </div>

        {/* URL Input Toggle */}
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button onClick={() => setShowUrlInput(!showUrlInput)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, color: t.accent, fontWeight: 500,
          }}>
            {showUrlInput ? '− Hide URL input' : '+ Load from URL'}
          </button>
          {showUrlInput && (
            <div style={{ marginTop: 10, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlLoad()}
                placeholder="https://example.com/document.pdf"
                style={{
                  padding: '10px 14px', borderRadius: 8, border: `1px solid ${t.border}`,
                  background: t.surface, color: t.text, fontSize: 13, width: 320,
                  outline: 'none', maxWidth: '70vw',
                }}
              />
              <button onClick={handleUrlLoad} style={{
                padding: '10px 18px', borderRadius: 8, border: 'none',
                background: t.accent, color: '#fff', cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
              }}>Load</button>
            </div>
          )}
        </div>

        {/* Samples */}
        <section style={{ marginTop: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            Sample documents
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {SAMPLES.map((s) => {
              const active = doc?.fileName === s.fileName;
              return (
                <button
                  key={s.id}
                  className="fade-in"
                  onClick={() => loadSample(s)}
                  style={{
                    padding: '16px', borderRadius: 12,
                    border: active ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
                    background: active ? t.accentLight : t.surface,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s',
                    boxShadow: t.shadow,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>
                    {s.id === 'pdf' ? 'PDF' : 'Image'}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* File Info */}
        {doc && fileInfo && (
          <div className="fade-in" style={{
            marginTop: 18, padding: '12px 16px', borderRadius: 10,
            background: t.surface, border: `1px solid ${t.border}`,
            display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
            boxShadow: t.shadow,
          }}>
            <span>{FileIcon({ type: fileInfo.type || doc.fileName?.split('.').pop() })}</span>
            <span style={{ fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileInfo.name || doc.fileName}
            </span>
            {fileInfo.size > 0 && (
              <span style={{ color: t.textMuted }}>{formatFileSize(fileInfo.size)}</span>
            )}
            <button
              onClick={() => { setDoc(null); setFileInfo(null); }}
              style={{
                background: 'none', border: `1px solid ${t.border}`, borderRadius: 6,
                padding: '4px 10px', cursor: 'pointer', fontSize: 12, color: t.textMuted,
              }}
            >Close</button>
          </div>
        )}

        {/* View Mode Selector */}
        <ViewModeSelector mode={viewMode} onChange={setViewMode} t={t} />

        {/* Viewer */}
        <div className="fade-in" style={{
          marginTop: 10, borderRadius: 16, overflow: 'hidden',
          boxShadow: t.shadowLg,
        }}>
          {!doc ? (
            <div style={{
              height: 340, borderRadius: 16,
              border: `1px solid ${t.border}`,
              background: t.surface,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12,
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={t.textDim} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <div style={{ fontSize: 14, color: t.textDim, fontWeight: 500 }}>
                Select a file or sample to preview
              </div>
              <div style={{ fontSize: 12, color: t.textDim }}>
                Supports PDF, images, TIFF and SVG
              </div>
            </div>
          ) : viewMode === 'default' ? (
            <ReactDocumentViewer
              document={doc}
              theme={dark ? 'dark' : 'light'}
              locale="en-US"
              height="clamp(340px, 68vh, 720px)"
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
            <ReactDocumentViewer
              document={doc}
              theme={dark ? 'dark' : 'light'}
              locale="en-US"
              height="clamp(340px, 68vh, 720px)"
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
            <HeadlessViewer doc={doc} dark={dark} height="clamp(340px, 68vh, 720px)" labels={labels} t={t} />
          )}
        </div>

        {/* Features */}
        <section style={{ marginTop: 40, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
            API Modes
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { icon: '🎛️', label: 'extraToolbar', desc: 'Add buttons to default toolbar — accepts ReactNode or function(actions)' },
              { icon: '🔄', label: 'renderToolbar', desc: 'Fully replace the toolbar — function(actions) => ReactNode' },
              { icon: '🎣', label: 'useViewerCore', desc: 'Headless hook — all state + actions, render your own UI' },
              { icon: '🖼️', label: 'ViewerCanvas', desc: 'Renders document only (no toolbar) — pairs with useViewerCore' },
            ].map((f) => (
              <div key={f.label} className="fade-in" style={{
                padding: '14px', borderRadius: 10,
                background: t.surface, border: `1px solid ${t.border}`,
                boxShadow: t.shadow,
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: t.textMuted }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Code */}
        <section style={{ marginTop: 36, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
            Quick Examples
          </div>
          <div style={{
            borderRadius: 12, overflow: 'hidden',
            border: `1px solid ${t.border}`, boxShadow: t.shadow,
          }}>
            <pre style={{
              margin: 0, padding: '20px', fontSize: 13, lineHeight: 1.6,
              background: dark ? '#0d1117' : '#f8f9fa',
              color: dark ? '#e1e4e8' : '#24292e',
              overflowX: 'auto',
            }}>{`// 1. Add custom buttons to default toolbar (existing API)
<ReactDocumentViewer
  document={doc}
  extraToolbar={(actions) => (
    <button onClick={actions.download}>Download</button>
  )}
/>

// 2. Replace the entire toolbar
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

// 3. Headless — full control with hook + canvas
import { useViewerCore, ViewerCanvas } from 'react-document-viewer';

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
        </section>

        {/* Footer */}
        <footer style={{
          marginTop: 40, padding: '20px 0', borderTop: `1px solid ${t.border}`,
          textAlign: 'center', fontSize: 12, color: t.textDim,
        }}>
          react-document-viewer · MIT License · Built with React, MUI, and pdf.js
        </footer>
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
