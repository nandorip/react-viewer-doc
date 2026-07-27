"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = void 0;
var _react = require("react");
var _components = require("../components");
var _DocumentList = require("../components/DocumentList");
var _ViewerCanvas = require("../components/ViewerCanvas");
var _useDocumentList = require("../hooks/useDocumentList");
var _useViewerCore = require("../hooks/useViewerCore");
var _styles = require("../styles");
var _FileHelpers = require("./FileHelpers");
var _jsxRuntime = require("react/jsx-runtime");
var Viewer = exports.Viewer = function Viewer(_ref) {
  var document = _ref.document,
    documents = _ref.documents,
    documentIndex = _ref.documentIndex,
    defaultDocumentIndex = _ref.defaultDocumentIndex,
    onDocumentChange = _ref.onDocumentChange,
    _ref$showDocumentList = _ref.showDocumentList,
    showDocumentList = _ref$showDocumentList === void 0 ? true : _ref$showDocumentList,
    extraToolbar = _ref.extraToolbar,
    renderToolbar = _ref.renderToolbar,
    height = _ref.height,
    labels = _ref.labels,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    pdfWorkerSrc = _ref.pdfWorkerSrc,
    onLoad = _ref.onLoad,
    onError = _ref.onError;
  var resolvedDocuments = (0, _react.useMemo)(function () {
    if (documents && documents.length > 0) return documents;
    if (document) return [document];
    return [];
  }, [documents, document === null || document === void 0 ? void 0 : document.fileName, document === null || document === void 0 ? void 0 : document.fileUri, document === null || document === void 0 ? void 0 : document.fileData]);
  var documentList = (0, _useDocumentList.useDocumentList)({
    documents: resolvedDocuments,
    documentIndex: documentIndex,
    defaultDocumentIndex: defaultDocumentIndex,
    onDocumentChange: onDocumentChange
  });
  var activeDocument = documentList.activeDocument;
  var viewer = (0, _useViewerCore.useViewerCore)({
    document: activeDocument,
    labels: labels,
    theme: theme,
    pdfWorkerSrc: pdfWorkerSrc,
    onLoad: onLoad,
    onError: onError
  });
  var state = viewer.state,
    actions = viewer.actions;
  var showToolbar = !state.error && (resolvedDocuments.length > 0 || Boolean(state.fileSelected));
  var showList = showDocumentList && documentList.hasMultiple;
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
      },
      nextDocument: documentList.hasMultiple ? documentList.nextDocument : undefined,
      prevDocument: documentList.hasMultiple ? documentList.prevDocument : undefined,
      setDocumentIndex: documentList.hasMultiple ? documentList.setDocumentIndex : undefined,
      getDocumentIndex: function getDocumentIndex() {
        return documentList.activeIndex;
      },
      getDocumentCount: function getDocumentCount() {
        return resolvedDocuments.length;
      },
      getCurrentDocument: function getCurrentDocument() {
        return activeDocument;
      }
    };
  }, [actions, state.zoom, state.pageNumber, state.totalPages, state.fileType, documentList, resolvedDocuments.length, activeDocument]);
  var viewerCanvas = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ViewerCanvas.ViewerCanvas, {
    state: state,
    actions: actions,
    labels: labels,
    theme: theme,
    height: height
  });
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
      onPrevDocument: documentList.hasMultiple ? documentList.prevDocument : undefined,
      onNextDocument: documentList.hasMultiple ? documentList.nextDocument : undefined,
      documentIndex: documentList.activeIndex,
      documentCount: resolvedDocuments.length,
      currentDocumentName: activeDocument === null || activeDocument === void 0 ? void 0 : activeDocument.fileName,
      showSidebar: state.showSidebar,
      hideMovePage: !state.supportsPagination,
      pdfPages: state.totalPages,
      pdfPage: state.pageNumber,
      extra: extraToolbar,
      labels: labels,
      theme: theme,
      toolbarActions: toolbarActions
    })), showList ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.ViewerWithDocumentList, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DocumentList.DocumentList, {
        documents: resolvedDocuments,
        activeIndex: documentList.activeIndex,
        onSelect: documentList.setDocumentIndex,
        labels: labels,
        theme: theme
      }), viewerCanvas]
    }) : viewerCanvas]
  });
};