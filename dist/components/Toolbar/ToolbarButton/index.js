"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarButton = void 0;
var _react = require("react");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
var ToolbarButton = exports.ToolbarButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var icon = _ref.icon,
    onClick = _ref.onClick,
    ariaLabel = _ref.ariaLabel;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
    ref: ref,
    onClick: onClick,
    "aria-label": ariaLabel,
    sx: {
      minWidth: {
        xs: '34px',
        sm: '40px'
      },
      padding: {
        xs: '4px',
        sm: '6px 8px'
      },
      '& .MuiSvgIcon-root': {
        fontSize: {
          xs: '1.2rem',
          sm: '1.5rem'
        }
      }
    },
    children: icon
  });
});
ToolbarButton.displayName = 'ToolbarButton';