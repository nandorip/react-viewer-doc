"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayPageNumber = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _styles = require("../../../styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var DisplayPageNumber = exports.DisplayPageNumber = function DisplayPageNumber(_ref) {
  var totalPages = _ref.totalPages,
    page = _ref.page,
    onPageChange = _ref.onPageChange,
    _ref$ariaLabel = _ref.ariaLabel,
    ariaLabel = _ref$ariaLabel === void 0 ? 'Current page' : _ref$ariaLabel;
  var _useState = (0, _react.useState)(page.toString()),
    _useState2 = _slicedToArray(_useState, 2),
    val = _useState2[0],
    setVal = _useState2[1];
  (0, _react.useEffect)(function () {
    setVal(page.toString());
  }, [page]);
  var handleBlur = function handleBlur() {
    var p = parseInt(val, 10);
    if (!isNaN(p) && p > 0 && p <= totalPages) {
      onPageChange(p);
    } else {
      setVal(page.toString());
    }
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.DisplayPage, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.InputBase, {
      value: val,
      onChange: function onChange(e) {
        return setVal(e.target.value);
      },
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      sx: {
        width: '30px',
        color: 'inherit',
        fontSize: '14px'
      },
      inputProps: {
        style: {
          textAlign: 'center',
          padding: 0
        },
        'aria-label': ariaLabel
      }
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: {
        fontSize: '14px',
        marginLeft: '4px'
      },
      children: "/ ".concat(totalPages)
    })]
  });
};