import { useCallback } from 'react';
import {
  FileTypes,
  resolveOpenableUrl,
  revokeBlobUrlWhenClosed,
  downloadFile,
  resolveDownloadFileName,
} from '../Viewer/FileHelpers';
import { isTiffMime } from '../Viewer/TiffHelpers';
import { DocumentData, Labels } from '../types';

interface UseDocumentActionsProps {
  document: DocumentData | undefined;
  labels: Labels | undefined;
  fileSelectedRef: React.MutableRefObject<string | Blob | null>;
  fileTypeRef: React.MutableRefObject<string | undefined>;
  displayImageUrlRef: React.MutableRefObject<string | undefined>;
}

export function useDocumentActions({
  document,
  labels,
  fileSelectedRef,
  fileTypeRef,
  displayImageUrlRef,
}: UseDocumentActionsProps) {

  const createOpenableFileUrl = useCallback(() => {
    if (isTiffMime(fileTypeRef.current)) {
      const displayUrl = displayImageUrlRef.current;
      if (!displayUrl) return null;
      return { url: displayUrl, shouldRevoke: false };
    }

    const fileSelected = fileSelectedRef.current;
    if (!fileSelected) return null;
    if (fileSelected instanceof Blob) {
      return { url: URL.createObjectURL(fileSelected), shouldRevoke: true };
    }
    const resolved = resolveOpenableUrl(fileSelected);
    if (resolved) return { url: resolved, shouldRevoke: false };
    return null;
  }, [displayImageUrlRef, fileSelectedRef, fileTypeRef]);

  const writeImagePrintDocument = useCallback((printWindow: Window, imageUrl: string) => {
    const printDoc = printWindow.document;
    printDoc.open();
    printDoc.write('<!doctype html><html><head></head><body></body></html>');
    printDoc.close();
    printDoc.title = document?.fileName || labels?.printDocumentTitle || 'Document';
    const style = printDoc.createElement('style');
    style.textContent = `html,body{margin:0;min-height:100%}body{display:flex;align-items:center;justify-content:center}img{max-width:100%;max-height:100vh}`;
    printDoc.head.appendChild(style);
    const img = printDoc.createElement('img');
    img.src = imageUrl;
    img.alt = document?.fileName || labels?.defaultDocumentName || 'document';
    printDoc.body.appendChild(img);
    return img;
  }, [document, labels]);

  const handleOpenInNew = useCallback(() => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;

    if (fileTypeRef.current === FileTypes.pdf) {
      const openedWindow = window.open(fileUrl.url, '_blank');
      if (openedWindow) openedWindow.opener = null;
      if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, openedWindow);
      return;
    }

    const openedWindow = window.open('', '_blank');
    if (openedWindow) {
      openedWindow.opener = null;
      writeImagePrintDocument(openedWindow, fileUrl.url);
      if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, openedWindow);
      return;
    }

    if (fileUrl.shouldRevoke) URL.revokeObjectURL(fileUrl.url);
  }, [createOpenableFileUrl, fileTypeRef, writeImagePrintDocument]);

  const handlePrint = useCallback(() => {
    const fileUrl = createOpenableFileUrl();
    if (!fileUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      if (fileTypeRef.current === FileTypes.pdf) {
        printWindow.location.href = fileUrl.url;
        printWindow.onload = () => {
          printWindow.print();
          if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, printWindow);
        };
        return;
      }
      const printableImage = writeImagePrintDocument(printWindow, fileUrl.url);
      const printImage = () => {
        printWindow.focus();
        printWindow.print();
        if (fileUrl.shouldRevoke) revokeBlobUrlWhenClosed(fileUrl.url, printWindow);
      };
      if (printableImage.complete) printImage();
      else printableImage.addEventListener('load', printImage, { once: true });
    } else if (fileUrl.shouldRevoke) URL.revokeObjectURL(fileUrl.url);
  }, [createOpenableFileUrl, fileTypeRef, writeImagePrintDocument]);

  const handleDownload = useCallback(() => {
    const fileSelected = fileSelectedRef.current;
    if (!fileSelected) return;
    downloadFile(fileSelected, resolveDownloadFileName(document));
  }, [document, fileSelectedRef]);

  return {
    handleOpenInNew,
    handlePrint,
    handleDownload,
  };
}
