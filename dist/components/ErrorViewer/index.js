"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorViewer = void 0;
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
var ErrorViewer = exports.ErrorViewer = function ErrorViewer(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
    sx: {
      p: 2
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Alert, {
      severity: "error",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
        variant: "body2",
        children: message
      })
    })
  });
};