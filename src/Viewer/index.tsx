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
} from './FileHelpers';
import {
  ImageContainer,
  DocumentContainer,
  MainContent,
  SidebarContainer,
  ThumbnailItem,
} from '../styles';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ZOOM_SENSITIVITY = 0.1;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.5;

interface DocumentData {
  fileData?: string;
  fileUri?: string;
  fileName: string;
}

interface ViewerProps {
  document?: DocumentData;
  extraToolbar?: React.ReactNode;
  height?: string | number;
  labels?: {
    zoomIn?: string;
    zoomOut?: string;
    rotate?: string;
    reset?: string;
    nextPage?: string;
    prevPage?: string;
    download?: string;
    openInNew?: string;
    loading?: string;
    error?: string;
    thumbnails?: string;
  };
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export const Viewer = ({ 
  document, 
  extraToolbar, 
  height, 
  labels,
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

  const handleZoom = useCallback((num: number) => setZoom(limits(num)), []);

  const handleZoomIn = () => handleZoom(zoom + ZOOM_SENSITIVITY);
  const handleZoomOut = () => handleZoom(zoom - ZOOM_SENSITIVITY);

  const isInitialState = () => rotation === 0 && zoom === 1;

  const reset = () => {
    setRotation(0);
    setDx(0);
    setDy(0);
    setZoom(1);
    setPageNumber(1);
    setNumPages(0);
  };

  const onPan = (x: number, y: number) => {
    setDx(x);
    setDy(y);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const newScale = e.deltaY < 0 ? zoom + ZOOM_SENSITIVITY : zoom - ZOOM_SENSITIVITY;
        handleZoom(newScale);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          handleZoomIn();
        } else if (e.key === '-') {
          e.preventDefault();
          handleZoomOut();
        }
      }

      if (fileType === FileTypes.pdf) {
        if (e.key === 'ArrowRight') handleNextPage();
        if (e.key === 'ArrowLeft') handlePrevPage();
      }
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      element.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoom, handleZoom, fileType, pageNumber, numPages]);

  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleNextPage = () =>
    pageNumber < numPages && setPageNumber(pageNumber + 1);
  const handlePrevPage = () => pageNumber > 1 && setPageNumber(pageNumber - 1);

  const handleOpenInNew = () => {
    if (!fileSelected) return;

    if (fileSelected instanceof Blob) {
      const url = URL.createObjectURL(fileSelected);
      window.open(url, '_blank');
    } else {
      window.open(fileSelected, '_blank');
    }
  };

  const handlePrint = () => {
    if (!fileSelected) return;
    
    const url = fileSelected instanceof Blob ? URL.createObjectURL(fileSelected) : fileSelected;
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
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
      return { file: blobFile, type: 'pdf', mime };
    }

    return {
      file: `data:${mime};base64,${content}`,
      type: 'image',
      mime,
    };
  };

  const initData = async () => {
    const arquivo = document;

    if (!arquivo) {
      setFileType(undefined);
      setFileSelected(null);
      setError('');
      return;
    }

    if (!isInitialState()) reset();

    const responseFile = arquivo.fileUri;

    if (responseFile === undefined) {
      if (arquivo.fileData) {
        const { file, mime } = buildFile(arquivo.fileData);
        setFileType(mime);
        setFileSelected(file);
      }
    } else if (responseFile.startsWith('data:')) {
      const { file, mime } = buildFile(responseFile);
      setFileType(mime);
      setFileSelected(file);
    } else {
      const extension = getExtension(responseFile);
      setFileType(FileTypes[extension as keyof typeof FileTypes]);
      setFileSelected(responseFile);
    }

    setError('');
  };

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
              <DocumentContainer ref={containerRef} height={height} data-testid="document-container">
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
            ) : (
              <ImageContainer
                zoom={zoom}
                rotation={rotation}
                ref={containerRef}
                height={height}
                data-testid="image-container"
              >
                <PanViewer
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
            )}
          </MainContent>
        </>
      )}
    </>
  );
};
