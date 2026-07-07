"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = void 0;
var _react = require("react");
var _components = require("../components");
var _ViewerCanvas = require("../components/ViewerCanvas");
var _useViewerCore = require("../hooks/useViewerCore");
var _FileHelpers = require("./FileHelpers");
var _jsxRuntime = require("react/jsx-runtime");
var Viewer = exports.Viewer = function Viewer(_ref) {
  var document = _ref.document,
    extraToolbar = _ref.extraToolbar,
    renderToolbar = _ref.renderToolbar,
    height = _ref.height,
    labels = _ref.labels,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    pdfWorkerSrc = _ref.pdfWorkerSrc,
    onLoad = _ref.onLoad,
    onError = _ref.onError;
  var viewer = (0, _useViewerCore.useViewerCore)({
    document: document,
    labels: labels,
    theme: theme,
    pdfWorkerSrc: pdfWorkerSrc,
    onLoad: onLoad,
    onError: onError
  });
  var state = viewer.state,
    actions = viewer.actions;
  var showToolbar = !state.error && (Boolean(document) || Boolean(state.fileSelected));
  var toolbarActions = (0, _react.useMemo)(function () {
    return {
      zoomIn: actions.zoomIn,
      zoomOut: actions.zoomOut,
      rotate: actions.rotate,
      reset: actions.resetViewState,
      nextPage: actions.nextPage,
      prevPage: actions.prevPage,
      setPageNumber: actions.setPageNumber,
      download: actions.handleDownload,
      print: actions.handlePrint,
      openInNew: actions.handleOpenInNew,
      toggleFullscreen: actions.toggleFullscreen,
      toggleSidebar: actions.toggleSidebar,
      getZoom: function getZoom() {
        return state.zoom;
      },
      getPageNumber: function getPageNumber() {
        return state.pageNumber;
      },
      getTotalPages: function getTotalPages() {
        return state.totalPages;
      },
      isPdf: function isPdf() {
        return state.fileType === _FileHelpers.FileTypes.pdf;
      }
    };
  }, [actions, state.zoom, state.pageNumber, state.totalPages, state.fileType]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [showToolbar && (renderToolbar ? renderToolbar(toolbarActions) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Toolbar, {
      onRotate: actions.rotate,
      onZoomIn: actions.zoomIn,
      onZoomOut: actions.zoomOut,
      onReset: actions.resetViewState,
      onNextChange: actions.nextPage,
      onPrevPage: actions.prevPage,
      onPageChange: actions.setPageNumber,
      onNewPage: actions.handleOpenInNew,
      onDownload: actions.handleDownload,
      onPrint: actions.handlePrint,
      onFullscreen: actions.toggleFullscreen,
      onToggleSidebar: state.fileType === _FileHelpers.FileTypes.pdf ? actions.toggleSidebar : undefined,
      showSidebar: state.showSidebar,
      hideMovePage: !state.supportsPagination,
      pdfPages: state.totalPages,
      pdfPage: state.pageNumber,
      extra: extraToolbar,
      labels: labels,
      theme: theme,
      toolbarActions: toolbarActions
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewerCanvas.ViewerCanvas, {
      state: state,
      actions: actions,
      labels: labels,
      theme: theme,
      height: height
    })]
  });
};