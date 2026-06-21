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

export const themeTokens: Record<ViewerTheme, ThemeTokens> = {
  light: {
    containerBg: '#f5f5f5',
    containerBorder: '#e0e0e0',
    toolbarBg: '#ffffff',
    sidebarBg: '#f0f0f0',
    sidebarBorder: '#e0e0e0',
    thumbnailActive: '#e3f2fd',
    thumbnailHover: '#f5f5f5',
    pdfViewerBg: '#525659',
    imageViewerBg: '#f5f5f5',
    pageIndicatorColor: '#663c00',
    pageIndicatorBg: '#fff4e5',
    shadow: 'rgba(0, 0, 0, 0.1)',
    pdfShadow: 'rgba(0, 0, 0, 0.2)',
    loadingPlaceholder: '#e0e0e0',
    textMuted: '#666666',
  },
  dark: {
    containerBg: '#1e1e1e',
    containerBorder: '#333333',
    toolbarBg: '#2d2d2d',
    sidebarBg: '#252525',
    sidebarBorder: '#333333',
    thumbnailActive: '#1e3a5f',
    thumbnailHover: '#333333',
    pdfViewerBg: '#121212',
    imageViewerBg: '#1e1e1e',
    pageIndicatorColor: '#ffcc80',
    pageIndicatorBg: '#3e2723',
    shadow: 'rgba(0, 0, 0, 0.4)',
    pdfShadow: 'rgba(0, 0, 0, 0.5)',
    loadingPlaceholder: '#404040',
    textMuted: '#b0b0b0',
  },
};

export const resolveThemeTokens = (theme: ViewerTheme = 'light'): ThemeTokens =>
  themeTokens[theme] ?? themeTokens.light;