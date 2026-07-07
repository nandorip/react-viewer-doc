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
    labels = _ref.labels,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme,
    toolbarActions = _ref.toolbarActions;
  var resolvedLabels = labels !== null && labels !== void 0 ? labels : (0, _i18n.resolveLabels)(_i18n.DEFAULT_LOCALE);
  var resolvedExtra = typeof extra === 'function' ? extra(toolbarActions) : extra;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.ToolbarContainer, {
    theme: theme,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Grid, {
      container: true,
      spacing: {
        xs: 0.25,
        sm: 1
      },
      sx: {
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        rowGap: {
          xs: 0.25,
          sm: 0.5
        },
        width: '100%',
        maxWidth: '100%'
      },
      children: [onToggleSidebar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.thumbnails,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ViewList, {
              color: showSidebar ? 'primary' : 'inherit'
            }),
            onClick: onToggleSidebar,
            ariaLabel: resolvedLabels.thumbnails
          })
        })
      }), resolvedExtra && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: resolvedExtra
      }), !hideZoom && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.zoomIn,
            describeChild: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Add, {}),
              onClick: onZoomIn,
              ariaLabel: resolvedLabels.zoomIn
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.zoomOut,
            describeChild: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Remove, {}),
              onClick: onZoomOut,
              ariaLabel: resolvedLabels.zoomOut
            })
          })
        })]
      }), !hideRotate && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.rotate,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Refresh, {}),
            onClick: onRotate,
            ariaLabel: resolvedLabels.rotate
          })
        })
      }), !hideReset && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.reset,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.SettingsBackupRestore, {}),
            onClick: onReset,
            ariaLabel: resolvedLabels.reset
          })
        })
      }), !hideMovePage && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.prevPage,
            describeChild: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronLeft, {}),
              onClick: onPrevPage,
              ariaLabel: resolvedLabels.prevPage
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DisplayPageNumber.DisplayPageNumber, {
            totalPages: pdfPages,
            page: pdfPage,
            onPageChange: onPageChange,
            ariaLabel: resolvedLabels.currentPage,
            theme: theme
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
            title: resolvedLabels.nextPage,
            describeChild: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
              icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.ChevronRight, {}),
              onClick: onNextChange,
              ariaLabel: resolvedLabels.nextPage
            })
          })
        })]
      }), onDownload && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.download,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Download, {}),
            onClick: onDownload,
            ariaLabel: resolvedLabels.download
          })
        })
      }), onPrint && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.print,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Print, {}),
            onClick: onPrint,
            ariaLabel: resolvedLabels.print
          })
        })
      }), onNewPage && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.openInNew,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.OpenInNew, {}),
            onClick: onNewPage,
            ariaLabel: resolvedLabels.openInNew
          })
        })
      }), onFullscreen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Grid, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Tooltip, {
          title: resolvedLabels.fullscreen,
          describeChild: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButton.ToolbarButton, {
            icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_iconsMaterial.Fullscreen, {}),
            onClick: onFullscreen,
            ariaLabel: resolvedLabels.fullscreen
          })
        })
      })]
    })
  });
};