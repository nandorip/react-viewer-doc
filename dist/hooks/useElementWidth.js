"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useElementWidth = void 0;
var _react = require("react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var useElementWidth = exports.useElementWidth = function useElementWidth() {
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    width = _useState2[0],
    setWidth = _useState2[1];
  var elementRef = (0, _react.useRef)(null);
  var observerRef = (0, _react.useRef)(null);
  var setRef = (0, _react.useCallback)(function (node) {
    var _observerRef$current;
    (_observerRef$current = observerRef.current) === null || _observerRef$current === void 0 || _observerRef$current.disconnect();
    observerRef.current = null;
    elementRef.current = node;
    if (!node || typeof ResizeObserver === 'undefined') {
      if (!node) setWidth(0);
      return;
    }
    var updateWidth = function updateWidth() {
      return setWidth(node.clientWidth);
    };
    updateWidth();
    var observer = new ResizeObserver(function () {
      return updateWidth();
    });
    observer.observe(node);
    observerRef.current = observer;
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      var _observerRef$current2;
      return (_observerRef$current2 = observerRef.current) === null || _observerRef$current2 === void 0 ? void 0 : _observerRef$current2.disconnect();
    };
  }, []);
  return {
    ref: setRef,
    width: width,
    element: elementRef
  };
};