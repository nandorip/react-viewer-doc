interface ToolbarProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onRotate: () => void;
    onReset: () => void;
    onNextChange: () => void;
    onPrevPage: () => void;
    onNewPage?: () => void;
    hideZoom?: boolean;
    hideRotate?: boolean;
    hideReset?: boolean;
    hideMovePage?: boolean;
    pdfPages: number;
    pdfPage: number;
    extra?: React.ReactNode;
}
export declare const Toolbar: ({ onZoomIn, onZoomOut, onRotate, onReset, onNextChange, onPrevPage, onNewPage, hideZoom, hideRotate, hideReset, hideMovePage, pdfPages, pdfPage, extra, }: ToolbarProps) => import("react/jsx-runtime").JSX.Element;
export {};
