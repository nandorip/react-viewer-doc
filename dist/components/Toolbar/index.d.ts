import { Labels, ViewerTheme, ToolbarActions } from '../../types';
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
    extra?: React.ReactNode | ((actions: ToolbarActions) => React.ReactNode);
    labels?: Labels;
    theme?: ViewerTheme;
    toolbarActions?: ToolbarActions;
}
export declare const Toolbar: ({ onZoomIn, onZoomOut, onRotate, onReset, onNextChange, onPrevPage, onPageChange, onNewPage, onDownload, onPrint, onFullscreen, onToggleSidebar, hideZoom, hideRotate, hideReset, hideMovePage, pdfPages, pdfPage, showSidebar, extra, labels, theme, toolbarActions, }: ToolbarProps) => import("react").JSX.Element;
export {};
