import {
  getFileTypeFromFile,
  getExtension,
  getMimeTypeFromBase64,
  base64ToBlob,
  FileExtension,
  resolveOpenableUrl,
  isSafeDocumentUri,
  resolveExtension,
  getMimeTypeFromExtension,
  resolveDownloadFileName,
  buildFileFromBase64,
} from './FileHelpers';

describe('FileHelpers', () => {
  describe('getFileTypeFromFile', () => {
    it('should return PDF for PDF base64', () => {
      expect(getFileTypeFromFile('JVBERi0xLjQK')).toBe(FileExtension.PDF);
    });

    it('should not return PDF for a single J character', () => {
      expect(getFileTypeFromFile('J')).toBe(FileExtension.NONE);
    });

    it('should return PDF for PDF data URI', () => {
      expect(getFileTypeFromFile('data:application/pdf;base64,JVBERi0xLjQK')).toBe(FileExtension.PDF);
    });

    it('should return IMAGE for JPEG base64', () => {
      expect(getFileTypeFromFile('/9j/4AAQSkZJRgABAQAAAQABAAD/')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for PNG base64', () => {
      expect(getFileTypeFromFile('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for GIF base64', () => {
      expect(getFileTypeFromFile('R0lGODA')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for WebP base64', () => {
      expect(getFileTypeFromFile('UklGR')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for SVG base64', () => {
      expect(getFileTypeFromFile('PHN2ZyB4bWxucz0i')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for TIFF base64', () => {
      expect(getFileTypeFromFile('SUkqAA')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for image data URI', () => {
      expect(getFileTypeFromFile('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==')).toBe(FileExtension.IMAGE);
    });

    it('should return NONE for empty data', () => {
      expect(getFileTypeFromFile('')).toBe(FileExtension.NONE);
    });

    it('should not treat HTML data URIs as images', () => {
      expect(getFileTypeFromFile('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBe(FileExtension.NONE);
    });
  });

  describe('getMimeTypeFromBase64', () => {
    it('should detect correctly from content prefix', () => {
      expect(getMimeTypeFromBase64('JVBERi0xLjQK')).toBe('application/pdf');
      expect(getMimeTypeFromBase64('PHN2ZyB4bWxucz0i')).toBe('image/svg+xml');
      expect(getMimeTypeFromBase64('SUkqAA')).toBe('image/tiff');
      expect(getMimeTypeFromBase64('i')).toBe('image/png');
      expect(getMimeTypeFromBase64('/')).toBe('image/jpeg');
      expect(getMimeTypeFromBase64('R')).toBe('image/gif');
      expect(getMimeTypeFromBase64('U')).toBe('image/webp');
      expect(getMimeTypeFromBase64('X')).toBe('application/octet-stream');
    });

    it('should extract from data URI', () => {
      expect(getMimeTypeFromBase64('data:image/png;base64,xxx')).toBe('image/png');
      expect(getMimeTypeFromBase64('data:application/pdf;base64,JVBERi0=')).toBe('application/pdf');
    });

    it('should reject non-document data URI mime types', () => {
      expect(getMimeTypeFromBase64('data:text/html;base64,PHNjcmlwdD4=')).toBe('application/octet-stream');
    });
  });

  describe('getExtension', () => {
    it('should return extension from filename', () => {
      expect(getExtension('test.pdf')).toBe('pdf');
      expect(getExtension('image.JPG')).toBe('jpg');
    });

    it('should handle URLs with query parameters', () => {
      expect(getExtension('http://example.com/file.pdf?query=1')).toBe('pdf');
    });

    it('should ignore hostname dots when parsing URL extensions', () => {
      expect(getExtension('https://api.example.com/files/abc123')).toBe('');
    });

    it('should return empty string if no extension', () => {
      expect(getExtension('filename')).toBe('');
    });
  });

  describe('resolveExtension', () => {
    it('should fall back to fileName when the URI has no extension', () => {
      expect(resolveExtension('https://api.example.com/files/abc123', 'report.pdf')).toBe('pdf');
    });

    it('should prefer the URI extension when present', () => {
      expect(resolveExtension('https://example.com/file.png', 'report.pdf')).toBe('png');
    });
  });

  describe('getMimeTypeFromExtension', () => {
    it('should map supported extensions to mime types', () => {
      expect(getMimeTypeFromExtension('pdf')).toBe('application/pdf');
      expect(getMimeTypeFromExtension('jpg')).toBe('image/jpeg');
      expect(getMimeTypeFromExtension('svg')).toBe('image/svg+xml');
      expect(getMimeTypeFromExtension('tiff')).toBe('image/tiff');
      expect(getMimeTypeFromExtension('tif')).toBe('image/tiff');
    });

    it('should return undefined for unsupported extensions', () => {
      expect(getMimeTypeFromExtension('csv')).toBeUndefined();
      expect(getMimeTypeFromExtension('')).toBeUndefined();
    });
  });

  describe('resolveOpenableUrl', () => {
    it('should return absolute URLs unchanged', () => {
      expect(resolveOpenableUrl('http://example.com/test.jpg')).toBe('http://example.com/test.jpg');
    });

    it('should resolve relative URLs against the current location', () => {
      expect(resolveOpenableUrl('/assets/doc.pdf')).toBe(`${window.location.origin}/assets/doc.pdf`);
    });

    it('should reject javascript and other unsafe protocols', () => {
      expect(resolveOpenableUrl('javascript:alert(1)')).toBeNull();
      expect(resolveOpenableUrl('vbscript:alert(1)')).toBeNull();
      expect(resolveOpenableUrl('file:///etc/passwd')).toBeNull();
    });
  });

  describe('isSafeDocumentUri', () => {
    it('should accept http(s) and blob URIs and reject javascript', () => {
      expect(isSafeDocumentUri('https://example.com/a.pdf')).toBe(true);
      expect(isSafeDocumentUri('/assets/doc.pdf')).toBe(true);
      expect(isSafeDocumentUri('javascript:alert(1)')).toBe(false);
    });
  });

  describe('resolveDownloadFileName', () => {
    it('should use fileName when provided', () => {
      expect(resolveDownloadFileName({ fileName: 'report.pdf' })).toBe('report.pdf');
    });

    it('should derive a filename from the URI extension', () => {
      expect(resolveDownloadFileName({ fileName: '', fileUri: 'http://example.com/file.png' })).toBe('download.png');
    });

    it('should fall back to a generic filename', () => {
      expect(resolveDownloadFileName({ fileName: '' })).toBe('download');
    });
  });

  describe('base64ToBlob', () => {
    it('should convert base64 to Blob', () => {
      const base64 = 'SGVsbG8=';
      const blob = base64ToBlob(base64, 'text/plain');
      expect(blob).not.toBeNull();
      expect(blob).toBeInstanceOf(Blob);
      expect(blob?.type).toBe('text/plain');
      expect(blob?.size).toBe(5);
    });

    it('should handle data URI in base64ToBlob', () => {
      const dataUri = 'data:text/plain;base64,SGVsbG8=';
      const blob = base64ToBlob(dataUri, 'text/plain');
      expect(blob).not.toBeNull();
      expect(blob?.size).toBe(5);
    });

    it('should return null for invalid base64', () => {
      const invalidBase64 = 'not valid base64!@#$';
      const blob = base64ToBlob(invalidBase64, 'text/plain');
      expect(blob).toBeNull();
    });
  });

  describe('buildFileFromBase64', () => {
    it('should build an image file from PNG base64', () => {
      const result = buildFileFromBase64('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
      expect(result).not.toBeNull();
      expect(result?.mime).toBe('image/png');
    });

    it('should reject HTML data URIs', () => {
      expect(buildFileFromBase64('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBeNull();
    });
  });
});
