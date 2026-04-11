"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToBlob = exports.FileTypes = exports.FileExtension = void 0;
exports.getDataURLPrefix = getDataURLPrefix;
exports.isBase64Data = exports.getFileTypeFromFile = exports.getExtension = void 0;
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-plusplus */

var FileTypes = exports.FileTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  csv: 'text/csv'
};
var FileExtension = exports.FileExtension = {
  NONE: 0,
  IMAGE: 1,
  PDF: 2,
  properties: {
    1: {
      key: 1,
      value: ['jpg', 'jpeg', 'png', '/', 'i']
    },
    2: {
      key: 2,
      value: ['pdf', 'j']
    }
  }
};
var getFileTypeFromFile = exports.getFileTypeFromFile = function getFileTypeFromFile(data) {
  if (!data) return FileExtension.NONE;
  var content = data;
  if (data.startsWith('data:')) {
    var parts = data.split(',');
    if (parts.length > 1) {
      var mime = parts[0];
      if (mime.includes('application/pdf')) return FileExtension.PDF;
      if (mime.includes('image/')) return FileExtension.IMAGE;
      content = parts[1];
    }
  }
  var firstChar = content.charAt(0);

  // PDF starts with JVBERi... (base64 for %PDF-)
  if (firstChar === 'J') return FileExtension.PDF;

  // Image headers in base64:
  // JPEG: /9j/
  // PNG: iVBOR
  // GIF: R0lG
  if (['/', 'i', 'R'].includes(firstChar)) return FileExtension.IMAGE;
  return FileExtension.NONE;
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
function getDataURLPrefix(type) {
  switch (type) {
    case FileExtension.PDF:
      return 'data:application/pdf;base64';
    case FileExtension.IMAGE:
    default:
      return 'data:image/jpeg;base64';
  }
}
var isBase64Data = exports.isBase64Data = function isBase64Data(data) {
  return /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(data);
};