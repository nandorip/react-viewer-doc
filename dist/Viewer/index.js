"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = void 0;
var _react = require("react");
var _reactImagePanZoomRotate = require("react-image-pan-zoom-rotate");
var _reactPdf = require("react-pdf");
var _components = require("../components");
var _FileHelpers = require("./FileHelpers");
var _styles = require("../styles");
require("react-pdf/dist/Page/AnnotationLayer.css");
require("react-pdf/dist/Page/TextLayer.css");
var _jsxRuntime = require("react/jsx-runtime");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DEFAULT_PDF_WORKER_SRC = "//unpkg.com/pdfjs-dist@".concat(_reactPdf.pdfjs.version, "/build/pdf.worker.min.mjs");
_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = DEFAULT_PDF_WORKER_SRC;
var ZOOM_SENSITIVITY = 0.1;
var MAX_ZOOM = 5;
var MIN_ZOOM = 0.5;
var BLOB_URL_REVOKE_DELAY_MS = 60000;
var Viewer = exports.Viewer = function Viewer(_ref) {
  var document = _ref.document,
    extraToolbar = _ref.extraToolbar,
    height = _ref.height,
    labels = _ref.labels,
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

  // PDF
  var _useState19 = (0, _react.useState)(0),
    _useState20 = _slicedToArray(_useState19, 2),
    numPages = _useState20[0],
    setNumPages = _useState20[1];
  var _useState21 = (0, _react.useState)(1),
    _useState22 = _slicedToArray(_useState21, 2),
    pageNumber = _useState22[0],
    setPageNumber = _useState22[1];
  var onPdfLoadSuccess = function onPdfLoadSuccess(_ref2) {
    var total = _ref2.numPages;
    setNumPages(total);
    _onLoad === null || _onLoad === void 0 || _onLoad();
  };
  var onPdfLoadError = function onPdfLoadError(err) {
    var msg = (labels === null || labels === void 0 ? void 0 : labels.error) || 'Erro ao carregar documento';
    setError(msg);
    _onError === null || _onError === void 0 || _onError(err.message);
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
    if (pageNumberRef.current < numPagesRef.current) {
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
  (0, _react.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(e) {
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
      if (fileTypeRef.current === _FileHelpers.FileTypes.pdf) {
        if (e.key === 'ArrowRight' && pageNumberRef.current < numPagesRef.current) {
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
    if ((0, _FileHelpers.isValidUrl)(fileSelected)) {
      return {
        url: fileSelected,
        shouldRevoke: false
      };
    }
    return null;
  };
  var scheduleRevokeObjectUrl = function scheduleRevokeObjectUrl(url) {
    window.setTimeout(function () {
      return URL.revokeObjectURL(url);
    }, BLOB_URL_REVOKE_DELAY_MS);
  };
  var handleOpenInNew = function handleOpenInNew() {
    var fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    var openedWindow = window.open(fileUrl.url, '_blank');
    if (fileUrl.shouldRevoke) {
      if (openedWindow) {
        scheduleRevokeObjectUrl(fileUrl.url);
      } else {
        URL.revokeObjectURL(fileUrl.url);
      }
    }
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
          if (fileUrl.shouldRevoke) scheduleRevokeObjectUrl(fileUrl.url);
        };
        return;
      }
      printWindow.document.open();
      printWindow.document.write("\n        <!doctype html>\n        <html>\n          <head>\n            <title>".concat((document === null || document === void 0 ? void 0 : document.fileName) || 'document', "</title>\n            <style>\n              html, body {\n                margin: 0;\n                min-height: 100%;\n              }\n              body {\n                display: flex;\n                align-items: center;\n                justify-content: center;\n              }\n              img {\n                max-width: 100%;\n                max-height: 100vh;\n              }\n            </style>\n          </head>\n          <body>\n            <img src=\"").concat(fileUrl.url, "\" alt=\"").concat((document === null || document === void 0 ? void 0 : document.fileName) || 'document', "\" />\n          </body>\n        </html>\n      "));
      printWindow.document.close();
      var printableImage = printWindow.document.querySelector('img');
      var printImage = function printImage() {
        printWindow.focus();
        printWindow.print();
        if (fileUrl.shouldRevoke) scheduleRevokeObjectUrl(fileUrl.url);
      };
      if (printableImage !== null && printableImage !== void 0 && printableImage.complete) {
        printImage();
      } else {
        printableImage === null || printableImage === void 0 || printableImage.addEventListener('load', printImage, {
          once: true
        });
      }
    } else if (fileUrl.shouldRevoke) {
      URL.revokeObjectURL(fileUrl.url);
    }
  };
  var handleDownload = function handleDownload() {
    if (!fileSelected || !(document !== null && document !== void 0 && document.fileName)) return;
    (0, _FileHelpers.downloadFile)(fileSelected, document.fileName);
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
  var getUnsupportedFileMessage = function getUnsupportedFileMessage() {
    return (labels === null || labels === void 0 ? void 0 : labels.unsupportedFile) || (labels === null || labels === void 0 ? void 0 : labels.error) || 'Tipo de arquivo não suportado';
  };
  var setUnsupportedFileError = function setUnsupportedFileError() {
    var msg = getUnsupportedFileMessage();
    setError(msg);
    _onError === null || _onError === void 0 || _onError(msg);
  };
  var buildFile = function buildFile(fileBase64) {
    var content = fileBase64;
    if (fileBase64.startsWith('data:')) {
      var parts = fileBase64.split(',');
      if (parts.length > 1) {
        content = parts[1];
      }
    }
    var type = (0, _FileHelpers.getFileTypeFromFile)(fileBase64);
    var mime = (0, _FileHelpers.getMimeTypeFromBase64)(fileBase64);
    if (type === _FileHelpers.FileExtension.PDF) {
      var _blobFile = (0, _FileHelpers.base64ToBlob)(content, 'application/pdf');
      if (!_blobFile) return null;
      return {
        file: _blobFile,
        type: 'pdf',
        mime: mime
      };
    }
    if (type !== _FileHelpers.FileExtension.IMAGE) return null;
    var blobFile = (0, _FileHelpers.base64ToBlob)(content, mime);
    if (blobFile) {
      return {
        file: blobFile,
        type: 'image',
        mime: mime
      };
    }
    return {
      file: "data:".concat(mime, ";base64,").concat(content),
      type: 'image',
      mime: mime
    };
  };
  var initData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var doc, responseFile, result, _result, extension, type;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            doc = document;
            if (doc) {
              _context.n = 1;
              break;
            }
            resetDocumentState();
            setFileType(undefined);
            setFileSelected(null);
            setError('');
            return _context.a(2);
          case 1:
            resetDocumentState();
            responseFile = doc.fileUri;
            if (!(responseFile === undefined)) {
              _context.n = 6;
              break;
            }
            if (!doc.fileData) {
              _context.n = 4;
              break;
            }
            result = buildFile(doc.fileData);
            if (!result) {
              _context.n = 2;
              break;
            }
            setFileType(result.mime);
            setFileSelected(result.file);
            _context.n = 3;
            break;
          case 2:
            setUnsupportedFileError();
            return _context.a(2);
          case 3:
            _context.n = 5;
            break;
          case 4:
            setUnsupportedFileError();
            return _context.a(2);
          case 5:
            _context.n = 11;
            break;
          case 6:
            if (!responseFile.startsWith('data:')) {
              _context.n = 9;
              break;
            }
            _result = buildFile(responseFile);
            if (!_result) {
              _context.n = 7;
              break;
            }
            setFileType(_result.mime);
            setFileSelected(_result.file);
            _context.n = 8;
            break;
          case 7:
            setUnsupportedFileError();
            return _context.a(2);
          case 8:
            _context.n = 11;
            break;
          case 9:
            extension = (0, _FileHelpers.getExtension)(responseFile);
            type = _FileHelpers.FileTypes[extension];
            if (!(!type || type === _FileHelpers.FileTypes.csv)) {
              _context.n = 10;
              break;
            }
            setUnsupportedFileError();
            return _context.a(2);
          case 10:
            setFileType(type);
            setFileSelected(responseFile);
          case 11:
            setError('');
          case 12:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function initData() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    _reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc || DEFAULT_PDF_WORKER_SRC;
  }, [pdfWorkerSrc]);
  (0, _react.useEffect)(function () {
    initData();
  }, [document]);
  (0, _react.useEffect)(function () {
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
  }, [fileSelected, fileType]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.ErrorViewer, {
      message: error
    }), !error && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Toolbar, {
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
        hideMovePage: fileType !== _FileHelpers.FileTypes.pdf,
        pdfPages: numPages,
        pdfPage: pageNumber,
        extra: extraToolbar,
        labels: labels
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.MainContent, {
        children: [fileType === _FileHelpers.FileTypes.pdf && /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.SidebarContainer, {
          visible: showSidebar,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Document, {
            file: fileSelected,
            loading: null,
            onLoadError: function onLoadError() {
              return null;
            },
            children: Array.from(new Array(numPages), function (el, index) {
              return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.ThumbnailItem, {
                active: pageNumber === index + 1,
                onClick: function onClick() {
                  return setPageNumber(index + 1);
                },
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Page, {
                  pageNumber: index + 1,
                  width: 180,
                  renderTextLayer: false,
                  renderAnnotationLayer: false
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  style: {
                    fontSize: '12px'
                  },
                  children: index + 1
                })]
              }, "thumb_".concat(index + 1));
            })
          })
        }), fileType === _FileHelpers.FileTypes.pdf ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DocumentContainer, {
          ref: attachContainerRef,
          height: height,
          "data-testid": "document-container",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Document, {
            file: fileSelected,
            onLoadSuccess: onPdfLoadSuccess,
            onLoadError: onPdfLoadError,
            loading: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              children: (labels === null || labels === void 0 ? void 0 : labels.loading) || 'Carregando documento...'
            }),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Page, {
              pageNumber: pageNumber,
              scale: zoom,
              rotate: rotation,
              renderTextLayer: true,
              renderAnnotationLayer: true
            })
          })
        }) : fileSelected ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ImageContainer, {
          zoom: zoom,
          rotation: rotation,
          ref: attachContainerRef,
          height: height,
          "data-testid": "image-container",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactImagePanZoomRotate.PanViewer, {
            zoom: zoom,
            setZoom: function setZoom() {
              return false;
            },
            pandx: dx,
            pandy: dy,
            onPan: onPan,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
              src: imageUrl,
              alt: (document === null || document === void 0 ? void 0 : document.fileName) || 'document',
              onLoad: function onLoad() {
                return _onLoad === null || _onLoad === void 0 ? void 0 : _onLoad();
              },
              onError: function onError() {
                var msg = (labels === null || labels === void 0 ? void 0 : labels.error) || 'Erro ao carregar imagem';
                setError(msg);
                _onError === null || _onError === void 0 || _onError(msg);
              }
            })
          }, viewerResetKey)
        }) : null]
      })]
    })]
  });
};