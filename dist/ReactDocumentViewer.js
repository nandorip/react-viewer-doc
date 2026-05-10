"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactDocumentViewer = void 0;
var _components = require("./components");
var _Viewer = require("./Viewer");
var _jsxRuntime = require("react/jsx-runtime");
var ReactDocumentViewer = exports.ReactDocumentViewer = function ReactDocumentViewer(_ref) {
  var document = _ref.document,
    extraToolbar = _ref.extraToolbar,
    height = _ref.height;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Container, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Viewer.Viewer, {
      document: document,
      extraToolbar: extraToolbar,
      height: height
    })
  });
};