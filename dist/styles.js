"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewerWithDocumentList = exports.ToolbarFooter = exports.ToolbarContainer = exports.ThumbnailPlaceholder = exports.ThumbnailItem = exports.SidebarContainer = exports.SelectContainer = exports.PdfViewerRoot = exports.MainContent = exports.LoadingMessage = exports.ImageContainer = exports.DocumentListItem = exports.DocumentListHeader = exports.DocumentListContainer = exports.DocumentContainer = exports.DisplayPage = exports.DisplayDocument = exports.ContainerDiv = exports.ButtonContainer = void 0;
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _theme = require("./theme");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject0, _templateObject1, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var MOBILE = '@media (max-width: 768px)';
var SMALL = '@media (max-width: 480px)';
var resolveViewerHeight = function resolveViewerHeight(height) {
  if (typeof height === 'number') return "".concat(height, "px");
  if (height) return height;
  return 'clamp(280px, 60vh, 600px)';
};
var ContainerDiv = exports.ContainerDiv = _styled["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 12px;\n  height: 100%;\n  width: 100%;\n  min-width: 0;\n  overflow: hidden;\n  color-scheme: ", ";\n\n  ", " {\n    border-radius: 8px;\n  }\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).containerBg;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).containerBorder;
}, function (props) {
  return props.theme === 'dark' ? 'dark' : 'light';
}, SMALL);
var MainContent = exports.MainContent = _styled["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n  min-height: 0;\n  min-width: 0;\n"])));
var PdfViewerRoot = exports.PdfViewerRoot = _styled["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  min-height: 0;\n  min-width: 0;\n\n  .react-pdf__Document {\n    display: flex;\n    flex: 1;\n    position: relative;\n    overflow: hidden;\n    width: 100%;\n    min-height: 0;\n    min-width: 0;\n  }\n\n  ", " {\n    .react-pdf__Document {\n      flex-direction: column;\n    }\n  }\n"])), MOBILE);
var SidebarContainer = exports.SidebarContainer = _styled["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  flex: 0 0 auto;\n  width: ", ";\n  transition: width 0.3s ease, max-height 0.3s ease;\n  background-color: ", ";\n  border-right: 1px solid ", ";\n  overflow-y: auto;\n  overflow-x: hidden;\n\n  ", " {\n    width: 100%;\n    max-height: ", ";\n    border-right: none;\n    border-bottom: ", ";\n    display: flex;\n    flex-direction: row;\n    overflow-x: auto;\n    overflow-y: hidden;\n  }\n"])), function (props) {
  return props.visible ? '200px' : '0';
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBg;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBorder;
}, MOBILE, function (props) {
  return props.visible ? '132px' : '0';
}, function (props) {
  return props.visible ? "1px solid ".concat((0, _theme.resolveThemeTokens)(props.theme).sidebarBorder) : 'none';
});
var ThumbnailItem = exports.ThumbnailItem = _styled["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  padding: 8px;\n  cursor: pointer;\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  color: ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  canvas {\n    max-width: 100% !important;\n    height: auto !important;\n    box-shadow: 0 2px 4px ", ";\n  }\n\n  ", " {\n    min-width: 88px;\n    padding: 6px;\n    border-bottom: none;\n    border-right: 1px solid ", ";\n  }\n"])), function (props) {
  return props.active ? (0, _theme.resolveThemeTokens)(props.theme).thumbnailActive : 'transparent';
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBorder;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).thumbnailHover;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).shadow;
}, MOBILE, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBorder;
});
var ThumbnailPlaceholder = exports.ThumbnailPlaceholder = _styled["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: ", ";\n  color: ", ";\n  font-size: 11px;\n  border-radius: 4px;\n  min-height: 96px;\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).loadingPlaceholder;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
});
var ToolbarContainer = exports.ToolbarContainer = _styled["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-top-right-radius: 12px;\n  border-top-left-radius: 12px;\n  padding: 4px 8px;\n  background-color: ", ";\n  min-height: 40px;\n  width: 100%;\n  min-width: 0;\n  text-align: center;\n  overflow-x: auto;\n  overflow-y: hidden;\n  -webkit-overflow-scrolling: touch;\n\n  ", " {\n    align-items: flex-start;\n    padding: 6px 4px;\n    border-top-right-radius: 8px;\n    border-top-left-radius: 8px;\n  }\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).toolbarBg;
}, MOBILE);
var ToolbarFooter = exports.ToolbarFooter = _styled["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  width: 100%;\n  text-align: center;\n"])));
var SelectContainer = exports.SelectContainer = _styled["default"].div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  width: 40%;\n"])));
var ButtonContainer = exports.ButtonContainer = _styled["default"].div(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  gap: 16px;\n"])));
var DocumentContainer = exports.DocumentContainer = _styled["default"].div(_templateObject1 || (_templateObject1 = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 1;\n  justify-content: center;\n  align-items: flex-start;\n  width: 100%;\n  min-width: 0;\n  min-height: 240px;\n  height: ", ";\n  padding: 16px;\n  overflow: auto;\n  background-color: ", ";\n  border-radius: 0 0 12px 12px;\n  -webkit-overflow-scrolling: touch;\n  color: ", ";\n\n  canvas {\n    height: auto !important;\n    box-shadow: 0 4px 8px ", ";\n    margin-bottom: 16px;\n  }\n\n  ", " {\n    padding: 8px;\n    border-radius: 0 0 8px 8px;\n    height: ", ";\n  }\n"])), function (props) {
  return resolveViewerHeight(props.height);
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).pdfViewerBg;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).pdfShadow;
}, MOBILE, function (props) {
  if (typeof props.height === 'number') {
    return "min(".concat(props.height, "px, 55vh)");
  }
  if (props.height) {
    return "min(".concat(props.height, ", 55vh)");
  }
  return 'clamp(240px, 55vh, 600px)';
});
var ImageContainer = exports.ImageContainer = _styled["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 1;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  min-width: 0;\n  min-height: 240px;\n  height: ", ";\n  padding: 16px;\n  overflow: hidden;\n  border-radius: 0 0 12px 12px;\n  background-color: ", ";\n  color: ", ";\n\n  img {\n    max-width: 100%;\n    max-height: 100%;\n    width: auto;\n    height: auto;\n    object-fit: contain;\n    transition: transform 0.3s ease;\n    transform: rotate(", "deg);\n    box-shadow: 0 4px 8px ", ";\n  }\n\n  ", " {\n    padding: 8px;\n    border-radius: 0 0 8px 8px;\n    height: ", ";\n  }\n"])), function (props) {
  return resolveViewerHeight(props.height);
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).imageViewerBg;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
}, function (props) {
  return props.rotation;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).shadow;
}, MOBILE, function (props) {
  if (typeof props.height === 'number') {
    return "min(".concat(props.height, "px, 55vh)");
  }
  if (props.height) {
    return "min(".concat(props.height, ", 55vh)");
  }
  return 'clamp(240px, 55vh, 600px)';
});
var DisplayPage = exports.DisplayPage = _styled["default"].div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  border-radius: 8px;\n  padding: 4px;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  color: ", ";\n  background-color: ", ";\n  opacity: 0.9;\n  white-space: nowrap;\n\n  ", " {\n    padding: 2px 4px;\n    font-size: 12px;\n  }\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).pageIndicatorColor;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).pageIndicatorBg;
}, SMALL);
var LoadingMessage = exports.LoadingMessage = _styled["default"].div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  min-height: 120px;\n  color: ", ";\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
});
var ViewerWithDocumentList = exports.ViewerWithDocumentList = _styled["default"].div(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  min-width: 0;\n  overflow: hidden;\n"])));
var DocumentListContainer = exports.DocumentListContainer = _styled["default"].div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  flex: 0 0 220px;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  border-right: 1px solid ", ";\n  overflow-y: auto;\n  overflow-x: hidden;\n\n  ", " {\n    flex: 0 0 160px;\n  }\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBg;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBorder;
}, MOBILE);
var DocumentListHeader = exports.DocumentListHeader = _styled["default"].div(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  padding: 10px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: ", ";\n  border-bottom: 1px solid ", ";\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBorder;
});
var DocumentListItem = exports.DocumentListItem = _styled["default"].button(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  display: block;\n  width: 100%;\n  padding: 10px 12px;\n  border: none;\n  border-bottom: 1px solid ", ";\n  background-color: ", ";\n  color: ", ";\n  text-align: left;\n  cursor: pointer;\n  font-size: 13px;\n  line-height: 1.35;\n  word-break: break-word;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).sidebarBorder;
}, function (props) {
  return props.active ? (0, _theme.resolveThemeTokens)(props.theme).thumbnailActive : 'transparent';
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
}, function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).thumbnailHover;
});
var DisplayDocument = exports.DisplayDocument = _styled["default"].div(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: ", ";\n  font-size: 13px;\n  max-width: 180px;\n\n  span:first-of-type {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 120px;\n  }\n"])), function (props) {
  return (0, _theme.resolveThemeTokens)(props.theme).textMuted;
});