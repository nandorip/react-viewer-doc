/* eslint-disable no-plusplus */

import { DocumentData } from '../types';

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'blob:', 'data:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export const resolveOpenableUrl = (url: string): string | null => {
  if (!url) return null;
  if (isValidUrl(url)) return url;

  try {
    if (typeof window !== 'undefined') {
      return new URL(url, window.location.href).href;
    }
  } catch {
    return null;
  }

  return null;
};

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const FileTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  csv: 'text/csv',
};

const IMAGE_BASE64_PREFIXES = ['/', 'i', 'R', 'U', 'P', 'S', 'T'] as const;

const isSvgDataUri = (value: string) => value.includes('image/svg+xml');

const isTiffDataUri = (value: string) =>
  value.includes('image/tiff') || value.includes('image/tif');

const isSvgBase64Content = (content: string) =>
  content.startsWith('PHN2') || content.startsWith('PD94');

const isTiffBase64Content = (content: string) =>
  content.startsWith('SUkq') || content.startsWith('TU0');

export const FileExtension = {
  NONE: 0,
  IMAGE: 1,
  PDF: 2,
};

export const getFileTypeFromFile = (data: string) => {
  if (!data) return FileExtension.NONE;

  let content = data;
  if (data.startsWith('data:')) {
    const parts = data.split(',');
    if (parts.length > 1) {
      const mimePart = parts[0];
      if (mimePart.includes('application/pdf')) return FileExtension.PDF;
      if (isSvgDataUri(mimePart) || isTiffDataUri(mimePart) || mimePart.includes('image/')) {
        return FileExtension.IMAGE;
      }
      content = parts[1];
    }
  }

  const trimmed = content.trim();

  if (trimmed.startsWith('JVBERi')) return FileExtension.PDF;

  if (isSvgBase64Content(trimmed) || isTiffBase64Content(trimmed)) {
    return FileExtension.IMAGE;
  }

  const firstChar = trimmed.charAt(0);
  if (IMAGE_BASE64_PREFIXES.includes(firstChar as typeof IMAGE_BASE64_PREFIXES[number])) {
    return FileExtension.IMAGE;
  }

  return FileExtension.NONE;
};

export const getMimeTypeFromBase64 = (base64: string): string => {
  if (base64.startsWith('data:')) {
    return base64.split(';')[0].split(':')[1];
  }

  const content = base64.trim();

  if (content.startsWith('JVBERi')) return 'application/pdf';
  if (isSvgBase64Content(content)) return FileTypes.svg;
  if (isTiffBase64Content(content)) return FileTypes.tiff;

  switch (content.charAt(0)) {
    case 'i': return 'image/png';
    case '/': return 'image/jpeg';
    case 'R': return 'image/gif';
    case 'U': return 'image/webp';
    default: return 'application/octet-stream';
  }
};

export const base64ToBlob = (base64: string, mimeType: string): Blob | null => {
  try {
    let content = base64;
    if (base64.startsWith('data:')) {
      const parts = base64.split(',');
      if (parts.length > 1) {
        content = parts[1];
      }
    }

    const byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  } catch {
    return null;
  }
};

export const getExtension = (file: string) => {
  if (!file) return '';

  let path = file;
  try {
    if (file.includes('://')) {
      path = new URL(file).pathname;
    }
  } catch {
    path = file;
  }

  const pathWithoutQuery = path.split('?')[0];
  const fileName = pathWithoutQuery.split('/').pop() || pathWithoutQuery;
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
};

export const resolveExtension = (fileUri: string, fileName?: string): string => {
  const fromUri = getExtension(fileUri);
  if (fromUri) return fromUri;
  if (fileName) return getExtension(fileName);
  return '';
};

export const getMimeTypeFromExtension = (extension: string): string | undefined => {
  const type = FileTypes[extension as keyof typeof FileTypes];
  if (!type || type === FileTypes.csv) return undefined;
  if (extension === 'tif') return FileTypes.tiff;
  return type;
};

export const isImageMime = (mime?: string): boolean =>
  Boolean(mime?.startsWith('image/'));

export interface BuiltFile {
  file: Blob | string;
  mime: string;
}

export const buildFileFromBase64 = (fileBase64: string): BuiltFile | null => {
  let content = fileBase64;
  if (fileBase64.startsWith('data:')) {
    const parts = fileBase64.split(',');
    if (parts.length > 1) {
      content = parts[1];
    }
  }

  const type = getFileTypeFromFile(fileBase64);
  const mime = getMimeTypeFromBase64(fileBase64);

  if (type === FileExtension.PDF) {
    const blobFile = base64ToBlob(content, 'application/pdf');
    if (!blobFile) return null;
    return { file: blobFile, mime };
  }

  if (type !== FileExtension.IMAGE) return null;

  const blobFile = base64ToBlob(content, mime);
  if (blobFile) {
    return { file: blobFile, mime };
  }

  return {
    file: `data:${mime};base64,${content}`,
    mime,
  };
};

export const downloadFile = (file: Blob | string, fileName: string) => {
  const url = typeof file === 'string' ? file : URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof file !== 'string') {
    URL.revokeObjectURL(url);
  }
};

export const resolveDownloadFileName = (doc?: DocumentData): string => {
  if (doc?.fileName) return doc.fileName;

  const source = doc?.fileUri || '';
  const extension = resolveExtension(source, doc?.fileName);
  if (extension) return `download.${extension}`;

  return 'download';
};

export const revokeBlobUrlWhenClosed = (url: string, childWindow: Window | null): (() => void) => {
  if (!childWindow) {
    URL.revokeObjectURL(url);
    return () => undefined;
  }

  const interval = window.setInterval(() => {
    if (childWindow.closed) {
      URL.revokeObjectURL(url);
      window.clearInterval(interval);
    }
  }, 500);

  return () => window.clearInterval(interval);
};