import { useEffect, useRef, useState } from 'react';
import { decodeTiff, type DecodedTiff } from '../Viewer/TiffHelpers';

interface UseTiffImageOptions {
  source: Blob | string | null;
  pageNumber: number;
  reloadKey?: number;
  onLoad?: () => void;
  onError?: (message: string) => void;
}

interface TiffSession {
  source: Blob | string;
  reloadKey: number;
  decoded: DecodedTiff;
}

export const useTiffImage = ({
  source,
  pageNumber,
  reloadKey = 0,
  onLoad,
  onError,
}: UseTiffImageOptions) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<TiffSession | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const loadedRef = useRef(false);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const revokeObjectUrl = () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    };

    revokeObjectUrl();
    setImageUrl(undefined);
    setPageCount(0);
    setSession(null);
    loadedRef.current = false;
    setLoading(Boolean(source));

    if (source) {
      const load = async () => {
        try {
          const decoded = await decodeTiff(source, controller.signal);
          if (cancelled) return;
          if (!decoded) throw new Error('Unable to decode TIFF image');
          setPageCount(decoded.pageCount);
          setSession({ source, reloadKey, decoded });
        } catch {
          if (cancelled) return;
          setLoading(false);
          onErrorRef.current?.('Unable to decode TIFF image');
        }
      };
      void load();
    }

    return () => {
      cancelled = true;
      controller.abort();
      revokeObjectUrl();
    };
  }, [source, reloadKey]);

  useEffect(() => {
    // Only this effect renders pages. Changing a page or source cancels its result.
    if (!session || session.source !== source || session.reloadKey !== reloadKey) return;
    let cancelled = false;
    const render = async () => {
      setLoading(true);
      try {
        const requestedPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
        const safePage = Math.min(requestedPage, session.decoded.pageCount);
        const pngBlob = await session.decoded.renderPage(safePage - 1);
        if (cancelled) return;
        if (!pngBlob) throw new Error('Unable to render TIFF page');

        const url = URL.createObjectURL(pngBlob);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = url;
        setImageUrl(url);
        setLoading(false);
        if (!loadedRef.current) {
          loadedRef.current = true;
          onLoadRef.current?.();
        }
      } catch {
        if (cancelled) return;
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
        setImageUrl(undefined);
        setLoading(false);
        onErrorRef.current?.('Unable to render TIFF page');
      }
    };
    void render();
    return () => { cancelled = true; };
  }, [session, pageNumber, source, reloadKey]);

  return { imageUrl, pageCount, loading };
};
