"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = void 0;
var _styles = require("../../styles");
var _jsxRuntime = require("react/jsx-runtime");
var Container = exports.Container = function Container(_ref) {
  var children = _ref.children,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ContainerDiv, {
    theme: theme,
    children: children
  });
};