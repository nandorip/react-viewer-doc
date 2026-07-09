import { useCallback, useEffect, useState } from 'react';
import { DocumentData } from '../types';

export interface UseDocumentListOptions {
  documents: DocumentData[];
  documentIndex?: number;
  defaultDocumentIndex?: number;
  onDocumentChange?: (index: number, document: DocumentData) => void;
}

export interface UseDocumentListResult {
  activeIndex: number;
  activeDocument: DocumentData | undefined;
  hasMultiple: boolean;
  setDocumentIndex: (index: number) => void;
  nextDocument: () => void;
  prevDocument: () => void;
}

const clampIndex = (index: number, length: number) => {
  if (length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
};

export function useDocumentList({
  documents,
  documentIndex,
  defaultDocumentIndex = 0,
  onDocumentChange,
}: UseDocumentListOptions): UseDocumentListResult {
  const isControlled = documentIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(() =>
    clampIndex(defaultDocumentIndex, documents.length),
  );

  useEffect(() => {
    if (!isControlled) {
      setInternalIndex((prev) => clampIndex(prev, documents.length));
    }
  }, [documents.length, isControlled]);

  const activeIndex = clampIndex(
    isControlled ? documentIndex : internalIndex,
    documents.length,
  );

  const setDocumentIndex = useCallback((index: number) => {
    const nextIndex = clampIndex(index, documents.length);
    if (documents.length === 0) return;

    if (!isControlled) {
      setInternalIndex(nextIndex);
    }

    const nextDocument = documents[nextIndex];
    if (nextDocument) {
      onDocumentChange?.(nextIndex, nextDocument);
    }
  }, [documents, isControlled, onDocumentChange]);

  const nextDocument = useCallback(() => {
    if (activeIndex < documents.length - 1) {
      setDocumentIndex(activeIndex + 1);
    }
  }, [activeIndex, documents.length, setDocumentIndex]);

  const prevDocument = useCallback(() => {
    if (activeIndex > 0) {
      setDocumentIndex(activeIndex - 1);
    }
  }, [activeIndex, setDocumentIndex]);

  return {
    activeIndex,
    activeDocument: documents[activeIndex],
    hasMultiple: documents.length > 1,
    setDocumentIndex,
    nextDocument,
    prevDocument,
  };
}