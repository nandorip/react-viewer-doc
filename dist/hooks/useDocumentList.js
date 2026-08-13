"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDocumentList = useDocumentList;
var _react = require("react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var clampIndex = function clampIndex(index, length) {
  if (length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
};
function useDocumentList(_ref) {
  var documents = _ref.documents,
    documentIndex = _ref.documentIndex,
    _ref$defaultDocumentI = _ref.defaultDocumentIndex,
    defaultDocumentIndex = _ref$defaultDocumentI === void 0 ? 0 : _ref$defaultDocumentI,
    onDocumentChange = _ref.onDocumentChange;
  var isControlled = documentIndex !== undefined;
  var _useState = (0, _react.useState)(function () {
      return clampIndex(defaultDocumentIndex, documents.length);
    }),
    _useState2 = _slicedToArray(_useState, 2),
    internalIndex = _useState2[0],
    setInternalIndex = _useState2[1];
  (0, _react.useEffect)(function () {
    if (!isControlled) {
      setInternalIndex(function (prev) {
        return clampIndex(prev, documents.length);
      });
    }
  }, [documents.length, isControlled]);
  var activeIndex = clampIndex(isControlled ? documentIndex : internalIndex, documents.length);
  var setDocumentIndex = (0, _react.useCallback)(function (index) {
    var nextIndex = clampIndex(index, documents.length);
    if (documents.length === 0) return;
    if (!isControlled) {
      setInternalIndex(nextIndex);
    }
    var nextDocument = documents[nextIndex];
    if (nextDocument) {
      onDocumentChange === null || onDocumentChange === void 0 || onDocumentChange(nextIndex, nextDocument);
    }
  }, [documents, isControlled, onDocumentChange]);
  var nextDocument = (0, _react.useCallback)(function () {
    if (activeIndex < documents.length - 1) {
      setDocumentIndex(activeIndex + 1);
    }
  }, [activeIndex, documents.length, setDocumentIndex]);
  var prevDocument = (0, _react.useCallback)(function () {
    if (activeIndex > 0) {
      setDocumentIndex(activeIndex - 1);
    }
  }, [activeIndex, setDocumentIndex]);
  return {
    activeIndex: activeIndex,
    activeDocument: documents[activeIndex],
    hasMultiple: documents.length > 1,
    setDocumentIndex: setDocumentIndex,
    nextDocument: nextDocument,
    prevDocument: prevDocument
  };
}