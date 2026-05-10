"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;
var _material = require("@mui/material");
var _iconsMaterial = require("@mui/icons-material");
var _styles = require("../../styles");
var _ToolbarButton = require("./ToolbarButton");
var _DisplayPageNumber = require("./DisplayPageNumber");
var _jsxRuntime = require("react/jsx-runtime");
var Toolbar = exports.Toolbar = function Toolbar(_ref) {
  var onZoomIn = _ref.onZoomIn,
    onZoomOut = _ref.onZoomOut,
    onRotate = _ref.onRotate,
    onReset = _ref.onReset,
    onNextChange = _ref.onNextChange,
    onPrevPage = _ref.onPrevPage,
    onNewPage = _ref.onNewPage,
    hideZoom = _ref.hideZoom,
    hideRotate = _ref.hideRotate,
    hideReset = _ref.hideReset,
    hideMovePage = _ref.hideMovePage,
    pdfPages = _ref.pdfPages,
    pdfPage = _ref.pdfPage,
    extra = _ref.extra;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ToolbarContainer, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
      container: true,
      spacing: 1,
      sx: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: [extra && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: extra
      }), !hideZoom && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Add, {}),
            onClick: onZoomIn
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Remove, {}),
            onClick: onZoomOut
          })
        })]
      }), !hideRotate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Refresh, {}),
          onClick: onRotate
        })
      }), !hideReset && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Fullscreen, {}),
          onClick: onReset
        })
      }), !hideMovePage && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronLeft, {}),
            onClick: onPrevPage
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DisplayPageNumber.DisplayPageNumber, {
            totalPages: pdfPages,
            page: pdfPage
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronRight, {}),
            onClick: onNextChange
          })
        })]
      }), onNewPage && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
          icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.OpenInNew, {}),
          onClick: onNewPage
        })
      })]
    })
  });
};