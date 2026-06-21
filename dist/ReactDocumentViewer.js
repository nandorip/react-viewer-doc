"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactDocumentViewer = void 0;
var _react = require("react");
var _components = require("./components");
var _Viewer = require("./Viewer");
var _i18n = require("./i18n");
var _jsxRuntime = require("react/jsx-runtime");
var ReactDocumentViewer = exports.ReactDocumentViewer = function ReactDocumentViewer(_ref) {
  var document = _ref.document,
    extraToolbar = _ref.extraToolbar,
    height = _ref.height,
    labels = _ref.labels,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? _i18n.DEFAULT_LOCALE : _ref$locale,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    pdfWorkerSrc = _ref.pdfWorkerSrc,
    onLoad = _ref.onLoad,
    onError = _ref.onError;
  var resolvedLabels = (0, _react.useMemo)(function () {
    return (0, _i18n.resolveLabels)(locale, labels);
  }, [locale, labels]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.ErrorBoundary, {
    labels: resolvedLabels,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Container, {
      theme: theme,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Viewer.Viewer, {
        document: document,
        extraToolbar: extraToolbar,
        height: height,
        labels: resolvedLabels,
        locale: locale,
        theme: theme,
        pdfWorkerSrc: pdfWorkerSrc,
        onLoad: onLoad,
        onError: onError
      })
    })
  });
};