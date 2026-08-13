import { ViewerTheme } from './types';
export interface ThemeTokens {
    containerBg: string;
    containerBorder: string;
    toolbarBg: string;
    sidebarBg: string;
    sidebarBorder: string;
    thumbnailActive: string;
    thumbnailHover: string;
    pdfViewerBg: string;
    imageViewerBg: string;
    pageIndicatorColor: string;
    pageIndicatorBg: string;
    shadow: string;
    pdfShadow: string;
    loadingPlaceholder: string;
    textMuted: string;
}
export declare const themeTokens: Record<ViewerTheme, ThemeTokens>;
export declare const resolveThemeTokens: (theme?: ViewerTheme) => ThemeTokens;
