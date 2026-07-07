import { useMemo } from 'react';
import { Toolbar } from '../components';
import { ViewerCanvas } from '../components/ViewerCanvas';
import { useViewerCore } from '../hooks/useViewerCore';
import { ViewerProps, ToolbarActions } from '../types';
import { FileTypes } from './FileHelpers';

export const Viewer = ({
  document,
  extraToolbar,
  renderToolbar,
  height,
  labels,
  theme = 'light',
  pdfWorkerSrc,
  onLoad,
  onError,
}: ViewerProps) => {
  const viewer = useViewerCore({ document, labels, theme, pdfWorkerSrc, onLoad, onError });
  const { state, actions } = viewer;

  const showToolbar = !state.error && (Boolean(document) || Boolean(state.fileSelected));

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
  }), [actions, state.zoom, state.pageNumber, state.totalPages, state.fileType]);

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

      <ViewerCanvas
        state={state}
        actions={actions}
        labels={labels}
        theme={theme}
        height={height}
      />
    </>
  );
};
