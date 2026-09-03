import { Document, Page } from 'react-pdf';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { ErrorViewer } from '../ErrorViewer';
import { PanViewer } from '../PanViewer';
import { LazyPdfThumbnail } from '../LazyPdfThumbnail';
import { ViewerCanvasProps } from '../../types';
import { FileTypes } from '../../Viewer/FileHelpers';
import { useIsMobile } from '../../hooks/useIsMobile';
import {
  ImageContainer,
  DocumentContainer,
  LoadingMessage,
  MainContent,
  PdfViewerRoot,
  SidebarContainer,
} from '../../styles';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export const ViewerCanvas = ({
  state,
  actions,
  labels,
  theme = 'light',
  height,
}: ViewerCanvasProps) => {
  const isMobile = useIsMobile();
  const {
    error,
    fileType,
    fileSelected,
    showSidebar,
    zoom,
    rotation,
    dx,
    dy,
    viewerResetKey,
    numPages,
    pageNumber,
    displayImageUrl,
    isTiff,
    tiffLoading,
    pdfPageWidth,
    thumbnailWidth,
    documentFileName,
  } = state;

  const thumbnailHeight = Math.floor(thumbnailWidth * 1.3) + 36;
  const thumbnailMobileWidth = 92;
  const desktopHeight = typeof height === 'number' ? height : 600;

  if (error) {
    return (
      <ErrorViewer
        message={error}
        onRetry={actions.handleRetry}
        retryLabel={labels?.retry}
      />
    );
  }

  if (fileType === FileTypes.pdf && fileSelected) {
    return (
      <MainContent>
        <PdfViewerRoot>
          <Document
            file={fileSelected}
            onLoadSuccess={actions.onPdfLoadSuccess}
            onLoadError={actions.onPdfLoadError}
            loading={<LoadingMessage theme={theme}>{labels?.loading || 'Loading document...'}</LoadingMessage>}
          >
            {showSidebar && numPages > 0 && (
              <SidebarContainer visible={showSidebar} theme={theme}>
                <FixedSizeList
                  height={isMobile ? 132 : desktopHeight}
                  itemCount={numPages}
                  itemSize={isMobile ? thumbnailMobileWidth : thumbnailHeight}
                  width={isMobile ? '100%' : 200}
                  layout={isMobile ? 'horizontal' : 'vertical'}
                  style={{ overflow: 'auto' }}
                >
                  {({ index, style }: ListChildComponentProps) => (
                    <LazyPdfThumbnail
                      key={`thumb_${index + 1}`}
                      pageNumber={index + 1}
                      active={pageNumber === index + 1}
                      width={thumbnailWidth}
                      theme={theme}
                      loadingLabel={labels?.loading || 'Loading document...'}
                      onSelect={actions.setPageNumber}
                      onLoadError={actions.onThumbnailLoadError}
                      style={style}
                    />
                  )}
                </FixedSizeList>
              </SidebarContainer>
            )}

            <DocumentContainer
              key={viewerResetKey}
              ref={actions.attachViewerContainerRef}
              height={height}
              theme={theme}
              data-testid="document-container"
            >
              <Page
                pageNumber={pageNumber}
                {...(pdfPageWidth ? { width: pdfPageWidth } : { scale: zoom })}
                rotate={rotation}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<LoadingMessage theme={theme}>{labels?.loading || 'Loading document...'}</LoadingMessage>}
              />
            </DocumentContainer>
          </Document>
        </PdfViewerRoot>
      </MainContent>
    );
  }

  if (fileSelected) {
    return (
      <MainContent>
        <ImageContainer
          rotation={rotation}
          ref={actions.attachViewerContainerRef}
          height={height}
          theme={theme}
          data-testid="image-container"
        >
          {isTiff && tiffLoading && !displayImageUrl ? (
            <LoadingMessage theme={theme}>{labels?.loading || 'Loading document...'}</LoadingMessage>
          ) : (
            <PanViewer
              key={viewerResetKey}
              zoom={zoom}
              dx={dx}
              dy={dy}
              onPan={actions.onPan}
            >
              <img
                src={displayImageUrl}
                alt={documentFileName || labels?.defaultDocumentName || 'document'}
                onLoad={() => { if (!isTiff) actions.onImageLoad(); }}
                onError={actions.onImageError}
              />
            </PanViewer>
          )}
        </ImageContainer>
      </MainContent>
    );
  }

  return null;
};
