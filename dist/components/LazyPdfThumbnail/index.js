"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LazyPdfThumbnail = void 0;
var _reactPdf = require("react-pdf");
var _useIntersectionObserver = require("../../hooks/useIntersectionObserver");
var _styles = require("../../styles");
var _jsxRuntime = require("react/jsx-runtime");
var LazyPdfThumbnail = exports.LazyPdfThumbnail = function LazyPdfThumbnail(_ref) {
  var pageNumber = _ref.pageNumber,
    active = _ref.active,
    width = _ref.width,
    theme = _ref.theme,
    loadingLabel = _ref.loadingLabel,
    onSelect = _ref.onSelect,
    onLoadError = _ref.onLoadError;
  var _useIntersectionObser = (0, _useIntersectionObserver.useIntersectionObserver)({
      rootMargin: '160px'
    }),
    ref = _useIntersectionObser.ref,
    isIntersecting = _useIntersectionObser.isIntersecting;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.ThumbnailItem, {
    ref: ref,
    type: "button",
    active: active,
    theme: theme,
    onClick: function onClick() {
      return onSelect(pageNumber);
    },
    "aria-label": "Page ".concat(pageNumber),
    "aria-current": active ? 'page' : undefined,
    children: [isIntersecting ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Page, {
      pageNumber: pageNumber,
      width: width,
      renderTextLayer: false,
      renderAnnotationLayer: false,
      onLoadError: onLoadError,
      loading: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ThumbnailPlaceholder, {
        theme: theme,
        children: loadingLabel
      })
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ThumbnailPlaceholder, {
      theme: theme,
      style: {
        width: width,
        minHeight: width * 1.3
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        fontSize: '12px'
      },
      children: pageNumber
    })]
  });
};