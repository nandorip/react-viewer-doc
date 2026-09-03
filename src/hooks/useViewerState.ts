import { useState, useCallback, useRef } from 'react';
import { ViewerCoreState } from '../types';

const ZOOM_SENSITIVITY = 0.1;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.5;

const limits = (num: number) => Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);

export function createInitialState(): ViewerCoreState {
  return {
    error: '',
    fileType: undefined,
    fileSelected: null,
    imageUrl: undefined,
    showSidebar: false,
    zoom: 1,
    rotation: 0,
    dx: 0,
    dy: 0,
    viewerResetKey: 0,
    numPages: 0,
    pageNumber: 1,
    totalPages: 0,
    supportsPagination: false,
    containerWidth: 0,
    displayImageUrl: undefined,
    isTiff: false,
    tiffLoading: false,
    pdfPageWidth: undefined,
    thumbnailWidth: 120,
    labels: undefined,
    theme: 'light' as const,
    documentFileName: undefined,
  };
}

export function useViewerState() {
  const [state, setState] = useState<ViewerCoreState>(createInitialState);

  const zoomRef = useRef(state.zoom);
  zoomRef.current = state.zoom;
  const pageNumberRef = useRef(state.pageNumber);
  pageNumberRef.current = state.pageNumber;

  const zoomIn = useCallback(() => {
    setState(prev => ({ ...prev, zoom: limits(prev.zoom + ZOOM_SENSITIVITY) }));
  }, []);
  const zoomOut = useCallback(() => {
    setState(prev => ({ ...prev, zoom: limits(prev.zoom - ZOOM_SENSITIVITY) }));
  }, []);
  const rotate = useCallback(() => {
    setState(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
  }, []);

  const resetViewState = useCallback(() => {
    setState(prev => ({
      ...prev,
      rotation: 0, dx: 0, dy: 0, zoom: 1,
      pageNumber: 1, viewerResetKey: prev.viewerResetKey + 1,
    }));
  }, []);

  const resetDocumentState = useCallback(() => {
    resetViewState();
    setState(prev => ({ ...prev, numPages: 0 }));
  }, [resetViewState]);

  const setPageNumber = useCallback((page: number, totalPages: number) => {
    if (!Number.isFinite(page) || page < 1) return;
    if (totalPages > 0 && page > totalPages) return;
    setState(prev => ({ ...prev, pageNumber: page }));
  }, []);

  const onPan = useCallback((x: number, y: number) => {
    setState(prev => ({ ...prev, dx: x, dy: y }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, showSidebar: !prev.showSidebar }));
  }, []);

  return {
    state,
    setState,
    zoomRef,
    pageNumberRef,
    zoomIn,
    zoomOut,
    rotate,
    resetViewState,
    resetDocumentState,
    setPageNumber,
    onPan,
    toggleSidebar,
  };
}
