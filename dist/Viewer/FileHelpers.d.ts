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
export declare const base64ToBlob: (base64: string, mimeType: string) => Blob;
export declare const getExtension: (file: string) => string;
export declare const isBase64Data: (data: string) => boolean;
