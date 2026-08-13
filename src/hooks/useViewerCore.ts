import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { pdfjs } from 'react-pdf';
import {
  buildFileFromBase64,
  FileTypes,
  getMimeTypeFromExtension,
  resolveExtension,
  downloadFile,
  resolveOpenableUrl,
  resolveDownloadFileName,
  revokeBlobUrlWhenClosed,
  isSafeDocumentUri,
} from '../Viewer/FileHelpers';
import { isTiffMime } from '../Viewer/TiffHelpers';
import { useElementWidth } from './useElementWidth';
import { useTiffImage } from './useTiffImage';
import {
  ViewerCoreInput,
  ViewerCoreResult,
  ViewerCoreState,
  ViewerCoreActions,
} from '../types';

const DEFAULT_PDF_WORKER_SRC = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

function createInitialState(): ViewerCoreState {
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

const limits = (num: number) => Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);

export function useViewerCore(input: ViewerCoreInput): ViewerCoreResult {
  const { document, labels, theme = 'light', pdfWorkerSrc, onLoad, onError } = input;

  const [state, setState] = useState<ViewerCoreState>(createInitialState);

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  const labelsRef = useRef(labels);
  labelsRef.current = labels;
  const documentRef = useRef(document);
  documentRef.current = document;

  const zoomRef = useRef(state.zoom);
  zoomRef.current = state.zoom;
  const fileTypeRef = useRef(state.fileType);
  fileTypeRef.current = state.fileType;
  const pageNumberRef = useRef(state.pageNumber);
  pageNumberRef.current = state.pageNumber;
  const numPagesRef = useRef(state.numPages);
  numPagesRef.current = state.numPages;

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

  const nextPage = useCallback(() => {
    if (pageNumberRef.current < totalPagesRef.current) {
      setState(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, []);
  const prevPage = useCallback(() => {
    if (pageNumberRef.current > 1) {
      setState(prev => ({ ...prev, pageNumber: prev.pageNumber - 1 }));
    }
  }, []);
  const setPageNumber = useCallback((page: number) => {
    if (!Number.isFinite(page) || page < 1) return;
    const total = totalPagesRef.current;
    if (total > 0 && page > total) return;
    setState(prev => ({ ...prev, pageNumber: page }));
  }, []);

  useEffect(() => {
    if (totalPages > 0 && pageNumberRef.current > totalPages) {
      setState(prev => ({ ...prev, pageNumber: Math.min(prev.pageNumber, totalPages) }));
    }
  }, [totalPages]);

  const onPan = useCallback((x: number, y: number) => {
    setState(prev => ({ ...prev, dx: x, dy: y }));
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const removeWheelListenerRef = useRef<(() => void) | null>(null);
  const removeKeyListenerRef = useRef<(() => void) | null>(null);
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
      setState(prev => ({ ...prev, zoom: limits(nextZoom) }));
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    removeWheelListenerRef.current = () => element.removeEventListener('wheel', handleWheel);
  }, []);

  const attachViewerContainerRef = useCallback((element: HTMLDivElement | null) => {
    attachContainerRef(element);
    measureContainerRef(element);
  }, [attachContainerRef, measureContainerRef]);

  const attachViewerRootRef = useCallback((element: HTMLDivElement | null) => {
    removeKeyListenerRef.current?.();
    removeKeyListenerRef.current = null;
    rootRef.current = element;

    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      if (e.ctrlKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          setState(prev => ({ ...prev, zoom: limits(prev.zoom + ZOOM_SENSITIVITY) }));
        } else if (e.key === '-') {
          e.preventDefault();
          setState(prev => ({ ...prev, zoom: limits(prev.zoom - ZOOM_SENSITIVITY) }));
        }
      }

      if (supportsPaginationRef.current) {
        if (e.key === 'ArrowRight' && pageNumberRef.current < totalPagesRef.current) {
          e.preventDefault();
          setState(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
        }
        if (e.key === 'ArrowLeft' && pageNumberRef.current > 1) {
          e.preventDefault();
          setState(prev => ({ ...prev, pageNumber: prev.pageNumber - 1 }));
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    removeKeyListenerRef.current = () => element.removeEventListener('keydown', handleKeyDown);
  }, []);

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
  }, []);

  useEffect(() => () => {
    removeWheelListenerRef.current?.();
    removeKeyListenerRef.current?.();
  }, []);

  const displayImageUrlRef = useRef<string | undefined>(undefined);

  const createOpenableFileUrl = useCallback(() => {
    if (isTiffMime(fileTypeRef.current)) {
      const displayUrl = displayImageUrlRef.current;
      if (!displayUrl) return null;
      return { url: displayUrl, shouldRevoke: false };
    }

    const fileSelected = fileSelectedRef.current;
    if (!fileSelected) return null;
    if (fileSelected instanceof Blob) {
      return { url: URL.createObjectURL(fileSelected), shouldRevoke: true };
    }
    const resolved = resolveOpenableUrl(fileSelected);
    if (resolved) return { url: resolved, shouldRevoke: false };
    return null;
  }, []);

  const handleOpenInNew = useCallback(() => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    const openedWindow = window.open(fileUrl.url, '_blank');
    if (openedWindow) openedWindow.opener = null;
    if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, openedWindow);
  }, [createOpenableFileUrl]);

  const writeImagePrintDocument = useCallback((printWindow: Window, imageUrl: string) => {
    const printDoc = printWindow.document;
    printDoc.open();
    printDoc.write('<!doctype html><html><head></head><body></body></html>');
    printDoc.close();
    printDoc.title = document?.fileName || labels?.printDocumentTitle || 'Document';
    const style = printDoc.createElement('style');
    style.textContent = `html,body{margin:0;min-height:100%}body{display:flex;align-items:center;justify-content:center}img{max-width:100%;max-height:100vh}`;
    printDoc.head.appendChild(style);
    const img = printDoc.createElement('img');
    img.src = imageUrl;
    img.alt = document?.fileName || labels?.defaultDocumentName || 'document';
    printDoc.body.appendChild(img);
    return img;
  }, [document, labels]);

  const handlePrint = useCallback(() => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      if (fileTypeRef.current === FileTypes.pdf) {
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
      if (printableImage.complete) printImage();
      else printableImage.addEventListener('load', printImage, { once: true });
    } else if (fileUrl.shouldRevoke) URL.revokeObjectURL(fileUrl.url);
  }, [createOpenableFileUrl, writeImagePrintDocument]);

  const handleDownload = useCallback(() => {
    const fileSelected = fileSelectedRef.current;
    if (!fileSelected) return;
    downloadFile(fileSelected, resolveDownloadFileName(document));
  }, [document]);

  const toggleFullscreen = useCallback(() => {
    const target = rootRef.current ?? containerRef.current;
    if (!target) return;

    const active = globalThis.document.fullscreenElement;
    if (active && (active === target || target.contains(active))) {
      void globalThis.document.exitFullscreen?.();
      return;
    }

    void target.requestFullscreen?.();
  }, []);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, showSidebar: !prev.showSidebar }));
  }, []);

  const onPdfLoadSuccess = useCallback(({ numPages: total }: { numPages: number }) => {
    setState(prev => ({ ...prev, numPages: total }));
    onLoadRef.current?.();
  }, []);

  const onPdfLoadError = useCallback((err: Error) => {
    setState(prev => ({ ...prev, error: labelsRef.current?.error || 'Unable to load document' }));
    onErrorRef.current?.(err.message);
  }, []);

  const onThumbnailLoadError = useCallback((err: Error) => {
    onErrorRef.current?.(err.message);
  }, []);

  const onImageLoad = useCallback(() => {
    onLoadRef.current?.();
  }, []);

  const onImageError = useCallback(() => {
    setState(prev => ({ ...prev, error: labelsRef.current?.error || 'Unable to load image' }));
    onErrorRef.current?.(labelsRef.current?.error || 'Unable to load image');
  }, []);

  const getUnsupportedFileMessage = useCallback(
    () => labelsRef.current?.unsupportedFile || labelsRef.current?.error || 'Unsupported file type',
    [],
  );

  const setUnsupportedFileError = useCallback(() => {
    const msg = getUnsupportedFileMessage();
    setState(prev => ({ ...prev, error: msg }));
    onErrorRef.current?.(msg);
  }, [getUnsupportedFileMessage]);

  const applyFileFromBase64 = useCallback((data: string): boolean => {
    const result = buildFileFromBase64(data);
    if (!result) return false;
    setState(prev => ({ ...prev, fileType: result.mime, fileSelected: result.file, error: '' }));
    return true;
  }, []);

  const applyFileFromUrl = useCallback((url: string, fileName?: string): boolean => {
    if (!isSafeDocumentUri(url)) return false;
    const extension = resolveExtension(url, fileName);
    const type = getMimeTypeFromExtension(extension);
    if (!type) return false;
    setState(prev => ({ ...prev, fileType: type, fileSelected: url, error: '' }));
    return true;
  }, []);

  const initData = useCallback(() => {
    const doc = documentRef.current;
    if (!doc) {
      resetDocumentState();
      setState(prev => ({ ...prev, fileType: undefined, fileSelected: null, error: '' }));
      return;
    }
    resetDocumentState();
    if (doc.fileUri) {
      if (doc.fileUri.startsWith('data:')) {
        if (applyFileFromBase64(doc.fileUri)) return;
      } else if (applyFileFromUrl(doc.fileUri, doc.fileName)) return;
    }
    if (doc.fileData && applyFileFromBase64(doc.fileData)) return;
    setUnsupportedFileError();
  }, [resetDocumentState, applyFileFromBase64, applyFileFromUrl, setUnsupportedFileError]);

  const handleRetry = useCallback(() => {
    setState(prev => ({ ...prev, error: '' }));
    initData();
  }, [initData]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
