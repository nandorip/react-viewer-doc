import { DocumentData } from '../types';
export declare const isValidUrl: (url: string) => boolean;
export declare const resolveOpenableUrl: (url: string) => string | null;
export declare const escapeHtml: (value: string) => string;
export declare const FileTypes: {
    pdf: string;
    png: string;
    jpg: string;
    jpeg: string;
    gif: string;
    webp: string;
    csv: string;
};
export declare const FileExtension: {
    NONE: number;
    IMAGE: number;
    PDF: number;
};
export declare const getFileTypeFromFile: (data: string) => number;
export declare const getMimeTypeFromBase64: (base64: string) => string;
export declare const base64ToBlob: (base64: string, mimeType: string) => Blob | null;
export declare const getExtension: (file: string) => string;
export declare const resolveExtension: (fileUri: string, fileName?: string) => string;
export declare const getMimeTypeFromExtension: (extension: string) => string | undefined;
export interface BuiltFile {
    file: Blob | string;
    mime: string;
}
export declare const buildFileFromBase64: (fileBase64: string) => BuiltFile | null;
export declare const downloadFile: (file: Blob | string, fileName: string) => void;
export declare const resolveDownloadFileName: (doc?: DocumentData) => string;
export declare const revokeBlobUrlWhenClosed: (url: string, childWindow: Window | null) => void;
