import { useEffect, useRef, useCallback, useMemo } from 'react';
import { pdfjs } from 'react-pdf';
import {
  FileTypes,
} from '../Viewer/FileHelpers';
import { isTiffMime } from '../Viewer/TiffHelpers';
import { useElementWidth } from './useElementWidth';
import { useTiffImage } from './useTiffImage';
import { useViewerEvents } from './useViewerEvents';
import { useDocumentActions } from './useDocumentActions';
import { useFileLoader } from './useFileLoader';
import { useViewerState } from './useViewerState';
import {
  ViewerCoreInput,
  ViewerCoreResult,
  ViewerCoreState,
  ViewerCoreActions,
} from '../types';

export const PDFJS_VERSION = pdfjs.version;
export const DEFAULT_PDF_WORKER_SRC = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

const VIEWER_HORIZONTAL_PADDING = 32;
const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

export function useViewerCore(input: ViewerCoreInput): ViewerCoreResult {
  const { document, labels, theme = 'light', pdfWorkerSrc, onLoad, onError } = input;

  const {
    state,
    setState,
    zoomRef,
    pageNumberRef,
    zoomIn,
    zoomOut,
    rotate,
    resetViewState,
    resetDocumentState,
    setPageNumber: setPageNum,
    onPan,
    toggleSidebar,
  } = useViewerState();

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  const labelsRef = useRef(labels);
  labelsRef.current = labels;
  const documentRef = useRef(document);
  documentRef.current = document;

  const fileTypeRef = useRef(state.fileType);
  fileTypeRef.current = state.fileType;

  const isTiff = isTiffMime(state.fileType);
  const tiffSource = isTiff ? state.fileSelected : null;
  const {
    imageUrl: tiffImageUrl,
    pageCount: tiffPageCount,
    loading: tiffLoading,
  } = useTiffImage({
    source: tiffSource,
    pageNumber: state.pageNumber,
    onLoad,
    onError: (message) => {
      setState(prev => ({ ...prev, error: labelsRef.current?.error || 'Unable to load document' }));
      onErrorRef.current?.(message);
    },
  });

  const totalPages = state.fileType === FileTypes.pdf ? state.numPages : (isTiff ? tiffPageCount : 0);
  const supportsPagination = state.fileType === FileTypes.pdf || (isTiff && tiffPageCount > 1);
  const totalPagesRef = useRef(totalPages);
  totalPagesRef.current = totalPages;
  const supportsPaginationRef = useRef(supportsPagination);
  supportsPaginationRef.current = supportsPagination;
  const fileSelectedRef = useRef(state.fileSelected);
  fileSelectedRef.current = state.fileSelected;

  const setPageNumber = useCallback((page: number) => {
    setPageNum(page, totalPagesRef.current);
  }, [setPageNum]);

  const nextPage = useCallback(() => {
    if (pageNumberRef.current < totalPagesRef.current) {
      setPageNum(pageNumberRef.current + 1, totalPagesRef.current);
    }
  }, [setPageNum, pageNumberRef, totalPagesRef]);

  const prevPage = useCallback(() => {
    if (pageNumberRef.current > 1) {
      setPageNum(pageNumberRef.current - 1, totalPagesRef.current);
    }
  }, [setPageNum, pageNumberRef]);

  useEffect(() => {
    if (totalPages > 0 && pageNumberRef.current > totalPages) {
      setPageNum(Math.min(pageNumberRef.current, totalPages), totalPages);
    }
  }, [totalPages, setPageNum, pageNumberRef]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: measureContainerRef, width: containerWidth } = useElementWidth<HTMLDivElement>();

  const {
    attachViewerContainerRef,
    attachViewerRootRef,
    toggleFullscreen,
  } = useViewerEvents({
    zoomRef,
    pageNumberRef,
    totalPagesRef,
    supportsPaginationRef,
    setState,
    containerRef,
    measureContainerRef,
  });

  const displayImageUrlRef = useRef<string | undefined>(undefined);

  const {
    handleOpenInNew,
    handlePrint,
    handleDownload,
  } = useDocumentActions({
    document,
    labels,
    fileSelectedRef,
    fileTypeRef,
    displayImageUrlRef,
  });

  const {
    initData,
    handleRetry,
  } = useFileLoader({
    documentRef,
    labelsRef,
    onErrorRef,
    setState,
    resetDocumentState,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setState(prev => ({ ...prev, showSidebar: false }));
      }
    };
    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);
    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, [setState]);

  const onPdfLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setState(prev => ({ ...prev, numPages: total }));
    onLoadRef.current?.();
  }, []);

  const onPdfLoadError = useCallback((err: Error) => {
    setState(prev => ({ ...prev, error: labelsRef.current?.error || 'Unable to load document' }));
    onErrorRef.current?.(err.message);
  }, [setState]);

  const onThumbnailLoadError = useCallback((err: Error) => {
    onErrorRef.current?.(err.message);
  }, []);

  const onImageLoad = useCallback(() => {
    onLoadRef.current?.();
  }, []);

  const onImageError = useCallback(() => {
    setState(prev => ({ ...prev, error: labelsRef.current?.error || 'Unable to load image' }));
    onErrorRef.current?.(labelsRef.current?.error || 'Unable to load image');
  }, [setState]);

  useEffect(() => {
    if (typeof window === 'undefined' || pdfWorkerSrc === null) return;
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || DEFAULT_PDF_WORKER_SRC;
  }, [pdfWorkerSrc]);

  useEffect(() => {
    initData();
  }, [initData, document?.fileName, document?.fileUri, document?.fileData]);

  useEffect(() => {
    if (isTiffMime(state.fileType)) {
      setState(prev => ({ ...prev, imageUrl: undefined }));
      return;
    }
    const fileSelected = state.fileSelected;
    if (fileSelected instanceof Blob && state.fileType !== FileTypes.pdf) {
      const url = URL.createObjectURL(fileSelected);
      setState(prev => ({ ...prev, imageUrl: url }));
      return () => URL.revokeObjectURL(url);
    }
    if (typeof fileSelected === 'string') {
      setState(prev => ({ ...prev, imageUrl: fileSelected }));
    }
  }, [state.fileSelected, state.fileType]);

  const displayImageUrl = isTiff ? tiffImageUrl : state.imageUrl;
  displayImageUrlRef.current = displayImageUrl;

  const pdfBaseWidth = Math.max(0, containerWidth - VIEWER_HORIZONTAL_PADDING);
  const pdfPageWidth = pdfBaseWidth > 0 ? Math.floor(pdfBaseWidth * state.zoom) : undefined;
  const thumbnailWidth = Math.min(180, Math.max(72, pdfBaseWidth > 0 ? pdfBaseWidth - 16 : 120));

  const mergedState: ViewerCoreState = useMemo(() => ({
    ...state,
    totalPages,
    supportsPagination,
    containerWidth,
    displayImageUrl,
    isTiff,
    tiffLoading,
    pdfPageWidth,
    thumbnailWidth,
    labels,
    theme,
    documentFileName: documentRef.current?.fileName,
  }), [state, totalPages, supportsPagination, containerWidth, displayImageUrl, isTiff, tiffLoading, pdfPageWidth, thumbnailWidth, labels, theme]);

  const actions: ViewerCoreActions = useMemo(() => ({
    setPageNumber,
    zoomIn,
    zoomOut,
    rotate,
    resetViewState,
    nextPage,
    prevPage,
    handleDownload,
    handlePrint,
    handleOpenInNew,
    toggleFullscreen,
    toggleSidebar,
    handleRetry,
    attachViewerContainerRef,
    attachViewerRootRef,
    onPdfLoadSuccess,
    onPdfLoadError,
    onThumbnailLoadError,
    onPan,
    onImageLoad,
    onImageError,
  }), [
    setPageNumber, zoomIn, zoomOut, rotate, resetViewState,
    nextPage, prevPage, handleDownload, handlePrint,
    handleOpenInNew, toggleFullscreen, toggleSidebar, handleRetry,
    attachViewerContainerRef, attachViewerRootRef, onPdfLoadSuccess, onPdfLoadError,
    onThumbnailLoadError, onPan, onImageLoad, onImageError,
  ]);

  return { state: mergedState, actions, containerRef };
}
