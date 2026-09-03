import { useCallback } from 'react';
import {
  buildFileFromBase64,
  isSafeDocumentUri,
  resolveExtension,
  getMimeTypeFromExtension,
} from '../Viewer/FileHelpers';
import { DocumentData, Labels, ViewerCoreState } from '../types';

interface UseFileLoaderProps {
  documentRef: React.MutableRefObject<DocumentData | undefined>;
  labelsRef: React.MutableRefObject<Labels | undefined>;
  onErrorRef: React.MutableRefObject<((error: string) => void) | undefined>;
  setState: React.Dispatch<React.SetStateAction<ViewerCoreState>>;
  resetDocumentState: () => void;
}

export function useFileLoader({
  documentRef,
  labelsRef,
  onErrorRef,
  setState,
  resetDocumentState,
}: UseFileLoaderProps) {

  const getUnsupportedFileMessage = useCallback(
    () => labelsRef.current?.unsupportedFile || labelsRef.current?.error || 'Unsupported file type',
    [labelsRef],
  );

  const setUnsupportedFileError = useCallback(() => {
    const msg = getUnsupportedFileMessage();
    setState(prev => ({ ...prev, error: msg }));
    onErrorRef.current?.(msg);
  }, [getUnsupportedFileMessage, onErrorRef, setState]);

  const applyFileFromBase64 = useCallback((data: string): boolean => {
    const result = buildFileFromBase64(data);
    if (!result) return false;
    setState(prev => ({ ...prev, fileType: result.mime, fileSelected: result.file, error: '' }));
    return true;
  }, [setState]);

  const applyFileFromUrl = useCallback((url: string, fileName?: string): boolean => {
    if (!isSafeDocumentUri(url)) return false;
    const extension = resolveExtension(url, fileName);
    const type = getMimeTypeFromExtension(extension);
    if (!type) return false;
    setState(prev => ({ ...prev, fileType: type, fileSelected: url, error: '' }));
    return true;
  }, [setState]);

  const initData = useCallback(() => {
    const doc = documentRef.current;
    if (!doc) {
      resetDocumentState();
      setState(prev => ({ ...prev, fileType: undefined, fileSelected: null, error: '' }));
      return;
    }
    resetDocumentState();
    if (doc.fileUri) {
      if (doc.fileUri.startsWith('data:')) {
        if (applyFileFromBase64(doc.fileUri)) return;
      } else if (applyFileFromUrl(doc.fileUri, doc.fileName)) return;
    }
    if (doc.fileData && applyFileFromBase64(doc.fileData)) return;
    setUnsupportedFileError();
  }, [documentRef, resetDocumentState, applyFileFromBase64, applyFileFromUrl, setUnsupportedFileError, setState]);

  const handleRetry = useCallback(() => {
    setState(prev => ({ ...prev, error: '' }));
    initData();
  }, [initData, setState]);

  return {
    initData,
    handleRetry,
  };
}
