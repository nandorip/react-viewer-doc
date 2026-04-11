"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayPageNumber = void 0;
var _styles = require("../../../styles");
var _jsxRuntime = require("react/jsx-runtime");
var DisplayPageNumber = exports.DisplayPageNumber = function DisplayPageNumber(_ref) {
  var totalPages = _ref.totalPages,
    page = _ref.page;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DisplayPage, {
    children: "".concat(page, " / ").concat(totalPages)
  });
};