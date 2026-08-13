import type { ReactNode } from 'react';
export interface DocumentData {
    id?: string;
    fileData?: string;
    fileUri?: string;
    fileName: string;
}
export interface Labels {
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
    print?: string;
    fullscreen?: string;
    unsupportedFile?: string;
    defaultDocumentName?: string;
    printDocumentTitle?: string;
    errorBoundary?: string;
    currentPage?: string;
    retry?: string;
    documents?: string;
    nextDocument?: string;
    prevDocument?: string;
    currentDocument?: string;
}
export type Locale = 'en-US' | 'pt-BR' | 'es-ES';
export type ViewerTheme = 'light' | 'dark';
export interface ToolbarActions {
    zoomIn: () => void;
    zoomOut: () => void;
    rotate: () => void;
    reset: () => void;
    nextPage: () => void;
    prevPage: () => void;
    setPageNumber: (page: number) => void;
    download: () => void;
    print: () => void;
    openInNew: () => void;
    toggleFullscreen: () => void;
    toggleSidebar: () => void;
    getZoom: () => number;
    getPageNumber: () => number;
    getTotalPages: () => number;
    isPdf: () => boolean;
    nextDocument?: () => void;
    prevDocument?: () => void;
    setDocumentIndex?: (index: number) => void;
    getDocumentIndex?: () => number;
    getDocumentCount?: () => number;
    getCurrentDocument?: () => DocumentData | undefined;
}
export interface ViewerCoreState {
    error: string;
    fileType: string | undefined;
    fileSelected: string | Blob | null;
    imageUrl: string | undefined;
    showSidebar: boolean;
    zoom: number;
    rotation: number;
    dx: number;
    dy: number;
    viewerResetKey: number;
    numPages: number;
    pageNumber: number;
    totalPages: number;
    supportsPagination: boolean;
    containerWidth: number;
    displayImageUrl: string | undefined;
    isTiff: boolean;
    tiffLoading: boolean;
    pdfPageWidth: number | undefined;
    thumbnailWidth: number;
    labels: Labels | undefined;
    theme: ViewerTheme;
    documentFileName: string | undefined;
}
export interface ViewerCoreActions {
    setPageNumber: (page: number) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    rotate: () => void;
    resetViewState: () => void;
    nextPage: () => void;
    prevPage: () => void;
    handleDownload: () => void;
    handlePrint: () => void;
    handleOpenInNew: () => void;
    toggleFullscreen: () => void;
    toggleSidebar: () => void;
    handleRetry: () => void;
    attachViewerContainerRef: (el: HTMLDivElement | null) => void;
    attachViewerRootRef: (el: HTMLDivElement | null) => void;
    onPdfLoadSuccess: (data: {
        numPages: number;
    }) => void;
    onPdfLoadError: (err: Error) => void;
    onThumbnailLoadError: (err: Error) => void;
    onPan: (x: number, y: number) => void;
    onImageLoad: () => void;
    onImageError: () => void;
}
export interface ViewerCoreResult {
    state: ViewerCoreState;
    actions: ViewerCoreActions;
    containerRef: React.RefObject<HTMLDivElement | null>;
}
export interface ViewerCoreInput {
    document?: DocumentData;
    labels?: Labels;
    theme?: ViewerTheme;
    pdfWorkerSrc?: string;
    onLoad?: () => void;
    onError?: (error: string) => void;
}
export interface ViewerProps extends ViewerCoreInput {
    documents?: DocumentData[];
    documentIndex?: number;
    defaultDocumentIndex?: number;
    onDocumentChange?: (index: number, document: DocumentData) => void;
    showDocumentList?: boolean;
    extraToolbar?: ReactNode | ((actions: ToolbarActions) => ReactNode);
    renderToolbar?: (actions: ToolbarActions) => ReactNode;
    height?: string | number;
    locale?: Locale;
}
export interface ViewerCanvasProps {
    state: ViewerCoreState;
    actions: ViewerCoreActions;
    labels?: Labels;
    theme?: ViewerTheme;
    height?: string | number;
}
