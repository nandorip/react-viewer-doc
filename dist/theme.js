"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeTokens = exports.resolveThemeTokens = void 0;
var themeTokens = exports.themeTokens = {
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
    textMuted: '#666666'
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
    textMuted: '#b0b0b0'
  }
};
var resolveThemeTokens = exports.resolveThemeTokens = function resolveThemeTokens() {
  var _themeTokens$theme;
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';
  return (_themeTokens$theme = themeTokens[theme]) !== null && _themeTokens$theme !== void 0 ? _themeTokens$theme : themeTokens.light;
};