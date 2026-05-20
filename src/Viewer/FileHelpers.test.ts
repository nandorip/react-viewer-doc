import {
  getFileTypeFromFile,
  getExtension,
  getMimeTypeFromBase64,
  base64ToBlob,
  FileExtension,
} from './FileHelpers';

describe('FileHelpers', () => {
  describe('getFileTypeFromFile', () => {
    it('should return PDF for PDF base64', () => {
      // "JVBERi" is base64 for "%PDF"
      expect(getFileTypeFromFile('JVBERi0xLjQK')).toBe(FileExtension.PDF);
    });

    it('should return PDF for PDF data URI', () => {
      expect(getFileTypeFromFile('data:application/pdf;base64,JVBERi0xLjQK')).toBe(FileExtension.PDF);
    });

    it('should return IMAGE for JPEG base64', () => {
      // "/9j/" is start of JPEG
      expect(getFileTypeFromFile('/9j/4AAQSkZJRgABAQAAAQABAAD/')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for PNG base64', () => {
      // "iVBOR" is start of PNG
      expect(getFileTypeFromFile('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for GIF base64', () => {
      // "R0lG" is start of GIF
      expect(getFileTypeFromFile('R0lGODA')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for WebP base64', () => {
      // "UklG" is start of WebP
      expect(getFileTypeFromFile('UklGR')).toBe(FileExtension.IMAGE);
    });

    it('should return IMAGE for image data URI', () => {
      expect(getFileTypeFromFile('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==')).toBe(FileExtension.IMAGE);
    });

    it('should return NONE for empty data', () => {
      expect(getFileTypeFromFile('')).toBe(FileExtension.NONE);
    });
  });

  describe('getMimeTypeFromBase64', () => {
    it('should detect correctly from first char', () => {
      expect(getMimeTypeFromBase64('J')).toBe('application/pdf');
      expect(getMimeTypeFromBase64('i')).toBe('image/png');
      expect(getMimeTypeFromBase64('/')).toBe('image/jpeg');
      expect(getMimeTypeFromBase64('R')).toBe('image/gif');
      expect(getMimeTypeFromBase64('U')).toBe('image/webp');
      expect(getMimeTypeFromBase64('X')).toBe('application/octet-stream');
    });

    it('should extract from data URI', () => {
      expect(getMimeTypeFromBase64('data:image/png;base64,xxx')).toBe('image/png');
      expect(getMimeTypeFromBase64('data:application/pdf;base64,xxx')).toBe('application/pdf');
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

    it('should return empty string if no extension', () => {
      expect(getExtension('filename')).toBe('');
    });
  });

  describe('base64ToBlob', () => {
    it('should convert base64 to Blob', () => {
      const base64 = 'SGVsbG8='; // "Hello"
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
});
