"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayDocumentIndex = void 0;
var _styles = require("../../../styles");
var _jsxRuntime = require("react/jsx-runtime");
var DisplayDocumentIndex = exports.DisplayDocumentIndex = function DisplayDocumentIndex(_ref) {
  var index = _ref.index,
    total = _ref.total,
    fileName = _ref.fileName,
    _ref$ariaLabel = _ref.ariaLabel,
    ariaLabel = _ref$ariaLabel === void 0 ? 'Current document' : _ref$ariaLabel,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.DisplayDocument, {
    theme: theme,
    "aria-label": ariaLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      title: fileName,
      children: fileName
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      children: "(".concat(index + 1, " / ").concat(total, ")")
    })]
  });
};