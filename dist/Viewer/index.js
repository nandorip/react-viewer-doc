"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = void 0;
var _react = require("react");
var _reactImagePanZoomRotate = require("react-image-pan-zoom-rotate");
var _reactPdf = require("react-pdf");
var _components = require("../components");
var _FileHelpers = require("./FileHelpers");
var _TiffHelpers = require("./TiffHelpers");
var _useElementWidth2 = require("../hooks/useElementWidth");
var _useTiffImage2 = require("../hooks/useTiffImage");
var _styles = require("../styles");
require("react-pdf/dist/Page/AnnotationLayer.css");
require("react-pdf/dist/Page/TextLayer.css");
var _jsxRuntime = require("react/jsx-runtime");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DEFAULT_PDF_WORKER_SRC = "https://unpkg.com/pdfjs-dist@".concat(_reactPdf.pdfjs.version, "/build/pdf.worker.min.mjs");
var ZOOM_SENSITIVITY = 0.1;
var MAX_ZOOM = 5;
var MIN_ZOOM = 0.5;
var VIEWER_HORIZONTAL_PADDING = 32;
var MOBILE_MEDIA_QUERY = '(max-width: 768px)';
var isEditableTarget = function isEditableTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  var tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
};
var Viewer = exports.Viewer = function Viewer(_ref) {
  var document = _ref.document,
    extraToolbar = _ref.extraToolbar,
    height = _ref.height,
    labels = _ref.labels,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    pdfWorkerSrc = _ref.pdfWorkerSrc,
    _onLoad = _ref.onLoad,
    _onError = _ref.onError;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    fileType = _useState4[0],
    setFileType = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    fileSelected = _useState6[0],
    setFileSelected = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    imageUrl = _useState8[0],
    setImageUrl = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showSidebar = _useState0[0],
    setShowSidebar = _useState0[1];
  var _useState1 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState1, 2),
    dx = _useState10[0],
    setDx = _useState10[1];
  var _useState11 = (0, _react.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    dy = _useState12[0],
    setDy = _useState12[1];
  var _useState13 = (0, _react.useState)(1),
    _useState14 = _slicedToArray(_useState13, 2),
    zoom = _useState14[0],
    setZoom = _useState14[1];
  var _useState15 = (0, _react.useState)(0),
    _useState16 = _slicedToArray(_useState15, 2),
    rotation = _useState16[0],
    setRotation = _useState16[1];
  var _useState17 = (0, _react.useState)(0),
    _useState18 = _slicedToArray(_useState17, 2),
    viewerResetKey = _useState18[0],
    setViewerResetKey = _useState18[1];
  var _useState19 = (0, _react.useState)(0),
    _useState20 = _slicedToArray(_useState19, 2),
    numPages = _useState20[0],
    setNumPages = _useState20[1];
  var _useState21 = (0, _react.useState)(1),
    _useState22 = _slicedToArray(_useState21, 2),
    pageNumber = _useState22[0],
    setPageNumber = _useState22[1];
  var onErrorRef = (0, _react.useRef)(_onError);
  onErrorRef.current = _onError;
  var labelsRef = (0, _react.useRef)(labels);
  labelsRef.current = labels;
  var onPdfLoadSuccess = function onPdfLoadSuccess(_ref2) {
    var total = _ref2.numPages;
    setNumPages(total);
    _onLoad === null || _onLoad === void 0 || _onLoad();
  };
  var onPdfLoadError = function onPdfLoadError(err) {
    var _labelsRef$current, _onErrorRef$current;
    var msg = ((_labelsRef$current = labelsRef.current) === null || _labelsRef$current === void 0 ? void 0 : _labelsRef$current.error) || 'Unable to load document';
    setError(msg);
    (_onErrorRef$current = onErrorRef.current) === null || _onErrorRef$current === void 0 || _onErrorRef$current.call(onErrorRef, err.message);
  };
  var onThumbnailLoadError = function onThumbnailLoadError(err) {
    var _onErrorRef$current2;
    (_onErrorRef$current2 = onErrorRef.current) === null || _onErrorRef$current2 === void 0 || _onErrorRef$current2.call(onErrorRef, err.message);
  };
  var limits = function limits(num) {
    return Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);
  };
  var zoomRef = (0, _react.useRef)(zoom);
  zoomRef.current = zoom;
  var fileTypeRef = (0, _react.useRef)(fileType);
  fileTypeRef.current = fileType;
  var pageNumberRef = (0, _react.useRef)(pageNumber);
  pageNumberRef.current = pageNumber;
  var numPagesRef = (0, _react.useRef)(numPages);
  numPagesRef.current = numPages;
  var isTiff = (0, _TiffHelpers.isTiffMime)(fileType);
  var tiffSource = isTiff ? fileSelected : null;
  var _useTiffImage = (0, _useTiffImage2.useTiffImage)({
      source: tiffSource,
      pageNumber: pageNumber,
      onLoad: _onLoad,
      onError: function onError(message) {
        var _labelsRef$current2, _onErrorRef$current3;
        setError(((_labelsRef$current2 = labelsRef.current) === null || _labelsRef$current2 === void 0 ? void 0 : _labelsRef$current2.error) || 'Unable to load document');
        (_onErrorRef$current3 = onErrorRef.current) === null || _onErrorRef$current3 === void 0 || _onErrorRef$current3.call(onErrorRef, message);
      }
    }),
    tiffImageUrl = _useTiffImage.imageUrl,
    tiffPageCount = _useTiffImage.pageCount,
    tiffLoading = _useTiffImage.loading;
  var totalPages = fileType === _FileHelpers.FileTypes.pdf ? numPages : isTiff ? tiffPageCount : 0;
  var supportsPagination = fileType === _FileHelpers.FileTypes.pdf || isTiff && tiffPageCount > 1;
  var totalPagesRef = (0, _react.useRef)(totalPages);
  totalPagesRef.current = totalPages;
  var supportsPaginationRef = (0, _react.useRef)(supportsPagination);
  supportsPaginationRef.current = supportsPagination;
  var handleZoom = (0, _react.useCallback)(function (num) {
    return setZoom(limits(num));
  }, []);
  var handleZoomIn = function handleZoomIn() {
    return handleZoom(zoomRef.current + ZOOM_SENSITIVITY);
  };
  var handleZoomOut = function handleZoomOut() {
    return handleZoom(zoomRef.current - ZOOM_SENSITIVITY);
  };
  var handleNextPageRef = (0, _react.useRef)(function () {
    if (pageNumberRef.current < totalPagesRef.current) {
      setPageNumber(pageNumberRef.current + 1);
    }
  });
  var handlePrevPageRef = (0, _react.useRef)(function () {
    if (pageNumberRef.current > 1) {
      setPageNumber(pageNumberRef.current - 1);
    }
  });
  var resetViewState = (0, _react.useCallback)(function () {
    setRotation(0);
    setDx(0);
    setDy(0);
    setZoom(1);
    setPageNumber(1);
    setViewerResetKey(function (key) {
      return key + 1;
    });
  }, []);
  var resetDocumentState = (0, _react.useCallback)(function () {
    resetViewState();
    setNumPages(0);
  }, [resetViewState]);
  var onPan = function onPan(x, y) {
    setDx(x);
    setDy(y);
  };
  var containerRef = (0, _react.useRef)(null);
  var removeWheelListenerRef = (0, _react.useRef)(null);
  var _useElementWidth = (0, _useElementWidth2.useElementWidth)(),
    measureContainerRef = _useElementWidth.ref,
    containerWidth = _useElementWidth.width;
  var attachContainerRef = (0, _react.useCallback)(function (element) {
    var _removeWheelListenerR;
    (_removeWheelListenerR = removeWheelListenerRef.current) === null || _removeWheelListenerR === void 0 || _removeWheelListenerR.call(removeWheelListenerRef);
    removeWheelListenerRef.current = null;
    containerRef.current = element;
    if (!element) return;
    var handleWheel = function handleWheel(e) {
      if (!e.ctrlKey) return;
      e.preventDefault();
      var nextZoom = e.deltaY < 0 ? zoomRef.current + ZOOM_SENSITIVITY : zoomRef.current - ZOOM_SENSITIVITY;
      setZoom(limits(nextZoom));
    };
    element.addEventListener('wheel', handleWheel, {
      passive: false
    });
    removeWheelListenerRef.current = function () {
      return element.removeEventListener('wheel', handleWheel);
    };
  }, []);
  var attachViewerContainerRef = (0, _react.useCallback)(function (element) {
    attachContainerRef(element);
    measureContainerRef(element);
  }, [attachContainerRef, measureContainerRef]);
  var pdfBaseWidth = Math.max(0, containerWidth - VIEWER_HORIZONTAL_PADDING);
  var pdfPageWidth = pdfBaseWidth > 0 ? Math.floor(pdfBaseWidth * zoom) : undefined;
  var thumbnailWidth = Math.min(180, Math.max(72, pdfBaseWidth > 0 ? pdfBaseWidth - 16 : 120));
  (0, _react.useEffect)(function () {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    var mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    var handleViewportChange = function handleViewportChange(event) {
      if (event.matches) {
        setShowSidebar(false);
      }
    };
    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);
    return function () {
      return mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(e) {
      if (isEditableTarget(e.target)) return;
      if (e.ctrlKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          var newZoom = limits(zoomRef.current + ZOOM_SENSITIVITY);
          setZoom(newZoom);
        } else if (e.key === '-') {
          e.preventDefault();
          var _newZoom = limits(zoomRef.current - ZOOM_SENSITIVITY);
          setZoom(_newZoom);
        }
      }
      if (supportsPaginationRef.current) {
        if (e.key === 'ArrowRight' && pageNumberRef.current < totalPagesRef.current) {
          setPageNumber(pageNumberRef.current + 1);
        }
        if (e.key === 'ArrowLeft' && pageNumberRef.current > 1) {
          setPageNumber(pageNumberRef.current - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return function () {
      var _removeWheelListenerR2;
      window.removeEventListener('keydown', handleKeyDown);
      (_removeWheelListenerR2 = removeWheelListenerRef.current) === null || _removeWheelListenerR2 === void 0 || _removeWheelListenerR2.call(removeWheelListenerRef);
    };
  }, []);
  var handleRotate = function handleRotate() {
    return setRotation(function (prev) {
      return (prev + 90) % 360;
    });
  };
  var handleNextPage = function handleNextPage() {
    return handleNextPageRef.current();
  };
  var handlePrevPage = function handlePrevPage() {
    return handlePrevPageRef.current();
  };
  var createOpenableFileUrl = function createOpenableFileUrl() {
    if (!fileSelected) return null;
    if (fileSelected instanceof Blob) {
      return {
        url: URL.createObjectURL(fileSelected),
        shouldRevoke: true
      };
    }
    var resolved = (0, _FileHelpers.resolveOpenableUrl)(fileSelected);
    if (resolved) {
      return {
        url: resolved,
        shouldRevoke: false
      };
    }
    return null;
  };
  var handleOpenInNew = function handleOpenInNew() {
    var fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    var openedWindow = window.open(fileUrl.url, '_blank');
    if (fileUrl.shouldRevoke) {
      (0, _FileHelpers.revokeBlobUrlWhenClosed)(fileUrl.url, openedWindow);
    }
  };
  var writeImagePrintDocument = function writeImagePrintDocument(printWindow, imageUrl) {
    var printDoc = printWindow.document;
    printDoc.open();
    printDoc.write('<!doctype html><html><head></head><body></body></html>');
    printDoc.close();
    printDoc.title = (document === null || document === void 0 ? void 0 : document.fileName) || (labels === null || labels === void 0 ? void 0 : labels.printDocumentTitle) || 'Document';
    var style = printDoc.createElement('style');
    style.textContent = "\n      html, body { margin: 0; min-height: 100%; }\n      body { display: flex; align-items: center; justify-content: center; }\n      img { max-width: 100%; max-height: 100vh; }\n    ";
    printDoc.head.appendChild(style);
    var img = printDoc.createElement('img');
    img.src = imageUrl;
    img.alt = (document === null || document === void 0 ? void 0 : document.fileName) || (labels === null || labels === void 0 ? void 0 : labels.defaultDocumentName) || 'document';
    printDoc.body.appendChild(img);
    return img;
  };
  var handlePrint = function handlePrint() {
    var fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    var printWindow = window.open('', '_blank');
    if (printWindow) {
      if (fileType === _FileHelpers.FileTypes.pdf) {
        printWindow.location.href = fileUrl.url;
        printWindow.onload = function () {
          printWindow.print();
          if (fileUrl.shouldRevoke) (0, _FileHelpers.revokeBlobUrlWhenClosed)(fileUrl.url, printWindow);
        };
        return;
      }
      var printableImage = writeImagePrintDocument(printWindow, fileUrl.url);
      var printImage = function printImage() {
        printWindow.focus();
        printWindow.print();
        if (fileUrl.shouldRevoke) (0, _FileHelpers.revokeBlobUrlWhenClosed)(fileUrl.url, printWindow);
      };
      if (printableImage.complete) {
        printImage();
      } else {
        printableImage.addEventListener('load', printImage, {
          once: true
        });
      }
    } else if (fileUrl.shouldRevoke) {
      URL.revokeObjectURL(fileUrl.url);
    }
  };
  var handleDownload = function handleDownload() {
    if (!fileSelected) return;
    (0, _FileHelpers.downloadFile)(fileSelected, (0, _FileHelpers.resolveDownloadFileName)(document));
  };
  var handleFullscreen = function handleFullscreen() {
    var _containerRef$current;
    if ((_containerRef$current = containerRef.current) !== null && _containerRef$current !== void 0 && _containerRef$current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };
  var handleToggleSidebar = function handleToggleSidebar() {
    return setShowSidebar(function (prev) {
      return !prev;
    });
  };
  var getUnsupportedFileMessage = (0, _react.useCallback)(function () {
    var _labelsRef$current3, _labelsRef$current4;
    return ((_labelsRef$current3 = labelsRef.current) === null || _labelsRef$current3 === void 0 ? void 0 : _labelsRef$current3.unsupportedFile) || ((_labelsRef$current4 = labelsRef.current) === null || _labelsRef$current4 === void 0 ? void 0 : _labelsRef$current4.error) || 'Unsupported file type';
  }, []);
  var setUnsupportedFileError = (0, _react.useCallback)(function () {
    var _onErrorRef$current4;
    var msg = getUnsupportedFileMessage();
    setError(msg);
    (_onErrorRef$current4 = onErrorRef.current) === null || _onErrorRef$current4 === void 0 || _onErrorRef$current4.call(onErrorRef, msg);
  }, [getUnsupportedFileMessage]);
  var applyFileFromBase64 = (0, _react.useCallback)(function (data) {
    var result = (0, _FileHelpers.buildFileFromBase64)(data);
    if (!result) return false;
    setFileType(result.mime);
    setFileSelected(result.file);
    setError('');
    return true;
  }, []);
  var applyFileFromUrl = (0, _react.useCallback)(function (url, fileName) {
    var extension = (0, _FileHelpers.resolveExtension)(url, fileName);
    var type = (0, _FileHelpers.getMimeTypeFromExtension)(extension);
    if (!type) return false;
    setFileType(type);
    setFileSelected(url);
    setError('');
    return true;
  }, []);
  var initData = (0, _react.useCallback)(function () {
    var doc = document;
    if (!doc) {
      resetDocumentState();
      setFileType(undefined);
      setFileSelected(null);
      setError('');
      return;
    }
    resetDocumentState();
    if (doc.fileUri) {
      if (doc.fileUri.startsWith('data:')) {
        if (applyFileFromBase64(doc.fileUri)) return;
      } else if (applyFileFromUrl(doc.fileUri, doc.fileName)) {
        return;
      }
    }
    if (doc.fileData && applyFileFromBase64(doc.fileData)) {
      return;
    }
    setUnsupportedFileError();
  }, [document, resetDocumentState, applyFileFromBase64, applyFileFromUrl, setUnsupportedFileError]);
  var handleRetry = (0, _react.useCallback)(function () {
    setError('');
    initData();
  }, [initData]);
  (0, _react.useEffect)(function () {
    if (typeof window === 'undefined') return;
    _reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || DEFAULT_PDF_WORKER_SRC;
  }, [pdfWorkerSrc]);
  (0, _react.useEffect)(function () {
    initData();
  }, [initData]);
  (0, _react.useEffect)(function () {
    if ((0, _TiffHelpers.isTiffMime)(fileType)) {
      setImageUrl(undefined);
      return undefined;
    }
    if (fileSelected instanceof Blob && fileType !== _FileHelpers.FileTypes.pdf) {
      var url = URL.createObjectURL(fileSelected);
      setImageUrl(url);
      return function () {
        return URL.revokeObjectURL(url);
      };
    }
    if (typeof fileSelected === 'string') {
      setImageUrl(fileSelected);
    }
    return undefined;
  }, [fileSelected, fileType]);
  var displayImageUrl = isTiff ? tiffImageUrl : imageUrl;
  var showToolbar = !error && (Boolean(document) || Boolean(fileSelected));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [showToolbar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Toolbar, {
      onRotate: handleRotate,
      onZoomIn: handleZoomIn,
      onZoomOut: handleZoomOut,
      onReset: resetViewState,
      onNextChange: handleNextPage,
      onPrevPage: handlePrevPage,
      onPageChange: setPageNumber,
      onNewPage: handleOpenInNew,
      onDownload: handleDownload,
      onPrint: handlePrint,
      onFullscreen: handleFullscreen,
      onToggleSidebar: fileType === _FileHelpers.FileTypes.pdf ? handleToggleSidebar : undefined,
      showSidebar: showSidebar,
      hideMovePage: !supportsPagination,
      pdfPages: totalPages,
      pdfPage: pageNumber,
      extra: extraToolbar,
      labels: labels,
      theme: theme
    }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.ErrorViewer, {
      message: error,
      onRetry: handleRetry,
      retryLabel: labels === null || labels === void 0 ? void 0 : labels.retry
    }), !error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.MainContent, {
      children: fileType === _FileHelpers.FileTypes.pdf && fileSelected ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.PdfViewerRoot, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactPdf.Document, {
          file: fileSelected,
          onLoadSuccess: onPdfLoadSuccess,
          onLoadError: onPdfLoadError,
          loading: /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.LoadingMessage, {
            theme: theme,
            children: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...'
          }),
          children: [showSidebar && numPages > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.SidebarContainer, {
            visible: showSidebar,
            theme: theme,
            children: Array.from(new Array(numPages), function (_, index) {
              return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.LazyPdfThumbnail, {
                pageNumber: index + 1,
                active: pageNumber === index + 1,
                width: thumbnailWidth,
                theme: theme,
                loadingLabel: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...',
                onSelect: setPageNumber,
                onLoadError: onThumbnailLoadError
              }, "thumb_".concat(index + 1));
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DocumentContainer, {
            ref: attachViewerContainerRef,
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
      }) : fileSelected ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ImageContainer, {
        rotation: rotation,
        ref: attachViewerContainerRef,
        height: height,
        theme: theme,
        "data-testid": "image-container",
        children: isTiff && tiffLoading && !displayImageUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.LoadingMessage, {
          theme: theme,
          children: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Loading document...'
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactImagePanZoomRotate.PanViewer, {
          zoom: zoom,
          setZoom: function setZoom() {
            return false;
          },
          pandx: dx,
          pandy: dy,
          onPan: onPan,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: displayImageUrl,
            alt: (document === null || document === void 0 ? void 0 : document.fileName) || (labels === null || labels === void 0 ? void 0 : labels.defaultDocumentName) || 'document',
            onLoad: function onLoad() {
              if (!isTiff) _onLoad === null || _onLoad === void 0 || _onLoad();
            },
            onError: function onError() {
              var msg = (labels === null || labels === void 0 ? void 0 : labels.error) || 'Unable to load image';
              setError(msg);
              _onError === null || _onError === void 0 || _onError(msg);
            }
          })
        }, viewerResetKey)
      }) : null
    })]
  });
};