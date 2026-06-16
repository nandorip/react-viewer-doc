import { useCallback, useEffect, useRef, useState } from 'react';

export const useElementWidth = <T extends HTMLElement>() => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const setRef = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    elementRef.current = node;

    if (!node || typeof ResizeObserver === 'undefined') {
      if (!node) setWidth(0);
      return;
    }

    const updateWidth = () => setWidth(node.clientWidth);

    updateWidth();
    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref: setRef, width, element: elementRef };
};