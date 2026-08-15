"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewerCanvas = void 0;
var _reactPdf = require("react-pdf");
var _ErrorViewer = require("../ErrorViewer");
var _PanViewer = require("../PanViewer");
var _LazyPdfThumbnail = require("../LazyPdfThumbnail");
var _FileHelpers = require("../../Viewer/FileHelpers");
var _styles = require("../../styles");
require("react-pdf/dist/Page/AnnotationLayer.css");
require("react-pdf/dist/Page/TextLayer.css");
var _jsxRuntime = require("react/jsx-runtime");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ViewerCanvas = exports.ViewerCanvas = function ViewerCanvas(_ref) {
  var state = _ref.state,
    actions = _ref.actions,
    labels = _ref.labels,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    height = _ref.height;
  var error = state.error,
    fileType = state.fileType,
    fileSelected = state.fileSelected,
    showSidebar = state.showSidebar,
    zoom = state.zoom,
    rotation = state.rotation,
    dx = state.dx,
    dy = state.dy,
    viewerResetKey = state.viewerResetKey,
    numPages = state.numPages,
    pageNumber = state.pageNumber,
    displayImageUrl = state.displayImageUrl,
    isTiff = state.isTiff,
    tiffLoading = state.tiffLoading,
    pdfPageWidth = state.pdfPageWidth,
    thumbnailWidth = state.thumbnailWidth,
    documentFileName = state.documentFileName;
  if (error) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorViewer.ErrorViewer, {
      message: error,
      onRetry: actions.handleRetry,
      retryLabel: labels === null || labels === void 0 ? void 0 : labels.retry
    });
  }
  if (fileType === _FileHelpers.FileTypes.pdf && fileSelected) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.MainContent, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.PdfViewerRoot, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactPdf.Document, {
          file: fileSelected,
          onLoadSuccess: actions.onPdfLoadSuccess,
          onLoadError: actions.onPdfLoadError,
          loading: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.LoadingMessage, {
            theme: theme,
            children: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...'
          }),
          children: [showSidebar && numPages > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.SidebarContainer, {
            visible: showSidebar,
            theme: theme,
            children: Array.from(new Array(numPages), function (_, index) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LazyPdfThumbnail.LazyPdfThumbnail, {
                pageNumber: index + 1,
                active: pageNumber === index + 1,
                width: thumbnailWidth,
                theme: theme,
                loadingLabel: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...',
                onSelect: actions.setPageNumber,
                onLoadError: actions.onThumbnailLoadError
              }, "thumb_".concat(index + 1));
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DocumentContainer, {
            ref: actions.attachViewerContainerRef,
            height: height,
            theme: theme,
            "data-testid": "document-container",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Page, _objectSpread(_objectSpread({
              pageNumber: pageNumber
            }, pdfPageWidth ? {
              width: pdfPageWidth
            } : {
              scale: zoom
            }), {}, {
              rotate: rotation,
              renderTextLayer: true,
              renderAnnotationLayer: true,
              loading: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.LoadingMessage, {
                theme: theme,
                children: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...'
              })
            }))
          })]
        })
      })
    });
  }
  if (fileSelected) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.MainContent, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ImageContainer, {
        rotation: rotation,
        ref: actions.attachViewerContainerRef,
        height: height,
        theme: theme,
        "data-testid": "image-container",
        children: isTiff && tiffLoading && !displayImageUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.LoadingMessage, {
          theme: theme,
          children: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...'
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_PanViewer.PanViewer, {
          zoom: zoom,
          dx: dx,
          dy: dy,
          onPan: actions.onPan,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: displayImageUrl,
            alt: documentFileName || (labels === null || labels === void 0 ? void 0 : labels.defaultDocumentName) || 'document',
            onLoad: function onLoad() {
              if (!isTiff) actions.onImageLoad();
            },
            onError: actions.onImageError
          })
        }, viewerResetKey)
      })
    });
  }
  return null;
};