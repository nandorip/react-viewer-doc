import { useMemo } from 'react';
import { Toolbar } from '../components';
import { DocumentList } from '../components/DocumentList';
import { ViewerCanvas } from '../components/ViewerCanvas';
import { useDocumentList } from '../hooks/useDocumentList';
import { useViewerCore } from '../hooks/useViewerCore';
import { ViewerProps, ToolbarActions } from '../types';
import { ViewerWithDocumentList } from '../styles';
import { FileTypes } from './FileHelpers';

export const Viewer = ({
  document,
  documents,
  documentIndex,
  defaultDocumentIndex,
  onDocumentChange,
  showDocumentList = true,
  extraToolbar,
  renderToolbar,
  height,
  labels,
  theme = 'light',
  pdfWorkerSrc,
  onLoad,
  onError,
}: ViewerProps) => {
  const resolvedDocuments = useMemo(() => {
    if (documents && documents.length > 0) return documents;
    if (document) return [document];
    return [];
  }, [documents, document?.fileName, document?.fileUri, document?.fileData]);

  const documentList = useDocumentList({
    documents: resolvedDocuments,
    documentIndex,
    defaultDocumentIndex,
    onDocumentChange,
  });

  const activeDocument = documentList.activeDocument;

  const viewer = useViewerCore({
    document: activeDocument,
    labels,
    theme,
    pdfWorkerSrc,
    onLoad,
    onError,
  });
  const { state, actions } = viewer;

  const showToolbar = !state.error && (resolvedDocuments.length > 0 || Boolean(state.fileSelected));
  const showList = showDocumentList && documentList.hasMultiple;

  const toolbarActions = useMemo<ToolbarActions>(() => ({
    zoomIn: actions.zoomIn,
    zoomOut: actions.zoomOut,
    rotate: actions.rotate,
    reset: actions.resetViewState,
    nextPage: actions.nextPage,
    prevPage: actions.prevPage,
    setPageNumber: actions.setPageNumber,
    download: actions.handleDownload,
    print: actions.handlePrint,
    openInNew: actions.handleOpenInNew,
    toggleFullscreen: actions.toggleFullscreen,
    toggleSidebar: actions.toggleSidebar,
    getZoom: () => state.zoom,
    getPageNumber: () => state.pageNumber,
    getTotalPages: () => state.totalPages,
    isPdf: () => state.fileType === FileTypes.pdf,
    nextDocument: documentList.hasMultiple ? documentList.nextDocument : undefined,
    prevDocument: documentList.hasMultiple ? documentList.prevDocument : undefined,
    setDocumentIndex: documentList.hasMultiple ? documentList.setDocumentIndex : undefined,
    getDocumentIndex: () => documentList.activeIndex,
    getDocumentCount: () => resolvedDocuments.length,
    getCurrentDocument: () => activeDocument,
  }), [
    actions,
    state.zoom,
    state.pageNumber,
    state.totalPages,
    state.fileType,
    documentList,
    resolvedDocuments.length,
    activeDocument,
  ]);

  const viewerCanvas = (
    <ViewerCanvas
      state={state}
      actions={actions}
      labels={labels}
      theme={theme}
      height={height}
    />
  );

  return (
    <>
      {showToolbar && (renderToolbar ? (
        renderToolbar(toolbarActions)
      ) : (
        <Toolbar
          onRotate={actions.rotate}
          onZoomIn={actions.zoomIn}
          onZoomOut={actions.zoomOut}
          onReset={actions.resetViewState}
          onNextChange={actions.nextPage}
          onPrevPage={actions.prevPage}
          onPageChange={actions.setPageNumber}
          onNewPage={actions.handleOpenInNew}
          onDownload={actions.handleDownload}
          onPrint={actions.handlePrint}
          onFullscreen={actions.toggleFullscreen}
          onToggleSidebar={state.fileType === FileTypes.pdf ? actions.toggleSidebar : undefined}
          onPrevDocument={documentList.hasMultiple ? documentList.prevDocument : undefined}
          onNextDocument={documentList.hasMultiple ? documentList.nextDocument : undefined}
          documentIndex={documentList.activeIndex}
          documentCount={resolvedDocuments.length}
          currentDocumentName={activeDocument?.fileName}
          showSidebar={state.showSidebar}
          hideMovePage={!state.supportsPagination}
          pdfPages={state.totalPages}
          pdfPage={state.pageNumber}
          extra={extraToolbar}
          labels={labels}
          theme={theme}
          toolbarActions={toolbarActions}
        />
      ))}

      {showList ? (
        <ViewerWithDocumentList>
          <DocumentList
            documents={resolvedDocuments}
            activeIndex={documentList.activeIndex}
            onSelect={documentList.setDocumentIndex}
            labels={labels}
            theme={theme}
          />
          {viewerCanvas}
        </ViewerWithDocumentList>
      ) : (
        viewerCanvas
      )}
    </>
  );
};