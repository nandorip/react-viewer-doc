interface ToolbarProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onRotate: () => void;
    onReset: () => void;
    onNextChange: () => void;
    onPrevPage: () => void;
    onPageChange: (page: number) => void;
    onNewPage?: () => void;
    onDownload?: () => void;
    onPrint?: () => void;
    onFullscreen?: () => void;
    onToggleSidebar?: () => void;
    hideZoom?: boolean;
    hideRotate?: boolean;
    hideReset?: boolean;
    hideMovePage?: boolean;
    pdfPages: number;
    pdfPage: number;
    showSidebar?: boolean;
    extra?: React.ReactNode;
    labels?: {
        zoomIn?: string;
        zoomOut?: string;
        rotate?: string;
        reset?: string;
        nextPage?: string;
        prevPage?: string;
        download?: string;
        openInNew?: string;
        print?: string;
        fullscreen?: string;
        thumbnails?: string;
    };
}
export declare const Toolbar: ({ onZoomIn, onZoomOut, onRotate, onReset, onNextChange, onPrevPage, onPageChange, onNewPage, onDownload, onPrint, onFullscreen, onToggleSidebar, hideZoom, hideRotate, hideReset, hideMovePage, pdfPages, pdfPage, showSidebar, extra, labels, }: ToolbarProps) => import("react/jsx-runtime").JSX.Element;
export {};
