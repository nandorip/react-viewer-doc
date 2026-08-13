"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveLabels = exports.localeLabels = exports.DEFAULT_LOCALE = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en-US';
var localeLabels = exports.localeLabels = {
  'en-US': {
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    rotate: 'Rotate',
    reset: 'Reset',
    nextPage: 'Next page',
    prevPage: 'Previous page',
    download: 'Download',
    openInNew: 'Open in new tab',
    loading: 'Loading document...',
    error: 'Unable to load document',
    thumbnails: 'Thumbnails',
    print: 'Print',
    fullscreen: 'Fullscreen',
    unsupportedFile: 'Unsupported file type',
    defaultDocumentName: 'document',
    printDocumentTitle: 'Document',
    errorBoundary: 'Sorry, something went wrong while loading the viewer.',
    currentPage: 'Current page',
    retry: 'Retry',
    documents: 'Documents',
    nextDocument: 'Next document',
    prevDocument: 'Previous document',
    currentDocument: 'Current document'
  },
  'pt-BR': {
    zoomIn: 'Aumentar zoom',
    zoomOut: 'Diminuir zoom',
    rotate: 'Girar',
    reset: 'Resetar',
    nextPage: 'Próxima página',
    prevPage: 'Página anterior',
    download: 'Download',
    openInNew: 'Abrir em nova aba',
    loading: 'Carregando documento...',
    error: 'Erro ao carregar documento',
    thumbnails: 'Miniaturas',
    print: 'Imprimir',
    fullscreen: 'Tela cheia',
    unsupportedFile: 'Tipo de arquivo não suportado',
    defaultDocumentName: 'documento',
    printDocumentTitle: 'Documento',
    errorBoundary: 'Desculpe, algo deu errado ao carregar o visualizador.',
    currentPage: 'Página atual',
    retry: 'Tentar novamente',
    documents: 'Documentos',
    nextDocument: 'Próximo documento',
    prevDocument: 'Documento anterior',
    currentDocument: 'Documento atual'
  },
  'es-ES': {
    zoomIn: 'Aumentar zoom',
    zoomOut: 'Disminuir zoom',
    rotate: 'Girar',
    reset: 'Restablecer',
    nextPage: 'Página siguiente',
    prevPage: 'Página anterior',
    download: 'Descargar',
    openInNew: 'Abrir en una nueva pestaña',
    loading: 'Cargando documento...',
    error: 'Error al cargar el documento',
    thumbnails: 'Miniaturas',
    print: 'Imprimir',
    fullscreen: 'Pantalla completa',
    unsupportedFile: 'Tipo de archivo no compatible',
    defaultDocumentName: 'documento',
    printDocumentTitle: 'Documento',
    errorBoundary: 'Lo sentimos, algo salió mal al cargar el visor.',
    currentPage: 'Página actual',
    retry: 'Reintentar',
    documents: 'Documentos',
    nextDocument: 'Documento siguiente',
    prevDocument: 'Documento anterior',
    currentDocument: 'Documento actual'
  }
};
var resolveLabels = exports.resolveLabels = function resolveLabels() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_LOCALE;
  var labels = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, localeLabels[locale]), labels);
};