"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarButton = void 0;
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
var ToolbarButton = exports.ToolbarButton = function ToolbarButton(_ref) {
  var icon = _ref.icon,
    onClick = _ref.onClick;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
    onClick: onClick,
    sx: {
      minWidth: '40px'
    },
    children: icon
  });
};