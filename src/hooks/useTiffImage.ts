import { useEffect, useRef, useState } from 'react';
import { decodeTiff } from '../Viewer/TiffHelpers';

interface UseTiffImageOptions {
  source: Blob | string | null;
  pageNumber: number;
  onLoad?: () => void;
  onError?: (message: string) => void;
}

export const useTiffImage = ({
  source,
  pageNumber,
  onLoad,
  onError,
}: UseTiffImageOptions) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const decodedRef = useRef<Awaited<ReturnType<typeof decodeTiff>>>(null);
  const objectUrlRef = useRef<string | null>(null);

  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;

    const revokeObjectUrl = () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };

    const loadTiff = async () => {
      revokeObjectUrl();
      setImageUrl(undefined);
      setPageCount(0);
      decodedRef.current = null;

      if (!source) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const decoded = await decodeTiff(source);
      if (cancelled) return;

      if (!decoded) {
        setLoading(false);
        onErrorRef.current?.('Unable to decode TIFF image');
        return;
      }

      decodedRef.current = decoded;
      setPageCount(decoded.pageCount);

      const safePage = Math.min(Math.max(pageNumber, 1), decoded.pageCount);
      const pngBlob = await decoded.renderPage(safePage - 1);
      if (cancelled) return;

      if (!pngBlob) {
        setLoading(false);
        onErrorRef.current?.('Unable to render TIFF page');
        return;
      }

      const url = URL.createObjectURL(pngBlob);
      objectUrlRef.current = url;
      setImageUrl(url);
      setLoading(false);
      onLoadRef.current?.();
    };

    loadTiff();

    return () => {
      cancelled = true;
      revokeObjectUrl();
    };
  }, [source]);

  useEffect(() => {
    let cancelled = false;

    const renderPage = async () => {
      const decoded = decodedRef.current;
      if (!decoded || !source) return;

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }

      setLoading(true);
      const safePage = Math.min(Math.max(pageNumber, 1), decoded.pageCount);
      const pngBlob = await decoded.renderPage(safePage - 1);
      if (cancelled) return;

      if (!pngBlob) {
        setLoading(false);
        onErrorRef.current?.('Unable to render TIFF page');
        return;
      }

      const url = URL.createObjectURL(pngBlob);
      objectUrlRef.current = url;
      setImageUrl(url);
      setLoading(false);
    };

    if (decodedRef.current) {
      renderPage();
    }

    return () => {
      cancelled = true;
    };
  }, [pageNumber, source]);

  return { imageUrl, pageCount, loading };
};