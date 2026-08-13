"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViewerCore = useViewerCore;
var _react = require("react");
var _reactPdf = require("react-pdf");
var _FileHelpers = require("../Viewer/FileHelpers");
var _TiffHelpers = require("../Viewer/TiffHelpers");
var _useElementWidth2 = require("./useElementWidth");
var _useTiffImage2 = require("./useTiffImage");
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
function createInitialState() {
  return {
    error: '',
    fileType: undefined,
    fileSelected: null,
    imageUrl: undefined,
    showSidebar: false,
    zoom: 1,
    rotation: 0,
    dx: 0,
    dy: 0,
    viewerResetKey: 0,
    numPages: 0,
    pageNumber: 1,
    totalPages: 0,
    supportsPagination: false,
    containerWidth: 0,
    displayImageUrl: undefined,
    isTiff: false,
    tiffLoading: false,
    pdfPageWidth: undefined,
    thumbnailWidth: 120,
    labels: undefined,
    theme: 'light',
    documentFileName: undefined
  };
}
var limits = function limits(num) {
  return Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);
};
function useViewerCore(input) {
  var document = input.document,
    labels = input.labels,
    _input$theme = input.theme,
    theme = _input$theme === void 0 ? 'light' : _input$theme,
    pdfWorkerSrc = input.pdfWorkerSrc,
    onLoad = input.onLoad,
    onError = input.onError;
  var _useState = (0, _react.useState)(createInitialState),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  var onErrorRef = (0, _react.useRef)(onError);
  onErrorRef.current = onError;
  var onLoadRef = (0, _react.useRef)(onLoad);
  onLoadRef.current = onLoad;
  var labelsRef = (0, _react.useRef)(labels);
  labelsRef.current = labels;
  var documentRef = (0, _react.useRef)(document);
  documentRef.current = document;
  var zoomRef = (0, _react.useRef)(state.zoom);
  zoomRef.current = state.zoom;
  var fileTypeRef = (0, _react.useRef)(state.fileType);
  fileTypeRef.current = state.fileType;
  var pageNumberRef = (0, _react.useRef)(state.pageNumber);
  pageNumberRef.current = state.pageNumber;
  var numPagesRef = (0, _react.useRef)(state.numPages);
  numPagesRef.current = state.numPages;
  var isTiff = (0, _TiffHelpers.isTiffMime)(state.fileType);
  var tiffSource = isTiff ? state.fileSelected : null;
  var _useTiffImage = (0, _useTiffImage2.useTiffImage)({
      source: tiffSource,
      pageNumber: state.pageNumber,
      onLoad: onLoad,
      onError: function onError(message) {
        var _onErrorRef$current;
        setState(function (prev) {
          var _labelsRef$current;
          return _objectSpread(_objectSpread({}, prev), {}, {
            error: ((_labelsRef$current = labelsRef.current) === null || _labelsRef$current === void 0 ? void 0 : _labelsRef$current.error) || 'Unable to load document'
          });
        });
        (_onErrorRef$current = onErrorRef.current) === null || _onErrorRef$current === void 0 || _onErrorRef$current.call(onErrorRef, message);
      }
    }),
    tiffImageUrl = _useTiffImage.imageUrl,
    tiffPageCount = _useTiffImage.pageCount,
    tiffLoading = _useTiffImage.loading;
  var totalPages = state.fileType === _FileHelpers.FileTypes.pdf ? state.numPages : isTiff ? tiffPageCount : 0;
  var supportsPagination = state.fileType === _FileHelpers.FileTypes.pdf || isTiff && tiffPageCount > 1;
  var totalPagesRef = (0, _react.useRef)(totalPages);
  totalPagesRef.current = totalPages;
  var supportsPaginationRef = (0, _react.useRef)(supportsPagination);
  supportsPaginationRef.current = supportsPagination;
  var fileSelectedRef = (0, _react.useRef)(state.fileSelected);
  fileSelectedRef.current = state.fileSelected;
  var zoomIn = (0, _react.useCallback)(function () {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        zoom: limits(prev.zoom + ZOOM_SENSITIVITY)
      });
    });
  }, []);
  var zoomOut = (0, _react.useCallback)(function () {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        zoom: limits(prev.zoom - ZOOM_SENSITIVITY)
      });
    });
  }, []);
  var rotate = (0, _react.useCallback)(function () {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        rotation: (prev.rotation + 90) % 360
      });
    });
  }, []);
  var resetViewState = (0, _react.useCallback)(function () {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        rotation: 0,
        dx: 0,
        dy: 0,
        zoom: 1,
        pageNumber: 1,
        viewerResetKey: prev.viewerResetKey + 1
      });
    });
  }, []);
  var resetDocumentState = (0, _react.useCallback)(function () {
    resetViewState();
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        numPages: 0
      });
    });
  }, [resetViewState]);
  var nextPage = (0, _react.useCallback)(function () {
    if (pageNumberRef.current < totalPagesRef.current) {
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          pageNumber: prev.pageNumber + 1
        });
      });
    }
  }, []);
  var prevPage = (0, _react.useCallback)(function () {
    if (pageNumberRef.current > 1) {
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          pageNumber: prev.pageNumber - 1
        });
      });
    }
  }, []);
  var setPageNumber = (0, _react.useCallback)(function (page) {
    if (!Number.isFinite(page) || page < 1) return;
    var total = totalPagesRef.current;
    if (total > 0 && page > total) return;
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        pageNumber: page
      });
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (totalPages > 0 && pageNumberRef.current > totalPages) {
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          pageNumber: Math.min(prev.pageNumber, totalPages)
        });
      });
    }
  }, [totalPages]);
  var onPan = (0, _react.useCallback)(function (x, y) {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        dx: x,
        dy: y
      });
    });
  }, []);
  var containerRef = (0, _react.useRef)(null);
  var rootRef = (0, _react.useRef)(null);
  var removeWheelListenerRef = (0, _react.useRef)(null);
  var removeKeyListenerRef = (0, _react.useRef)(null);
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
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          zoom: limits(nextZoom)
        });
      });
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
  var attachViewerRootRef = (0, _react.useCallback)(function (element) {
    var _removeKeyListenerRef;
    (_removeKeyListenerRef = removeKeyListenerRef.current) === null || _removeKeyListenerRef === void 0 || _removeKeyListenerRef.call(removeKeyListenerRef);
    removeKeyListenerRef.current = null;
    rootRef.current = element;
    if (!element) return;
    var handleKeyDown = function handleKeyDown(e) {
      if (isEditableTarget(e.target)) return;
      if (e.ctrlKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              zoom: limits(prev.zoom + ZOOM_SENSITIVITY)
            });
          });
        } else if (e.key === '-') {
          e.preventDefault();
          setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              zoom: limits(prev.zoom - ZOOM_SENSITIVITY)
            });
          });
        }
      }
      if (supportsPaginationRef.current) {
        if (e.key === 'ArrowRight' && pageNumberRef.current < totalPagesRef.current) {
          e.preventDefault();
          setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              pageNumber: prev.pageNumber + 1
            });
          });
        }
        if (e.key === 'ArrowLeft' && pageNumberRef.current > 1) {
          e.preventDefault();
          setState(function (prev) {
            return _objectSpread(_objectSpread({}, prev), {}, {
              pageNumber: prev.pageNumber - 1
            });
          });
        }
      }
    };
    element.addEventListener('keydown', handleKeyDown);
    removeKeyListenerRef.current = function () {
      return element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    var mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    var handleViewportChange = function handleViewportChange(event) {
      if (event.matches) {
        setState(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            showSidebar: false
          });
        });
      }
    };
    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);
    return function () {
      return mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      var _removeWheelListenerR2, _removeKeyListenerRef2;
      (_removeWheelListenerR2 = removeWheelListenerRef.current) === null || _removeWheelListenerR2 === void 0 || _removeWheelListenerR2.call(removeWheelListenerRef);
      (_removeKeyListenerRef2 = removeKeyListenerRef.current) === null || _removeKeyListenerRef2 === void 0 || _removeKeyListenerRef2.call(removeKeyListenerRef);
    };
  }, []);
  var displayImageUrlRef = (0, _react.useRef)(undefined);
  var createOpenableFileUrl = (0, _react.useCallback)(function () {
    if ((0, _TiffHelpers.isTiffMime)(fileTypeRef.current)) {
      var displayUrl = displayImageUrlRef.current;
      if (!displayUrl) return null;
      return {
        url: displayUrl,
        shouldRevoke: false
      };
    }
    var fileSelected = fileSelectedRef.current;
    if (!fileSelected) return null;
    if (fileSelected instanceof Blob) {
      return {
        url: URL.createObjectURL(fileSelected),
        shouldRevoke: true
      };
    }
    var resolved = (0, _FileHelpers.resolveOpenableUrl)(fileSelected);
    if (resolved) return {
      url: resolved,
      shouldRevoke: false
    };
    return null;
  }, []);
  var handleOpenInNew = (0, _react.useCallback)(function () {
    var fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    var openedWindow = window.open(fileUrl.url, '_blank');
    if (openedWindow) openedWindow.opener = null;
    if (fileUrl.shouldRevoke) (0, _FileHelpers.revokeBlobUrlWhenClosed)(fileUrl.url, openedWindow);
  }, [createOpenableFileUrl]);
  var writeImagePrintDocument = (0, _react.useCallback)(function (printWindow, imageUrl) {
    var printDoc = printWindow.document;
    printDoc.open();
    printDoc.write('<!doctype html><html><head></head><body></body></html>');
    printDoc.close();
    printDoc.title = (document === null || document === void 0 ? void 0 : document.fileName) || (labels === null || labels === void 0 ? void 0 : labels.printDocumentTitle) || 'Document';
    var style = printDoc.createElement('style');
    style.textContent = "html,body{margin:0;min-height:100%}body{display:flex;align-items:center;justify-content:center}img{max-width:100%;max-height:100vh}";
    printDoc.head.appendChild(style);
    var img = printDoc.createElement('img');
    img.src = imageUrl;
    img.alt = (document === null || document === void 0 ? void 0 : document.fileName) || (labels === null || labels === void 0 ? void 0 : labels.defaultDocumentName) || 'document';
    printDoc.body.appendChild(img);
    return img;
  }, [document, labels]);
  var handlePrint = (0, _react.useCallback)(function () {
    var fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    var printWindow = window.open('', '_blank');
    if (printWindow) {
      if (fileTypeRef.current === _FileHelpers.FileTypes.pdf) {
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
      if (printableImage.complete) printImage();else printableImage.addEventListener('load', printImage, {
        once: true
      });
    } else if (fileUrl.shouldRevoke) URL.revokeObjectURL(fileUrl.url);
  }, [createOpenableFileUrl, writeImagePrintDocument]);
  var handleDownload = (0, _react.useCallback)(function () {
    var fileSelected = fileSelectedRef.current;
    if (!fileSelected) return;
    (0, _FileHelpers.downloadFile)(fileSelected, (0, _FileHelpers.resolveDownloadFileName)(document));
  }, [document]);
  var toggleFullscreen = (0, _react.useCallback)(function () {
    var _rootRef$current, _target$requestFullsc;
    var target = (_rootRef$current = rootRef.current) !== null && _rootRef$current !== void 0 ? _rootRef$current : containerRef.current;
    if (!target) return;
    var active = globalThis.document.fullscreenElement;
    if (active && (active === target || target.contains(active))) {
      var _globalThis$document$, _globalThis$document;
      void ((_globalThis$document$ = (_globalThis$document = globalThis.document).exitFullscreen) === null || _globalThis$document$ === void 0 ? void 0 : _globalThis$document$.call(_globalThis$document));
      return;
    }
    void ((_target$requestFullsc = target.requestFullscreen) === null || _target$requestFullsc === void 0 ? void 0 : _target$requestFullsc.call(target));
  }, []);
  var toggleSidebar = (0, _react.useCallback)(function () {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        showSidebar: !prev.showSidebar
      });
    });
  }, []);
  var onPdfLoadSuccess = (0, _react.useCallback)(function (_ref) {
    var _onLoadRef$current;
    var total = _ref.numPages;
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        numPages: total
      });
    });
    (_onLoadRef$current = onLoadRef.current) === null || _onLoadRef$current === void 0 || _onLoadRef$current.call(onLoadRef);
  }, []);
  var onPdfLoadError = (0, _react.useCallback)(function (err) {
    var _onErrorRef$current2;
    setState(function (prev) {
      var _labelsRef$current2;
      return _objectSpread(_objectSpread({}, prev), {}, {
        error: ((_labelsRef$current2 = labelsRef.current) === null || _labelsRef$current2 === void 0 ? void 0 : _labelsRef$current2.error) || 'Unable to load document'
      });
    });
    (_onErrorRef$current2 = onErrorRef.current) === null || _onErrorRef$current2 === void 0 || _onErrorRef$current2.call(onErrorRef, err.message);
  }, []);
  var onThumbnailLoadError = (0, _react.useCallback)(function (err) {
    var _onErrorRef$current3;
    (_onErrorRef$current3 = onErrorRef.current) === null || _onErrorRef$current3 === void 0 || _onErrorRef$current3.call(onErrorRef, err.message);
  }, []);
  var onImageLoad = (0, _react.useCallback)(function () {
    var _onLoadRef$current2;
    (_onLoadRef$current2 = onLoadRef.current) === null || _onLoadRef$current2 === void 0 || _onLoadRef$current2.call(onLoadRef);
  }, []);
  var onImageError = (0, _react.useCallback)(function () {
    var _onErrorRef$current4, _labelsRef$current4;
    setState(function (prev) {
      var _labelsRef$current3;
      return _objectSpread(_objectSpread({}, prev), {}, {
        error: ((_labelsRef$current3 = labelsRef.current) === null || _labelsRef$current3 === void 0 ? void 0 : _labelsRef$current3.error) || 'Unable to load image'
      });
    });
    (_onErrorRef$current4 = onErrorRef.current) === null || _onErrorRef$current4 === void 0 || _onErrorRef$current4.call(onErrorRef, ((_labelsRef$current4 = labelsRef.current) === null || _labelsRef$current4 === void 0 ? void 0 : _labelsRef$current4.error) || 'Unable to load image');
  }, []);
  var getUnsupportedFileMessage = (0, _react.useCallback)(function () {
    var _labelsRef$current5, _labelsRef$current6;
    return ((_labelsRef$current5 = labelsRef.current) === null || _labelsRef$current5 === void 0 ? void 0 : _labelsRef$current5.unsupportedFile) || ((_labelsRef$current6 = labelsRef.current) === null || _labelsRef$current6 === void 0 ? void 0 : _labelsRef$current6.error) || 'Unsupported file type';
  }, []);
  var setUnsupportedFileError = (0, _react.useCallback)(function () {
    var _onErrorRef$current5;
    var msg = getUnsupportedFileMessage();
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        error: msg
      });
    });
    (_onErrorRef$current5 = onErrorRef.current) === null || _onErrorRef$current5 === void 0 || _onErrorRef$current5.call(onErrorRef, msg);
  }, [getUnsupportedFileMessage]);
  var applyFileFromBase64 = (0, _react.useCallback)(function (data) {
    var result = (0, _FileHelpers.buildFileFromBase64)(data);
    if (!result) return false;
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        fileType: result.mime,
        fileSelected: result.file,
        error: ''
      });
    });
    return true;
  }, []);
  var applyFileFromUrl = (0, _react.useCallback)(function (url, fileName) {
    if (!(0, _FileHelpers.isSafeDocumentUri)(url)) return false;
    var extension = (0, _FileHelpers.resolveExtension)(url, fileName);
    var type = (0, _FileHelpers.getMimeTypeFromExtension)(extension);
    if (!type) return false;
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        fileType: type,
        fileSelected: url,
        error: ''
      });
    });
    return true;
  }, []);
  var initData = (0, _react.useCallback)(function () {
    var doc = documentRef.current;
    if (!doc) {
      resetDocumentState();
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          fileType: undefined,
          fileSelected: null,
          error: ''
        });
      });
      return;
    }
    resetDocumentState();
    if (doc.fileUri) {
      if (doc.fileUri.startsWith('data:')) {
        if (applyFileFromBase64(doc.fileUri)) return;
      } else if (applyFileFromUrl(doc.fileUri, doc.fileName)) return;
    }
    if (doc.fileData && applyFileFromBase64(doc.fileData)) return;
    setUnsupportedFileError();
  }, [resetDocumentState, applyFileFromBase64, applyFileFromUrl, setUnsupportedFileError]);
  var handleRetry = (0, _react.useCallback)(function () {
    setState(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        error: ''
      });
    });
    initData();
  }, [initData]);
  (0, _react.useEffect)(function () {
    if (typeof window === 'undefined') return;
    _reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || DEFAULT_PDF_WORKER_SRC;
  }, [pdfWorkerSrc]);
  (0, _react.useEffect)(function () {
    initData();
  }, [initData, document === null || document === void 0 ? void 0 : document.fileName, document === null || document === void 0 ? void 0 : document.fileUri, document === null || document === void 0 ? void 0 : document.fileData]);
  (0, _react.useEffect)(function () {
    if ((0, _TiffHelpers.isTiffMime)(state.fileType)) {
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          imageUrl: undefined
        });
      });
      return;
    }
    var fileSelected = state.fileSelected;
    if (fileSelected instanceof Blob && state.fileType !== _FileHelpers.FileTypes.pdf) {
      var url = URL.createObjectURL(fileSelected);
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          imageUrl: url
        });
      });
      return function () {
        return URL.revokeObjectURL(url);
      };
    }
    if (typeof fileSelected === 'string') {
      setState(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          imageUrl: fileSelected
        });
      });
    }
  }, [state.fileSelected, state.fileType]);
  var displayImageUrl = isTiff ? tiffImageUrl : state.imageUrl;
  displayImageUrlRef.current = displayImageUrl;
  var pdfBaseWidth = Math.max(0, containerWidth - VIEWER_HORIZONTAL_PADDING);
  var pdfPageWidth = pdfBaseWidth > 0 ? Math.floor(pdfBaseWidth * state.zoom) : undefined;
  var thumbnailWidth = Math.min(180, Math.max(72, pdfBaseWidth > 0 ? pdfBaseWidth - 16 : 120));
  var mergedState = (0, _react.useMemo)(function () {
    var _documentRef$current;
    return _objectSpread(_objectSpread({}, state), {}, {
      totalPages: totalPages,
      supportsPagination: supportsPagination,
      containerWidth: containerWidth,
      displayImageUrl: displayImageUrl,
      isTiff: isTiff,
      tiffLoading: tiffLoading,
      pdfPageWidth: pdfPageWidth,
      thumbnailWidth: thumbnailWidth,
      labels: labels,
      theme: theme,
      documentFileName: (_documentRef$current = documentRef.current) === null || _documentRef$current === void 0 ? void 0 : _documentRef$current.fileName
    });
  }, [state, totalPages, supportsPagination, containerWidth, displayImageUrl, isTiff, tiffLoading, pdfPageWidth, thumbnailWidth, labels, theme]);
  var actions = (0, _react.useMemo)(function () {
    return {
      setPageNumber: setPageNumber,
      zoomIn: zoomIn,
      zoomOut: zoomOut,
      rotate: rotate,
      resetViewState: resetViewState,
      nextPage: nextPage,
      prevPage: prevPage,
      handleDownload: handleDownload,
      handlePrint: handlePrint,
      handleOpenInNew: handleOpenInNew,
      toggleFullscreen: toggleFullscreen,
      toggleSidebar: toggleSidebar,
      handleRetry: handleRetry,
      attachViewerContainerRef: attachViewerContainerRef,
      attachViewerRootRef: attachViewerRootRef,
      onPdfLoadSuccess: onPdfLoadSuccess,
      onPdfLoadError: onPdfLoadError,
      onThumbnailLoadError: onThumbnailLoadError,
      onPan: onPan,
      onImageLoad: onImageLoad,
      onImageError: onImageError
    };
  }, [setPageNumber, zoomIn, zoomOut, rotate, resetViewState, nextPage, prevPage, handleDownload, handlePrint, handleOpenInNew, toggleFullscreen, toggleSidebar, handleRetry, attachViewerContainerRef, attachViewerRootRef, onPdfLoadSuccess, onPdfLoadError, onThumbnailLoadError, onPan, onImageLoad, onImageError]);
  return {
    state: mergedState,
    actions: actions,
    containerRef: containerRef
  };
}