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
_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = "//unpkg.com/pdfjs-dist@".concat(_reactPdf.pdfjs.version, "/build/pdf.worker.min.mjs");
var ZOOM_SENSITIVITY = 0.1;
var MAX_ZOOM = 5;
var MIN_ZOOM = 0.5;
var Viewer = exports.Viewer = function Viewer(_ref) {
  var document = _ref.document,
    extraToolbar = _ref.extraToolbar;
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
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    dx = _useState8[0],
    setDx = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState0 = _slicedToArray(_useState9, 2),
    dy = _useState0[0],
    setDy = _useState0[1];
  var _useState1 = (0, _react.useState)(1),
    _useState10 = _slicedToArray(_useState1, 2),
    zoom = _useState10[0],
    setZoom = _useState10[1];
  var _useState11 = (0, _react.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    rotation = _useState12[0],
    setRotation = _useState12[1];

  // PDF
  var _useState13 = (0, _react.useState)(0),
    _useState14 = _slicedToArray(_useState13, 2),
    numPages = _useState14[0],
    setNumPages = _useState14[1];
  var _useState15 = (0, _react.useState)(1),
    _useState16 = _slicedToArray(_useState15, 2),
    pageNumber = _useState16[0],
    setPageNumber = _useState16[1];
  var onPdfLoadSuccess = function onPdfLoadSuccess(_ref2) {
    var total = _ref2.numPages;
    return setNumPages(total);
  };
  var limits = function limits(num) {
    return Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);
  };
  var handleZoom = (0, _react.useCallback)(function (num) {
    return setZoom(limits(num));
  }, []);
  var handleZoomIn = function handleZoomIn() {
    return handleZoom(zoom + ZOOM_SENSITIVITY);
  };
  var handleZoomOut = function handleZoomOut() {
    return handleZoom(zoom - ZOOM_SENSITIVITY);
  };
  var isInitialState = function isInitialState() {
    return rotation === 0 && zoom === 1;
  };
  var reset = function reset() {
    setRotation(0);
    setDx(0);
    setDy(0);
    setZoom(1);
  };
  var onPan = function onPan(x, y) {
    setDx(x);
    setDy(y);
  };
  var containerRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var element = containerRef.current;
    if (!element) return;
    var handleWheel = function handleWheel(e) {
      e.preventDefault();
      var newScale = e.deltaY < 0 ? zoom + ZOOM_SENSITIVITY : zoom - ZOOM_SENSITIVITY;
      handleZoom(newScale);
    };
    element.addEventListener('wheel', handleWheel, {
      passive: false
    });
    return function () {
      return element.removeEventListener('wheel', handleWheel);
    };
  }, [zoom, handleZoom]);
  var handleRotate = function handleRotate() {
    return setRotation(function (prev) {
      return (prev + 90) % 360;
    });
  };
  var handleNextPage = function handleNextPage() {
    return pageNumber < numPages && setPageNumber(pageNumber + 1);
  };
  var handlePrevPage = function handlePrevPage() {
    return pageNumber > 1 && setPageNumber(pageNumber - 1);
  };
  var handleOpenInNew = function handleOpenInNew() {
    if (!fileSelected) return;
    if (fileSelected instanceof Blob) {
      var url = URL.createObjectURL(fileSelected);
      window.open(url, '_blank');
    } else {
      window.open(fileSelected, '_blank');
    }
  };
  var buildFile = function buildFile(fileBase64) {
    var type = (0, _FileHelpers.getFileTypeFromFile)(fileBase64);
    if (type === _FileHelpers.FileExtension.PDF) {
      var blobFile = (0, _FileHelpers.base64ToBlob)(fileBase64, 'application/pdf');
      return {
        file: blobFile,
        type: 'pdf'
      };
    }
    var prefix = (0, _FileHelpers.getDataURLPrefix)(type);
    return {
      file: "".concat(prefix).concat(prefix.includes(',') ? '' : ',').concat(fileBase64),
      type: 'jpeg'
    };
  };
  var initData = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var arquivo, responseFile, _buildFile, file, type, _buildFile2, _file, _type, extension;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            arquivo = document.document;
            if (arquivo) {
              _context.n = 1;
              break;
            }
            setError('Nenhum arquivo selecionado!');
            return _context.a(2);
          case 1:
            if (!isInitialState()) reset();
            responseFile = arquivo.fileUri;
            if (responseFile === undefined) {
              if (arquivo.fileData) {
                _buildFile = buildFile(arquivo.fileData), file = _buildFile.file, type = _buildFile.type;
                setFileType(_FileHelpers.FileTypes[type]);
                setFileSelected(file);
              }
            } else if (responseFile.startsWith('data:')) {
              _buildFile2 = buildFile(responseFile), _file = _buildFile2.file, _type = _buildFile2.type;
              setFileType(_FileHelpers.FileTypes[_type]);
              setFileSelected(_file);
            } else {
              extension = (0, _FileHelpers.getExtension)(responseFile);
              setFileType(_FileHelpers.FileTypes[extension]);
              setFileSelected(responseFile);
            }
            setError('');
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function initData() {
      return _ref3.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    initData();
  }, [document]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [error && /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.ErrorViewer, {
      message: error
    }), !error && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Toolbar, {
        onRotate: handleRotate,
        onZoomIn: handleZoomIn,
        onZoomOut: handleZoomOut,
        onReset: reset,
        onNextChange: handleNextPage,
        onPrevPage: handlePrevPage,
        onNewPage: handleOpenInNew,
        hideMovePage: fileType !== _FileHelpers.FileTypes.pdf,
        pdfPages: numPages,
        pdfPage: pageNumber,
        extra: extraToolbar
      }), fileType === _FileHelpers.FileTypes.pdf ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DocumentContainer, {
        ref: containerRef,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Document, {
          file: fileSelected,
          onLoadSuccess: onPdfLoadSuccess,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactPdf.Page, {
            pageNumber: pageNumber,
            scale: zoom,
            rotate: rotation,
            height: 500
          })
        })
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ImageContainer, {
        zoom: zoom,
        rotation: rotation,
        ref: containerRef,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactImagePanZoomRotate.PanViewer, {
          zoom: zoom,
          setZoom: function setZoom() {
            return false;
          },
          pandx: dx,
          pandy: dy,
          onPan: onPan,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
            src: typeof fileSelected === 'string' ? fileSelected : undefined,
            alt: "document"
          })
        })
      })]
    })]
  });
};