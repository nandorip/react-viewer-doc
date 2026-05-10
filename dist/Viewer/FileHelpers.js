"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBase64Data = exports.getMimeTypeFromBase64 = exports.getFileTypeFromFile = exports.getExtension = exports.base64ToBlob = exports.FileTypes = exports.FileExtension = void 0;
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */

var FileTypes = exports.FileTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  csv: 'text/csv'
};
var FileExtension = exports.FileExtension = {
  NONE: 0,
  IMAGE: 1,
  PDF: 2
};
var getFileTypeFromFile = exports.getFileTypeFromFile = function getFileTypeFromFile(data) {
  if (!data) return FileExtension.NONE;
  var content = data;
  if (data.startsWith('data:')) {
    var parts = data.split(',');
    if (parts.length > 1) {
      var mimePart = parts[0];
      if (mimePart.includes('application/pdf')) return FileExtension.PDF;
      if (mimePart.includes('image/')) return FileExtension.IMAGE;
      content = parts[1];
    }
  }
  var firstChar = content.charAt(0);

  // PDF starts with JVBERi... (base64 for %PDF-)
  if (firstChar === 'J') return FileExtension.PDF;

  // Image headers in base64:
  // JPEG: /9j/
  // PNG: iVBOR (i)
  // GIF: R0lG (R)
  // WebP: UklG (U)
  if (['/', 'i', 'R', 'U'].includes(firstChar)) return FileExtension.IMAGE;
  return FileExtension.NONE;
};
var getMimeTypeFromBase64 = exports.getMimeTypeFromBase64 = function getMimeTypeFromBase64(base64) {
  if (base64.startsWith('data:')) {
    return base64.split(';')[0].split(':')[1];
  }
  var firstChar = base64.charAt(0);
  switch (firstChar) {
    case 'J':
      return 'application/pdf';
    case 'i':
      return 'image/png';
    case '/':
      return 'image/jpeg';
    case 'R':
      return 'image/gif';
    case 'U':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
};
var base64ToBlob = exports.base64ToBlob = function base64ToBlob(base64, mimeType) {
  var content = base64;
  if (base64.startsWith('data:')) {
    var parts = base64.split(',');
    if (parts.length > 1) {
      content = parts[1];
    }
  }
  var byteCharacters = atob(content);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], {
    type: mimeType
  });
};
var getExtension = exports.getExtension = function getExtension(file) {
  var _parts$pop;
  if (!file) return '';
  var urlWithoutQuery = file.split('?')[0];
  var parts = urlWithoutQuery.split('.');
  return parts.length > 1 ? ((_parts$pop = parts.pop()) === null || _parts$pop === void 0 ? void 0 : _parts$pop.toLowerCase()) || '' : '';
};
var isBase64Data = exports.isBase64Data = function isBase64Data(data) {
  return /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(data);
};