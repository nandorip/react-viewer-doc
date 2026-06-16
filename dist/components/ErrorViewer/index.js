"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorViewer = void 0;
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
var ErrorViewer = exports.ErrorViewer = function ErrorViewer(_ref) {
  var message = _ref.message,
    onRetry = _ref.onRetry,
    _ref$retryLabel = _ref.retryLabel,
    retryLabel = _ref$retryLabel === void 0 ? 'Retry' : _ref$retryLabel;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Box, {
    sx: {
      p: 2
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Alert, {
      severity: "error",
      action: onRetry ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
        color: "inherit",
        size: "small",
        onClick: onRetry,
        children: retryLabel
      }) : undefined,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
        variant: "body2",
        children: message
      })
    })
  });
};