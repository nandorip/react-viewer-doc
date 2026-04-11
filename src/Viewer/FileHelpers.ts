/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */

export const FileTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  csv: 'text/csv',
};

export const FileExtension = {
  NONE: 0,
  IMAGE: 1,
  PDF: 2,
  properties: {
    1: { key: 1, value: ['jpg', 'jpeg', 'png', '/', 'i'] },
    2: { key: 2, value: ['pdf', 'j'] },
  },
};

export const getFileTypeFromFile = (data: string) => {
  if (!data) return FileExtension.NONE;

  let content = data;
  if (data.startsWith('data:')) {
    const parts = data.split(',');
    if (parts.length > 1) {
      const mime = parts[0];
      if (mime.includes('application/pdf')) return FileExtension.PDF;
      if (mime.includes('image/')) return FileExtension.IMAGE;
      content = parts[1];
    }
  }

  const firstChar = content.charAt(0);

  // PDF starts with JVBERi... (base64 for %PDF-)
  if (firstChar === 'J') return FileExtension.PDF;

  // Image headers in base64:
  // JPEG: /9j/
  // PNG: iVBOR
  // GIF: R0lG
  if (['/', 'i', 'R'].includes(firstChar)) return FileExtension.IMAGE;

  return FileExtension.NONE;
};

export const base64ToBlob = (base64: string, mimeType: string) => {
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
};

export const getExtension = (file: string) => {
  if (!file) return '';
  const urlWithoutQuery = file.split('?')[0];
  const parts = urlWithoutQuery.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
};

export function getDataURLPrefix(type: number): string {
  switch (type) {
    case FileExtension.PDF:
      return 'data:application/pdf;base64';
    case FileExtension.IMAGE:
    default:
      return 'data:image/jpeg;base64';
  }
}

export const isBase64Data = (data: string) =>
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(data);
