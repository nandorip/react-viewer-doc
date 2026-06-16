import { useState, useEffect, useRef, useCallback } from 'react';
import { PanViewer } from 'react-image-pan-zoom-rotate';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorViewer, Toolbar } from '../components';
import {
  buildFileFromBase64,
  FileTypes,
  getMimeTypeFromExtension,
  resolveExtension,
  downloadFile,
  resolveOpenableUrl,
  resolveDownloadFileName,
  revokeBlobUrlWhenClosed,
} from './FileHelpers';
import { useElementWidth } from '../hooks/useElementWidth';
import { ViewerProps } from '../types';
import {
  ImageContainer,
  DocumentContainer,
  MainContent,
  PdfViewerRoot,
  SidebarContainer,
  ThumbnailItem,
} from '../styles';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const DEFAULT_PDF_WORKER_SRC = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ZOOM_SENSITIVITY = 0.1;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.5;
const VIEWER_HORIZONTAL_PADDING = 32;
const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
};

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

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const labelsRef = useRef(labels);
  labelsRef.current = labels;

  const onPdfLoadSuccess = ({ numPages: total }: { numPages: number }) => {
    setNumPages(total);
    onLoad?.();
  };

  const onPdfLoadError = (err: Error) => {
    const msg = labelsRef.current?.error || 'Unable to load document';
    setError(msg);
    onErrorRef.current?.(err.message);
  };

  const onThumbnailLoadError = (err: Error) => {
    onErrorRef.current?.(err.message);
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

  const resetViewState = useCallback(() => {
    setRotation(0);
    setDx(0);
    setDy(0);
    setZoom(1);
    setPageNumber(1);
    setViewerResetKey(key => key + 1);
  }, []);

  const resetDocumentState = useCallback(() => {
    resetViewState();
    setNumPages(0);
  }, [resetViewState]);

  const onPan = (x: number, y: number) => {
    setDx(x);
    setDy(y);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const removeWheelListenerRef = useRef<(() => void) | null>(null);
  const { ref: measureContainerRef, width: containerWidth } = useElementWidth<HTMLDivElement>();

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

  const attachViewerContainerRef = useCallback((element: HTMLDivElement | null) => {
    attachContainerRef(element);
    measureContainerRef(element);
  }, [attachContainerRef, measureContainerRef]);

  const pdfBaseWidth = Math.max(0, containerWidth - VIEWER_HORIZONTAL_PADDING);
  const pdfPageWidth = pdfBaseWidth > 0 ? Math.floor(pdfBaseWidth * zoom) : undefined;
  const thumbnailWidth = Math.min(180, Math.max(72, pdfBaseWidth > 0 ? pdfBaseWidth - 16 : 120));

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setShowSidebar(false);
      }
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

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

    const resolved = resolveOpenableUrl(fileSelected);
    if (resolved) {
      return {
        url: resolved,
        shouldRevoke: false,
      };
    }

    return null;
  };

  const handleOpenInNew = () => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;

    const openedWindow = window.open(fileUrl.url, '_blank');
    if (fileUrl.shouldRevoke) {
      revokeBlobUrlWhenClosed(fileUrl.url, openedWindow);
    }
  };

  const writeImagePrintDocument = (printWindow: Window, imageUrl: string) => {
    const printDoc = printWindow.document;
    printDoc.open();
    printDoc.write('<!doctype html><html><head></head><body></body></html>');
    printDoc.close();

    printDoc.title = document?.fileName || labels?.printDocumentTitle || 'Document';

    const style = printDoc.createElement('style');
    style.textContent = `
      html, body { margin: 0; min-height: 100%; }
      body { display: flex; align-items: center; justify-content: center; }
      img { max-width: 100%; max-height: 100vh; }
    `;
    printDoc.head.appendChild(style);

    const img = printDoc.createElement('img');
    img.src = imageUrl;
    img.alt = document?.fileName || labels?.defaultDocumentName || 'document';
    printDoc.body.appendChild(img);

    return img;
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
          if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, printWindow);
        };
        return;
      }

      const printableImage = writeImagePrintDocument(printWindow, fileUrl.url);
      const printImage = () => {
        printWindow.focus();
        printWindow.print();
        if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, printWindow);
      };

      if (printableImage.complete) {
        printImage();
      } else {
        printableImage.addEventListener('load', printImage, { once: true });
      }
    } else if (fileUrl.shouldRevoke) {
      URL.revokeObjectURL(fileUrl.url);
    }
  };

  const handleDownload = () => {
    if (!fileSelected) return;
    downloadFile(fileSelected, resolveDownloadFileName(document));
  };

  const handleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const handleToggleSidebar = () => setShowSidebar(prev => !prev);

  const getUnsupportedFileMessage = useCallback(
    () => labelsRef.current?.unsupportedFile || labelsRef.current?.error || 'Unsupported file type',
    [],
  );

  const setUnsupportedFileError = useCallback(() => {
    const msg = getUnsupportedFileMessage();
    setError(msg);
    onErrorRef.current?.(msg);
  }, [getUnsupportedFileMessage]);

  const applyFileFromBase64 = useCallback((data: string): boolean => {
    const result = buildFileFromBase64(data);
    if (!result) return false;
    setFileType(result.mime);
    setFileSelected(result.file);
    setError('');
    return true;
  }, []);

  const applyFileFromUrl = useCallback((url: string, fileName?: string): boolean => {
    const extension = resolveExtension(url, fileName);
    const type = getMimeTypeFromExtension(extension);
    if (!type) return false;
    setFileType(type);
    setFileSelected(url);
    setError('');
    return true;
  }, []);

  const initData = useCallback(() => {
    const doc = document;

    if (!doc) {
      resetDocumentState();
      setFileType(undefined);
      setFileSelected(null);
      setError('');
      return;
    }

    resetDocumentState();

    if (doc.fileUri !== undefined) {
      if (doc.fileUri.startsWith('data:')) {
        if (applyFileFromBase64(doc.fileUri)) return;
      } else if (applyFileFromUrl(doc.fileUri, doc.fileName)) {
        return;
      }
    }

    if (doc.fileData && applyFileFromBase64(doc.fileData)) {
      return;
    }

    setUnsupportedFileError();
  }, [
    document,
    resetDocumentState,
    applyFileFromBase64,
    applyFileFromUrl,
    setUnsupportedFileError,
  ]);

  const handleRetry = useCallback(() => {
    setError('');
    initData();
  }, [initData]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || DEFAULT_PDF_WORKER_SRC;
  }, [pdfWorkerSrc]);

  useEffect(() => {
    initData();
  }, [initData]);

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

  const showToolbar = Boolean(document) || Boolean(fileSelected);

  return (
    <>
      {showToolbar && (
        <Toolbar
          onRotate={handleRotate}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={resetViewState}
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
      )}

      {error && (
        <ErrorViewer
          message={error}
          onRetry={handleRetry}
          retryLabel={labels?.retry}
        />
      )}

      {!error && (
        <MainContent>
          {fileType === FileTypes.pdf && fileSelected ? (
            <PdfViewerRoot>
              <Document
                file={fileSelected}
                onLoadSuccess={onPdfLoadSuccess}
                onLoadError={onPdfLoadError}
                loading={<div>{labels?.loading || 'Loading document...'}</div>}
              >
                {showSidebar && numPages > 0 && (
                  <SidebarContainer visible={showSidebar}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <ThumbnailItem
                        key={`thumb_${index + 1}`}
                        active={pageNumber === index + 1}
                        onClick={() => setPageNumber(index + 1)}
                      >
                        <Page
                          pageNumber={index + 1}
                          width={thumbnailWidth}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          onLoadError={onThumbnailLoadError}
                        />
                        <div style={{ fontSize: '12px' }}>{index + 1}</div>
                      </ThumbnailItem>
                    ))}
                  </SidebarContainer>
                )}

                <DocumentContainer ref={attachViewerContainerRef} height={height} data-testid="document-container">
                  <Page
                    pageNumber={pageNumber}
                    {...(pdfPageWidth ? { width: pdfPageWidth } : { scale: zoom })}
                    rotate={rotation}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </DocumentContainer>
              </Document>
            </PdfViewerRoot>
          ) : fileSelected ? (
            <ImageContainer
              zoom={zoom}
              rotation={rotation}
              ref={attachViewerContainerRef}
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
                  alt={document?.fileName || labels?.defaultDocumentName || 'document'}
                  onLoad={() => onLoad?.()}
                  onError={() => {
                    const msg = labels?.error || 'Unable to load image';
                    setError(msg);
                    onError?.(msg);
                  }}
                />
              </PanViewer>
            </ImageContainer>
          ) : null}
        </MainContent>
      )}
    </>
  );
};