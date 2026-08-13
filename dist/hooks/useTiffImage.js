"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTiffImage = void 0;
var _react = require("react");
var _TiffHelpers = require("../Viewer/TiffHelpers");
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
var useTiffImage = exports.useTiffImage = function useTiffImage(_ref) {
  var source = _ref.source,
    pageNumber = _ref.pageNumber,
    onLoad = _ref.onLoad,
    onError = _ref.onError;
  var _useState = (0, _react.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    imageUrl = _useState2[0],
    setImageUrl = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    pageCount = _useState4[0],
    setPageCount = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var decodedRef = (0, _react.useRef)(null);
  var objectUrlRef = (0, _react.useRef)(null);
  var onLoadRef = (0, _react.useRef)(onLoad);
  onLoadRef.current = onLoad;
  var onErrorRef = (0, _react.useRef)(onError);
  onErrorRef.current = onError;
  (0, _react.useEffect)(function () {
    var cancelled = false;
    var revokeObjectUrl = function revokeObjectUrl() {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
    var loadTiff = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _onLoadRef$current, decoded, _onErrorRef$current, safePage, pngBlob, _onErrorRef$current2, url, _onErrorRef$current3, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              revokeObjectUrl();
              setImageUrl(undefined);
              setPageCount(0);
              decodedRef.current = null;
              if (source) {
                _context.n = 1;
                break;
              }
              setLoading(false);
              return _context.a(2);
            case 1:
              setLoading(true);
              _context.p = 2;
              _context.n = 3;
              return (0, _TiffHelpers.decodeTiff)(source);
            case 3:
              decoded = _context.v;
              if (!cancelled) {
                _context.n = 4;
                break;
              }
              return _context.a(2);
            case 4:
              if (decoded) {
                _context.n = 5;
                break;
              }
              setLoading(false);
              (_onErrorRef$current = onErrorRef.current) === null || _onErrorRef$current === void 0 || _onErrorRef$current.call(onErrorRef, 'Unable to decode TIFF image');
              return _context.a(2);
            case 5:
              decodedRef.current = decoded;
              setPageCount(decoded.pageCount);
              safePage = Math.min(Math.max(pageNumber, 1), decoded.pageCount);
              _context.n = 6;
              return decoded.renderPage(safePage - 1);
            case 6:
              pngBlob = _context.v;
              if (!cancelled) {
                _context.n = 7;
                break;
              }
              return _context.a(2);
            case 7:
              if (pngBlob) {
                _context.n = 8;
                break;
              }
              setLoading(false);
              (_onErrorRef$current2 = onErrorRef.current) === null || _onErrorRef$current2 === void 0 || _onErrorRef$current2.call(onErrorRef, 'Unable to render TIFF page');
              return _context.a(2);
            case 8:
              url = URL.createObjectURL(pngBlob);
              objectUrlRef.current = url;
              setImageUrl(url);
              setLoading(false);
              (_onLoadRef$current = onLoadRef.current) === null || _onLoadRef$current === void 0 || _onLoadRef$current.call(onLoadRef);
              _context.n = 11;
              break;
            case 9:
              _context.p = 9;
              _t = _context.v;
              if (!cancelled) {
                _context.n = 10;
                break;
              }
              return _context.a(2);
            case 10:
              setLoading(false);
              setImageUrl(undefined);
              (_onErrorRef$current3 = onErrorRef.current) === null || _onErrorRef$current3 === void 0 || _onErrorRef$current3.call(onErrorRef, 'Unable to decode TIFF image');
            case 11:
              return _context.a(2);
          }
        }, _callee, null, [[2, 9]]);
      }));
      return function loadTiff() {
        return _ref2.apply(this, arguments);
      };
    }();
    loadTiff();
    return function () {
      cancelled = true;
      revokeObjectUrl();
    };
  }, [source]);
  (0, _react.useEffect)(function () {
    var cancelled = false;
    var renderPage = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var decoded, safePage, pngBlob, _onErrorRef$current4, url, _onErrorRef$current5, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              decoded = decodedRef.current;
              if (!(!decoded || !source)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
              }
              setLoading(true);
              _context2.p = 2;
              safePage = Math.min(Math.max(pageNumber, 1), decoded.pageCount);
              _context2.n = 3;
              return decoded.renderPage(safePage - 1);
            case 3:
              pngBlob = _context2.v;
              if (!cancelled) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2);
            case 4:
              if (pngBlob) {
                _context2.n = 5;
                break;
              }
              setLoading(false);
              (_onErrorRef$current4 = onErrorRef.current) === null || _onErrorRef$current4 === void 0 || _onErrorRef$current4.call(onErrorRef, 'Unable to render TIFF page');
              return _context2.a(2);
            case 5:
              url = URL.createObjectURL(pngBlob);
              objectUrlRef.current = url;
              setImageUrl(url);
              setLoading(false);
              _context2.n = 8;
              break;
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              if (!cancelled) {
                _context2.n = 7;
                break;
              }
              return _context2.a(2);
            case 7:
              setLoading(false);
              setImageUrl(undefined);
              (_onErrorRef$current5 = onErrorRef.current) === null || _onErrorRef$current5 === void 0 || _onErrorRef$current5.call(onErrorRef, 'Unable to render TIFF page');
            case 8:
              return _context2.a(2);
          }
        }, _callee2, null, [[2, 6]]);
      }));
      return function renderPage() {
        return _ref3.apply(this, arguments);
      };
    }();
    if (decodedRef.current) {
      renderPage();
    }
    return function () {
      cancelled = true;
    };
  }, [pageNumber, source]);
  return {
    imageUrl: imageUrl,
    pageCount: pageCount,
    loading: loading
  };
};