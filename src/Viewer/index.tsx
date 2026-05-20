import { useState, useEffect, useRef, useCallback } from 'react';
import { PanViewer } from 'react-image-pan-zoom-rotate';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorViewer, Toolbar } from '../components';
import {
  base64ToBlob,
  FileExtension,
  FileTypes,
  getExtension,
  getFileTypeFromFile,
  getMimeTypeFromBase64,
  downloadFile,
  isValidUrl,
} from './FileHelpers';
import { ViewerProps } from '../types';
import {
  ImageContainer,
  DocumentContainer,
  MainContent,
  SidebarContainer,
  ThumbnailItem,
} from '../styles';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const DEFAULT_PDF_WORKER_SRC = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

pdfjs.GlobalWorkerOptions.workerSrc = DEFAULT_PDF_WORKER_SRC;

const ZOOM_SENSITIVITY = 0.1;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.5;
const BLOB_URL_REVOKE_DELAY_MS = 60_000;

export const Viewer = ({
  document,
  extraToolbar,
  height,
  labels,
  pdfWorkerSrc,
  onLoad,
  onError
}: ViewerProps) => {
  const [error, setError] = useState('');
  const [fileType, setFileType] = useState<string>();
  const [fileSelected, setFileSelected] = useState<string | Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [showSidebar, setShowSidebar] = useState(false);

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [viewerResetKey, setViewerResetKey] = useState(0);

  // PDF
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onPdfLoadSuccess = ({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    onLoad?.();
  };

  const onPdfLoadError = (err: Error) => {
    const msg = labels?.error || 'Erro ao carregar documento';
    setError(msg);
    onError?.(err.message);
  };

  const limits = (num: number) => Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const fileTypeRef = useRef(fileType);
  fileTypeRef.current = fileType;
  const pageNumberRef = useRef(pageNumber);
  pageNumberRef.current = pageNumber;
  const numPagesRef = useRef(numPages);
  numPagesRef.current = numPages;

  const handleZoom = useCallback((num: number) => setZoom(limits(num)), []);

  const handleZoomIn = () => handleZoom(zoomRef.current + ZOOM_SENSITIVITY);
  const handleZoomOut = () => handleZoom(zoomRef.current - ZOOM_SENSITIVITY);

  const handleNextPageRef = useRef(() => {
    if (pageNumberRef.current < numPagesRef.current) {
      setPageNumber(pageNumberRef.current + 1);
    }
  });
  const handlePrevPageRef = useRef(() => {
    if (pageNumberRef.current > 1) {
      setPageNumber(pageNumberRef.current - 1);
    }
  });

  const isInitialState = () => rotation === 0 && zoom === 1;

  const reset = useCallback(() => {
    setRotation(0);
    setDx(0);
    setDy(0);
    setZoom(1);
    setPageNumber(1);
    setNumPages(0);
    setViewerResetKey(key => key + 1);
  }, []);

  const onPan = (x: number, y: number) => {
    setDx(x);
    setDy(y);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const removeWheelListenerRef = useRef<(() => void) | null>(null);

  const attachContainerRef = useCallback((element: HTMLDivElement | null) => {
    removeWheelListenerRef.current?.();
    removeWheelListenerRef.current = null;
    containerRef.current = element;

    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;

      e.preventDefault();
      const nextZoom = e.deltaY < 0
        ? zoomRef.current + ZOOM_SENSITIVITY
        : zoomRef.current - ZOOM_SENSITIVITY;
      setZoom(limits(nextZoom));
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    removeWheelListenerRef.current = () => element.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          const newZoom = limits(zoomRef.current + ZOOM_SENSITIVITY);
          setZoom(newZoom);
        } else if (e.key === '-') {
          e.preventDefault();
          const newZoom = limits(zoomRef.current - ZOOM_SENSITIVITY);
          setZoom(newZoom);
        }
      }

      if (fileTypeRef.current === FileTypes.pdf) {
        if (e.key === 'ArrowRight' && pageNumberRef.current < numPagesRef.current) {
          setPageNumber(pageNumberRef.current + 1);
        }
        if (e.key === 'ArrowLeft' && pageNumberRef.current > 1) {
          setPageNumber(pageNumberRef.current - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      removeWheelListenerRef.current?.();
    };
  }, []);

  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleNextPage = () => handleNextPageRef.current();
  const handlePrevPage = () => handlePrevPageRef.current();

  const createOpenableFileUrl = () => {
    if (!fileSelected) return null;

    if (fileSelected instanceof Blob) {
      return {
        url: URL.createObjectURL(fileSelected),
        shouldRevoke: true,
      };
    }

    if (isValidUrl(fileSelected)) {
      return {
        url: fileSelected,
        shouldRevoke: false,
      };
    }

    return null;
  };

  const scheduleRevokeObjectUrl = (url: string) => {
    window.setTimeout(() => URL.revokeObjectURL(url), BLOB_URL_REVOKE_DELAY_MS);
  };

  const handleOpenInNew = () => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;

    const openedWindow = window.open(fileUrl.url, '_blank');
    if (fileUrl.shouldRevoke) {
      if (openedWindow) {
        scheduleRevokeObjectUrl(fileUrl.url);
      } else {
        URL.revokeObjectURL(fileUrl.url);
      }
    }
  };

  const handlePrint = () => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      if (fileType === FileTypes.pdf) {
        printWindow.location.href = fileUrl.url;
        printWindow.onload = () => {
          printWindow.print();
          if (fileUrl.shouldRevoke) scheduleRevokeObjectUrl(fileUrl.url);
        };
        return;
      }

      printWindow.document.open();
      printWindow.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>${document?.fileName || 'document'}</title>
            <style>
              html, body {
                margin: 0;
                min-height: 100%;
              }
              body {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              img {
                max-width: 100%;
                max-height: 100vh;
              }
            </style>
          </head>
          <body>
            <img src="${fileUrl.url}" alt="${document?.fileName || 'document'}" />
          </body>
        </html>
      `);
      printWindow.document.close();

      const printableImage = printWindow.document.querySelector('img');
      const printImage = () => {
        printWindow.focus();
        printWindow.print();
        if (fileUrl.shouldRevoke) scheduleRevokeObjectUrl(fileUrl.url);
      };

      if (printableImage?.complete) {
        printImage();
      } else {
        printableImage?.addEventListener('load', printImage, { once: true });
      }
    } else if (fileUrl.shouldRevoke) {
      URL.revokeObjectURL(fileUrl.url);
    }
  };

  const handleDownload = () => {
    if (!fileSelected || !document?.fileName) return;
    downloadFile(fileSelected, document.fileName);
  };

  const handleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const handleToggleSidebar = () => setShowSidebar(prev => !prev);

  const getUnsupportedFileMessage = () => labels?.unsupportedFile || labels?.error || 'Tipo de arquivo não suportado';

  const setUnsupportedFileError = () => {
    const msg = getUnsupportedFileMessage();
    setError(msg);
    onError?.(msg);
  };

  const buildFile = (fileBase64: string) => {
    let content = fileBase64;
    if (fileBase64.startsWith('data:')) {
      const parts = fileBase64.split(',');
      if (parts.length > 1) {
        content = parts[1];
      }
    }

    const type = getFileTypeFromFile(fileBase64);
    const mime = getMimeTypeFromBase64(fileBase64);

    if (type === FileExtension.PDF) {
      const blobFile = base64ToBlob(content, 'application/pdf');
      if (!blobFile) return null;
      return { file: blobFile, type: 'pdf', mime };
    }

    if (type !== FileExtension.IMAGE) return null;

    const blobFile = base64ToBlob(content, mime);
    if (blobFile) {
      return {
        file: blobFile,
        type: 'image',
        mime,
      };
    }

    return {
      file: `data:${mime};base64,${content}`,
      type: 'image',
      mime,
    };
  };

  const initData = async () => {
    const doc = document;

    if (!doc) {
      setFileType(undefined);
      setFileSelected(null);
      setError('');
      return;
    }

    if (!isInitialState()) reset();

    const responseFile = doc.fileUri;

    if (responseFile === undefined) {
      if (doc.fileData) {
        const result = buildFile(doc.fileData);
        if (result) {
          setFileType(result.mime);
          setFileSelected(result.file);
        } else {
          setUnsupportedFileError();
          return;
        }
      } else {
        setUnsupportedFileError();
        return;
      }
    } else if (responseFile.startsWith('data:')) {
      const result = buildFile(responseFile);
      if (result) {
        setFileType(result.mime);
        setFileSelected(result.file);
      } else {
        setUnsupportedFileError();
        return;
      }
    } else {
      const extension = getExtension(responseFile);
      const type = FileTypes[extension as keyof typeof FileTypes];
      if (!type || type === FileTypes.csv) {
        setUnsupportedFileError();
        return;
      }
      setFileType(type);
      setFileSelected(responseFile);
    }

    setError('');
  };

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || DEFAULT_PDF_WORKER_SRC;
  }, [pdfWorkerSrc]);

  useEffect(() => {
    initData();
  }, [document]);

  useEffect(() => {
    if (fileSelected instanceof Blob && fileType !== FileTypes.pdf) {
      const url = URL.createObjectURL(fileSelected);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof fileSelected === 'string') {
      setImageUrl(fileSelected);
    }
  }, [fileSelected, fileType]);

  return (
    <>
      {error && <ErrorViewer message={error} />}

      {!error && (
        <>
          <Toolbar
            onRotate={handleRotate}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={reset}
            onNextChange={handleNextPage}
            onPrevPage={handlePrevPage}
            onPageChange={setPageNumber}
            onNewPage={handleOpenInNew}
            onDownload={handleDownload}
            onPrint={handlePrint}
            onFullscreen={handleFullscreen}
            onToggleSidebar={fileType === FileTypes.pdf ? handleToggleSidebar : undefined}
            showSidebar={showSidebar}
            hideMovePage={fileType !== FileTypes.pdf}
            pdfPages={numPages}
            pdfPage={pageNumber}
            extra={extraToolbar}
            labels={labels}
          />
          <MainContent>
            {fileType === FileTypes.pdf && (
              <SidebarContainer visible={showSidebar}>
                <Document 
                  file={fileSelected} 
                  loading={null}
                  onLoadError={() => null}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <ThumbnailItem 
                      key={`thumb_${index + 1}`} 
                      active={pageNumber === index + 1}
                      onClick={() => setPageNumber(index + 1)}
                    >
                      <Page 
                        pageNumber={index + 1} 
                        width={180} 
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                      <div style={{ fontSize: '12px' }}>{index + 1}</div>
                    </ThumbnailItem>
                  ))}
                </Document>
              </SidebarContainer>
            )}
            
            {fileType === FileTypes.pdf ? (
              <DocumentContainer ref={attachContainerRef} height={height} data-testid="document-container">
                <Document
                  file={fileSelected}
                  onLoadSuccess={onPdfLoadSuccess}
                  onLoadError={onPdfLoadError}
                  loading={<div>{labels?.loading || 'Carregando documento...'}</div>}
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={zoom}
                    rotate={rotation}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </DocumentContainer>
            ) : fileSelected ? (
              <ImageContainer
                zoom={zoom}
                rotation={rotation}
                ref={attachContainerRef}
                height={height}
                data-testid="image-container"
              >
                <PanViewer
                  key={viewerResetKey}
                  zoom={zoom}
                  setZoom={() => false}
                  pandx={dx}
                  pandy={dy}
                  onPan={onPan}
                >
                  <img 
                    src={imageUrl} 
                    alt={document?.fileName || 'document'} 
                    onLoad={() => onLoad?.()}
                    onError={() => {
                      const msg = labels?.error || 'Erro ao carregar imagem';
                      setError(msg);
                      onError?.(msg);
                    }}
                  />
                </PanViewer>
              </ImageContainer>
            ) : null}
          </MainContent>
        </>
      )}
    </>
  );
};
