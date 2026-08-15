"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanViewer = void 0;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var isPrimaryButton = function isPrimaryButton(button) {
  return button === 0;
};
var PanViewer = exports.PanViewer = function PanViewer(_ref) {
  var zoom = _ref.zoom,
    dx = _ref.dx,
    dy = _ref.dy,
    onPan = _ref.onPan,
    children = _ref.children;
  var dragRef = (0, _react.useRef)(null);
  var startDrag = (0, _react.useCallback)(function (clientX, clientY) {
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      originX: dx,
      originY: dy
    };
  }, [dx, dy]);
  var moveDrag = (0, _react.useCallback)(function (clientX, clientY) {
    var drag = dragRef.current;
    if (!drag) return;
    onPan(drag.originX + (clientX - drag.startX), drag.originY + (clientY - drag.startY));
  }, [onPan]);
  var endDrag = (0, _react.useCallback)(function () {
    dragRef.current = null;
  }, []);
  var onPointerDown = (0, _react.useCallback)(function (event) {
    if (!isPrimaryButton(event.button)) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch (_unused) {
      // jsdom and some older browsers do not implement pointer capture
    }
    startDrag(event.clientX, event.clientY);
  }, [startDrag]);
  var onPointerMove = (0, _react.useCallback)(function (event) {
    moveDrag(event.clientX, event.clientY);
  }, [moveDrag]);
  var onMouseDown = (0, _react.useCallback)(function (event) {
    if (!isPrimaryButton(event.button)) return;
    startDrag(event.clientX, event.clientY);
  }, [startDrag]);
  var onMouseMove = (0, _react.useCallback)(function (event) {
    moveDrag(event.clientX, event.clientY);
  }, [moveDrag]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "data-testid": "pan-viewer",
    "data-zoom": zoom,
    "data-pandx": dx,
    "data-pandy": dy,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
    style: {
      userSelect: 'none',
      cursor: 'grab',
      touchAction: 'none'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        transform: "translate(".concat(dx, "px, ").concat(dy, "px) scale(").concat(zoom, ")"),
        transformOrigin: 'center center'
      },
      children: children
    })
  });
};