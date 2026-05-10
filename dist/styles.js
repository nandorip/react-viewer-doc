"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarFooter = exports.ToolbarContainer = exports.SelectContainer = exports.ImageContainer = exports.DocumentContainer = exports.DisplayPage = exports.ContainerDiv = exports.ButtonContainer = void 0;
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ContainerDiv = exports.ContainerDiv = _styled["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: #f5f5f5;\n  border: 1px solid #e0e0e0;\n  border-radius: 12px;\n  height: 100%;\n  width: 100%;\n  gap: 8px;\n  text-align: center;\n"])));
var ToolbarContainer = exports.ToolbarContainer = _styled["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-top-right-radius: 12px;\n  border-top-left-radius: 12px;\n  padding: 0 8px;\n  background-color: white;\n  height: 40px;\n  width: 100%;\n  text-align: center;\n"])));
var ToolbarFooter = exports.ToolbarFooter = _styled["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  width: 100%;\n  text-align: center;\n"])));
var SelectContainer = exports.SelectContainer = _styled["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 40%;\n"])));
var ButtonContainer = exports.ButtonContainer = _styled["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  gap: 16px;\n"])));
var DocumentContainer = exports.DocumentContainer = _styled["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  height: ", ";\n  padding: 16px;\n  overflow: auto;\n  background-color: #525659;\n  border-radius: 0 0 12px 12px;\n\n  canvas {\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    margin-bottom: 16px;\n  }\n"])), function (props) {
  return typeof props.height === 'number' ? "".concat(props.height, "px") : props.height || '600px';
});
var ImageContainer = exports.ImageContainer = _styled["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  max-width: 100%;\n  height: ", ";\n  padding: 16px;\n  overflow: hidden;\n  border-radius: 0 0 12px 12px;\n  background-color: #f5f5f5;\n\n  img {\n    max-width: 100%;\n    max-height: 100%;\n    transition: transform 0.3s ease;\n    transform: rotate(", "deg) scale(", ");\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n  }\n"])), function (props) {
  return typeof props.height === 'number' ? "".concat(props.height, "px") : props.height || '600px';
}, function (props) {
  return props.rotation;
}, function (props) {
  return props.zoom;
});
var DisplayPage = exports.DisplayPage = _styled["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  border-radius: 8px;\n  padding: 4px;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n  color: #663c00;\n  background-color: #fff4e5;\n  opacity: 0.7;\n"])));