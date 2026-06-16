/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'blob:', 'data:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export const FileTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  csv: 'text/csv',
};

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
      if (mimePart.includes('image/')) return FileExtension.IMAGE;
      content = parts[1];
    }
  }

  const firstChar = content.charAt(0);

  // PDF starts with JVBERi... (base64 for %PDF-)
  if (firstChar === 'J' || content.startsWith('JVBERi')) return FileExtension.PDF;

  // Image headers in base64:
  // JPEG: /9j/
  // PNG: iVBOR (i)
  // GIF: R0lG (R)
  // WebP: UklG (U)
  if (['/', 'i', 'R', 'U'].includes(firstChar)) return FileExtension.IMAGE;

  return FileExtension.NONE;
};

export const getMimeTypeFromBase64 = (base64: string): string => {
  if (base64.startsWith('data:')) {
    return base64.split(';')[0].split(':')[1];
  }

  const content = base64.trim();
  const firstChar = content.charAt(0);
  
  if (content.startsWith('JVBERi')) return 'application/pdf';
  
  switch (firstChar) {
    case 'J': return 'application/pdf';
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
  const urlWithoutQuery = file.split('?')[0];
  const parts = urlWithoutQuery.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
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
