import { useState, useEffect, useRef, useCallback } from 'react';
import { PanViewer } from 'react-image-pan-zoom-rotate';
import { Document, Page, pdfjs } from 'react-pdf';
import { ErrorViewer, Toolbar } from '../components';
import {
  base64ToBlob,
  FileExtension,
  FileTypes,
  getDataURLPrefix,
  getExtension,
  getFileTypeFromFile,
} from './FileHelpers';
import {
  ImageContainer,
  DocumentContainer,
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
  document: { document?: DocumentData };
  extraToolbar?: React.ReactNode;
}

export const Viewer = ({ document, extraToolbar }: ViewerProps) => {
  const [error, setError] = useState('');
  const [fileType, setFileType] = useState<string>();
  const [fileSelected, setFileSelected] = useState<string | Blob | null>(null);

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // PDF
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onPdfLoadSuccess = ({ numPages: total }: { numPages: number }) => setNumPages(total);

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
      e.preventDefault();
      const newScale = e.deltaY < 0 ? zoom + ZOOM_SENSITIVITY : zoom - ZOOM_SENSITIVITY;
      handleZoom(newScale);
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [zoom, handleZoom]);

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

  const buildFile = (fileBase64: string) => {
    const type = getFileTypeFromFile(fileBase64);
    if (type === FileExtension.PDF) {
      const blobFile = base64ToBlob(fileBase64, 'application/pdf');
      return { file: blobFile, type: 'pdf' };
    }
    const prefix = getDataURLPrefix(type);
    return { file: `${prefix}${prefix.includes(',') ? '' : ','}${fileBase64}`, type: 'jpeg' };
  };

  const initData = async () => {
    const arquivo = document.document;

    if (!arquivo) {
      setError('Nenhum arquivo selecionado!');
      return;
    }

    if (!isInitialState()) reset();

    const responseFile = arquivo.fileUri;

    if (responseFile === undefined) {
      if (arquivo.fileData) {
        const { file, type } = buildFile(arquivo.fileData);
        setFileType(FileTypes[type as keyof typeof FileTypes]);
        setFileSelected(file);
      }
    } else if (responseFile.startsWith('data:')) {
      const { file, type } = buildFile(responseFile);
      setFileType(FileTypes[type as keyof typeof FileTypes]);
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
            onNewPage={handleOpenInNew}
            hideMovePage={fileType !== FileTypes.pdf}
            pdfPages={numPages}
            pdfPage={pageNumber}
            extra={extraToolbar}
          />
          {fileType === FileTypes.pdf ? (
            <DocumentContainer ref={containerRef}>
              <Document file={fileSelected} onLoadSuccess={onPdfLoadSuccess}>
                <Page
                  pageNumber={pageNumber}
                  scale={zoom}
                  rotate={rotation}
                  height={500}
                />
              </Document>
            </DocumentContainer>
          ) : (
            <ImageContainer
              zoom={zoom}
              rotation={rotation}
              ref={containerRef}
            >
              <PanViewer
                zoom={zoom}
                setZoom={() => false}
                pandx={dx}
                pandy={dy}
                onPan={onPan}
              >
                <img src={typeof fileSelected === 'string' ? fileSelected : undefined} alt="document" />
              </PanViewer>
            </ImageContainer>
          )}
        </>
      )}
    </>
  );
};
