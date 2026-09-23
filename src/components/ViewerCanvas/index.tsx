import { Document, Page } from 'react-pdf';
import { Grid, List, type CellComponentProps, type RowComponentProps } from 'react-window';

import { ErrorViewer } from '../ErrorViewer';
import { PanViewer } from '../PanViewer';
import { LazyPdfThumbnail } from '../LazyPdfThumbnail';
import { ViewerCanvasProps, ViewerTheme } from '../../types';
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

type ThumbnailListProps = {
  theme: ViewerTheme;
  width: number;
  loadingLabel: string;
  onSelect: (page: number) => void;
  onLoadError: (error: Error) => void;
  currentPage: number;
};

function DesktopThumbnailRow({
  index,
  style,
  theme,
  width,
  loadingLabel,
  onSelect,
  onLoadError,
  currentPage,
}: RowComponentProps<ThumbnailListProps>) {
  const pageNumber = index + 1;
  return (
    <LazyPdfThumbnail
      pageNumber={pageNumber}
      active={currentPage === pageNumber}
      width={width}
      theme={theme}
      loadingLabel={loadingLabel}
      onSelect={onSelect}
      onLoadError={onLoadError}
      style={style}
    />
  );
}

function MobileThumbnailCell({
  columnIndex,
  style,
  theme,
  width,
  loadingLabel,
  onSelect,
  onLoadError,
  currentPage,
}: CellComponentProps<ThumbnailListProps>) {
  const pageNumber = columnIndex + 1;
  return (
    <LazyPdfThumbnail
      pageNumber={pageNumber}
      active={currentPage === pageNumber}
      width={width}
      theme={theme}
      loadingLabel={loadingLabel}
      onSelect={onSelect}
      onLoadError={onLoadError}
      style={style}
    />
  );
}

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
  const loadingLabel = labels?.loading || 'Loading document...';

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
    const thumbnailProps: ThumbnailListProps = {
      theme,
      width: thumbnailWidth,
      loadingLabel,
      onSelect: actions.setPageNumber,
      onLoadError: actions.onThumbnailLoadError,
      currentPage: pageNumber,
    };

    return (
      <MainContent>
        <PdfViewerRoot>
          <Document
            file={fileSelected}
            onLoadSuccess={actions.onPdfLoadSuccess}
            onLoadError={actions.onPdfLoadError}
            suspense={false}
            loading={<LoadingMessage theme={theme}>{loadingLabel}</LoadingMessage>}
          >
            {showSidebar && numPages > 0 && (
              <SidebarContainer visible={showSidebar} theme={theme}>
                {isMobile ? (
                  <Grid
                    cellComponent={MobileThumbnailCell}
                    cellProps={thumbnailProps}
                    columnCount={numPages}
                    columnWidth={thumbnailMobileWidth}
                    rowCount={1}
                    rowHeight={132}
                    style={{ height: 132, width: '100%' }}
                  />
                ) : (
                  <List
                    rowComponent={DesktopThumbnailRow}
                    rowCount={numPages}
                    rowHeight={thumbnailHeight}
                    rowProps={thumbnailProps}
                    style={{ height: desktopHeight, width: 200, overflow: 'auto' }}
                  />
                )}
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
                loading={<LoadingMessage theme={theme}>{loadingLabel}</LoadingMessage>}
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
            <LoadingMessage theme={theme}>{loadingLabel}</LoadingMessage>
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
