"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.revokeBlobUrlWhenClosed = exports.resolveOpenableUrl = exports.resolveExtension = exports.resolveDownloadFileName = exports.isValidUrl = exports.isImageMime = exports.getMimeTypeFromExtension = exports.getMimeTypeFromBase64 = exports.getFileTypeFromFile = exports.getExtension = exports.escapeHtml = exports.downloadFile = exports.buildFileFromBase64 = exports.base64ToBlob = exports.FileTypes = exports.FileExtension = void 0;
/* eslint-disable no-plusplus */

var isValidUrl = exports.isValidUrl = function isValidUrl(url) {
  try {
    var parsed = new URL(url);
    return ['http:', 'https:', 'blob:', 'data:'].includes(parsed.protocol);
  } catch (_unused) {
    return false;
  }
};
var resolveOpenableUrl = exports.resolveOpenableUrl = function resolveOpenableUrl(url) {
  if (!url) return null;
  if (isValidUrl(url)) return url;
  try {
    if (typeof window !== 'undefined') {
      return new URL(url, window.location.href).href;
    }
  } catch (_unused2) {
    return null;
  }
  return null;
};
var escapeHtml = exports.escapeHtml = function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
var FileTypes = exports.FileTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  csv: 'text/csv'
};
var IMAGE_BASE64_PREFIXES = ['/', 'i', 'R', 'U', 'P', 'S', 'T'];
var isSvgDataUri = function isSvgDataUri(value) {
  return value.includes('image/svg+xml');
};
var isTiffDataUri = function isTiffDataUri(value) {
  return value.includes('image/tiff') || value.includes('image/tif');
};
var isSvgBase64Content = function isSvgBase64Content(content) {
  return content.startsWith('PHN2') || content.startsWith('PD94');
};
var isTiffBase64Content = function isTiffBase64Content(content) {
  return content.startsWith('SUkq') || content.startsWith('TU0');
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
      if (isSvgDataUri(mimePart) || isTiffDataUri(mimePart) || mimePart.includes('image/')) {
        return FileExtension.IMAGE;
      }
      content = parts[1];
    }
  }
  var trimmed = content.trim();
  if (trimmed.startsWith('JVBERi')) return FileExtension.PDF;
  if (isSvgBase64Content(trimmed) || isTiffBase64Content(trimmed)) {
    return FileExtension.IMAGE;
  }
  var firstChar = trimmed.charAt(0);
  if (IMAGE_BASE64_PREFIXES.includes(firstChar)) {
    return FileExtension.IMAGE;
  }
  return FileExtension.NONE;
};
var getMimeTypeFromBase64 = exports.getMimeTypeFromBase64 = function getMimeTypeFromBase64(base64) {
  if (base64.startsWith('data:')) {
    return base64.split(';')[0].split(':')[1];
  }
  var content = base64.trim();
  if (content.startsWith('JVBERi')) return 'application/pdf';
  if (isSvgBase64Content(content)) return FileTypes.svg;
  if (isTiffBase64Content(content)) return FileTypes.tiff;
  switch (content.charAt(0)) {
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
  try {
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
  } catch (_unused3) {
    return null;
  }
};
var getExtension = exports.getExtension = function getExtension(file) {
  var _parts$pop;
  if (!file) return '';
  var path = file;
  try {
    if (file.includes('://')) {
      path = new URL(file).pathname;
    }
  } catch (_unused4) {
    path = file;
  }
  var pathWithoutQuery = path.split('?')[0];
  var fileName = pathWithoutQuery.split('/').pop() || pathWithoutQuery;
  var parts = fileName.split('.');
  return parts.length > 1 ? ((_parts$pop = parts.pop()) === null || _parts$pop === void 0 ? void 0 : _parts$pop.toLowerCase()) || '' : '';
};
var resolveExtension = exports.resolveExtension = function resolveExtension(fileUri, fileName) {
  var fromUri = getExtension(fileUri);
  if (fromUri) return fromUri;
  if (fileName) return getExtension(fileName);
  return '';
};
var getMimeTypeFromExtension = exports.getMimeTypeFromExtension = function getMimeTypeFromExtension(extension) {
  var type = FileTypes[extension];
  if (!type || type === FileTypes.csv) return undefined;
  if (extension === 'tif') return FileTypes.tiff;
  return type;
};
var isImageMime = exports.isImageMime = function isImageMime(mime) {
  return Boolean(mime === null || mime === void 0 ? void 0 : mime.startsWith('image/'));
};
var buildFileFromBase64 = exports.buildFileFromBase64 = function buildFileFromBase64(fileBase64) {
  var content = fileBase64;
  if (fileBase64.startsWith('data:')) {
    var parts = fileBase64.split(',');
    if (parts.length > 1) {
      content = parts[1];
    }
  }
  var type = getFileTypeFromFile(fileBase64);
  var mime = getMimeTypeFromBase64(fileBase64);
  if (type === FileExtension.PDF) {
    var _blobFile = base64ToBlob(content, 'application/pdf');
    if (!_blobFile) return null;
    return {
      file: _blobFile,
      mime: mime
    };
  }
  if (type !== FileExtension.IMAGE) return null;
  var blobFile = base64ToBlob(content, mime);
  if (blobFile) {
    return {
      file: blobFile,
      mime: mime
    };
  }
  return {
    file: "data:".concat(mime, ";base64,").concat(content),
    mime: mime
  };
};
var downloadFile = exports.downloadFile = function downloadFile(file, fileName) {
  var url = typeof file === 'string' ? file : URL.createObjectURL(file);
  var link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof file !== 'string') {
    URL.revokeObjectURL(url);
  }
};
var resolveDownloadFileName = exports.resolveDownloadFileName = function resolveDownloadFileName(doc) {
  if (doc !== null && doc !== void 0 && doc.fileName) return doc.fileName;
  var source = (doc === null || doc === void 0 ? void 0 : doc.fileUri) || '';
  var extension = resolveExtension(source, doc === null || doc === void 0 ? void 0 : doc.fileName);
  if (extension) return "download.".concat(extension);
  return 'download';
};
var revokeBlobUrlWhenClosed = exports.revokeBlobUrlWhenClosed = function revokeBlobUrlWhenClosed(url, childWindow) {
  if (!childWindow) {
    URL.revokeObjectURL(url);
    return function () {
      return undefined;
    };
  }
  var interval = window.setInterval(function () {
    if (childWindow.closed) {
      URL.revokeObjectURL(url);
      window.clearInterval(interval);
    }
  }, 500);
  return function () {
    return window.clearInterval(interval);
  };
};