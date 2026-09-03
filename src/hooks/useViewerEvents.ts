import { useCallback, useRef, useEffect } from 'react';
import { ViewerCoreState } from '../types';

const ZOOM_SENSITIVITY = 0.1;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.5;

const limits = (num: number) => Math.min(Math.max(num, MIN_ZOOM), MAX_ZOOM);

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
};

interface UseViewerEventsProps {
  zoomRef: React.MutableRefObject<number>;
  pageNumberRef: React.MutableRefObject<number>;
  totalPagesRef: React.MutableRefObject<number>;
  supportsPaginationRef: React.MutableRefObject<boolean>;
  setState: React.Dispatch<React.SetStateAction<ViewerCoreState>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  measureContainerRef: (element: HTMLDivElement | null) => void;
}

export function useViewerEvents({
  zoomRef,
  pageNumberRef,
  totalPagesRef,
  supportsPaginationRef,
  setState,
  containerRef,
  measureContainerRef,
}: UseViewerEventsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const removeWheelListenerRef = useRef<(() => void) | null>(null);
  const removeKeyListenerRef = useRef<(() => void) | null>(null);

  const attachContainerRef = useCallback((element: HTMLDivElement | null) => {
    removeWheelListenerRef.current?.();
    removeWheelListenerRef.current = null;
    (containerRef as any).current = element;

    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const nextZoom = e.deltaY < 0
        ? zoomRef.current + ZOOM_SENSITIVITY
        : zoomRef.current - ZOOM_SENSITIVITY;
      setState(prev => ({ ...prev, zoom: limits(nextZoom) }));
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    removeWheelListenerRef.current = () => element.removeEventListener('wheel', handleWheel);
  }, [containerRef, setState, zoomRef]);

  const attachViewerContainerRef = useCallback((element: HTMLDivElement | null) => {
    attachContainerRef(element);
    measureContainerRef(element);
  }, [attachContainerRef, measureContainerRef]);

  const attachViewerRootRef = useCallback((element: HTMLDivElement | null) => {
    removeKeyListenerRef.current?.();
    removeKeyListenerRef.current = null;
    rootRef.current = element;

    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      if (e.ctrlKey) {
        if (e.key === '+' || e.key === '=') {
          e.preventDefault();
          setState(prev => ({ ...prev, zoom: limits(prev.zoom + ZOOM_SENSITIVITY) }));
        } else if (e.key === '-') {
          e.preventDefault();
          setState(prev => ({ ...prev, zoom: limits(prev.zoom - ZOOM_SENSITIVITY) }));
        }
      }

      if (supportsPaginationRef.current) {
        if (e.key === 'ArrowRight' && pageNumberRef.current < totalPagesRef.current) {
          e.preventDefault();
          setState(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
        }
        if (e.key === 'ArrowLeft' && pageNumberRef.current > 1) {
          e.preventDefault();
          setState(prev => ({ ...prev, pageNumber: prev.pageNumber - 1 }));
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    removeKeyListenerRef.current = () => element.removeEventListener('keydown', handleKeyDown);
  }, [setState, supportsPaginationRef, pageNumberRef, totalPagesRef]);

  const toggleFullscreen = useCallback(() => {
    const target = rootRef.current ?? containerRef.current;
    if (!target) return;

    const active = globalThis.document.fullscreenElement;
    if (active && (active === target || target.contains(active))) {
      void globalThis.document.exitFullscreen?.();
      return;
    }

    void target.requestFullscreen?.();
  }, [containerRef]);

  useEffect(() => () => {
    removeWheelListenerRef.current?.();
    removeKeyListenerRef.current?.();
  }, []);

  return {
    rootRef,
    attachViewerContainerRef,
    attachViewerRootRef,
    toggleFullscreen,
  };
}
