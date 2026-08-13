"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentList = void 0;
var _styles = require("../../styles");
var _jsxRuntime = require("react/jsx-runtime");
var DocumentList = exports.DocumentList = function DocumentList(_ref) {
  var documents = _ref.documents,
    activeIndex = _ref.activeIndex,
    onSelect = _ref.onSelect,
    labels = _ref.labels,
    _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? 'light' : _ref$theme;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.DocumentListContainer, {
    theme: theme,
    "data-testid": "document-list",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DocumentListHeader, {
      theme: theme,
      children: (labels === null || labels === void 0 ? void 0 : labels.documents) || 'Documents'
    }), documents.map(function (doc, index) {
      var _doc$id;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.DocumentListItem, {
        type: "button",
        active: index === activeIndex,
        theme: theme,
        onClick: function onClick() {
          return onSelect(index);
        },
        "aria-label": doc.fileName,
        "aria-current": index === activeIndex ? 'true' : undefined,
        children: doc.fileName
      }, (_doc$id = doc.id) !== null && _doc$id !== void 0 ? _doc$id : "".concat(doc.fileName, "-").concat(index));
    })]
  });
};