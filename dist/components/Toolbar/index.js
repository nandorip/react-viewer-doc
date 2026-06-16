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
var _i18n = require("../../i18n");
var _jsxRuntime = require("react/jsx-runtime");
var Toolbar = exports.Toolbar = function Toolbar(_ref) {
  var onZoomIn = _ref.onZoomIn,
    onZoomOut = _ref.onZoomOut,
    onRotate = _ref.onRotate,
    onReset = _ref.onReset,
    onNextChange = _ref.onNextChange,
    onPrevPage = _ref.onPrevPage,
    onPageChange = _ref.onPageChange,
    onNewPage = _ref.onNewPage,
    onDownload = _ref.onDownload,
    onPrint = _ref.onPrint,
    onFullscreen = _ref.onFullscreen,
    onToggleSidebar = _ref.onToggleSidebar,
    hideZoom = _ref.hideZoom,
    hideRotate = _ref.hideRotate,
    hideReset = _ref.hideReset,
    hideMovePage = _ref.hideMovePage,
    pdfPages = _ref.pdfPages,
    pdfPage = _ref.pdfPage,
    showSidebar = _ref.showSidebar,
    extra = _ref.extra,
    labels = _ref.labels;
  var resolvedLabels = labels !== null && labels !== void 0 ? labels : (0, _i18n.resolveLabels)(_i18n.DEFAULT_LOCALE);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ToolbarContainer, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
      container: true,
      spacing: 1,
      sx: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: [onToggleSidebar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.thumbnails,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ViewList, {
                color: showSidebar ? 'primary' : 'inherit'
              }),
              onClick: onToggleSidebar
            })
          })
        })
      }), extra && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: extra
      }), !hideZoom && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.zoomIn,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
                icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Add, {}),
                onClick: onZoomIn
              })
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.zoomOut,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
                icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Remove, {}),
                onClick: onZoomOut
              })
            })
          })
        })]
      }), !hideRotate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.rotate,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Refresh, {}),
              onClick: onRotate
            })
          })
        })
      }), !hideReset && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.reset,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.SettingsBackupRestore, {}),
              onClick: onReset
            })
          })
        })
      }), !hideMovePage && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.prevPage,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
                icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronLeft, {}),
                onClick: onPrevPage
              })
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DisplayPageNumber.DisplayPageNumber, {
            totalPages: pdfPages,
            page: pdfPage,
            onPageChange: onPageChange,
            ariaLabel: resolvedLabels.currentPage
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.nextPage,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
                icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronRight, {}),
                onClick: onNextChange
              })
            })
          })
        })]
      }), onDownload && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.download,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Download, {}),
              onClick: onDownload
            })
          })
        })
      }), onPrint && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.print,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Print, {}),
              onClick: onPrint
            })
          })
        })
      }), onNewPage && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.openInNew,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.OpenInNew, {}),
              onClick: onNewPage
            })
          })
        })
      }), onFullscreen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.fullscreen,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Fullscreen, {}),
              onClick: onFullscreen
            })
          })
        })
      })]
    })
  });
};