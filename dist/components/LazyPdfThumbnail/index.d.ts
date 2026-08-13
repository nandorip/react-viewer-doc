import { ViewerTheme } from '../../types';
interface LazyPdfThumbnailProps {
    pageNumber: number;
    active: boolean;
    width: number;
    theme: ViewerTheme;
    loadingLabel: string;
    onSelect: (page: number) => void;
    onLoadError: (error: Error) => void;
}
export declare const LazyPdfThumbnail: ({ pageNumber, active, width, theme, loadingLabel, onSelect, onLoadError, }: LazyPdfThumbnailProps) => import("react").JSX.Element;
export {};
