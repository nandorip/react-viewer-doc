import { useCallback, useRef, type MouseEvent, type PointerEvent, type ReactNode } from 'react';

export interface PanViewerProps {
  zoom: number;
  dx: number;
  dy: number;
  onPan: (x: number, y: number) => void;
  children: ReactNode;
}

const isPrimaryButton = (button: number) => button === 0;

export const PanViewer = ({ zoom, dx, dy, onPan, children }: PanViewerProps) => {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const startDrag = useCallback((clientX: number, clientY: number) => {
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      originX: dx,
      originY: dy,
    };
  }, [dx, dy]);

  const moveDrag = useCallback((clientX: number, clientY: number) => {
    const drag = dragRef.current;
    if (!drag) return;
    onPan(
      drag.originX + (clientX - drag.startX),
      drag.originY + (clientY - drag.startY),
    );
  }, [onPan]);

  const endDrag = useCallback(() => {
    dragRef.current = null;
  }, []);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!isPrimaryButton(event.button)) return;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // jsdom and some older browsers do not implement pointer capture
    }
    startDrag(event.clientX, event.clientY);
  }, [startDrag]);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    moveDrag(event.clientX, event.clientY);
  }, [moveDrag]);

  const onMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!isPrimaryButton(event.button)) return;
    startDrag(event.clientX, event.clientY);
  }, [startDrag]);

  const onMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    moveDrag(event.clientX, event.clientY);
  }, [moveDrag]);

  return (
    <div
      data-testid="pan-viewer"
      data-zoom={zoom}
      data-pandx={dx}
      data-pandy={dy}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      style={{
        userSelect: 'none',
        cursor: 'grab',
        touchAction: 'none',
      }}
    >
      <div
        style={{
          transform: `translate(${dx}px, ${dy}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
