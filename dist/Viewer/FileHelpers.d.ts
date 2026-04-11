export declare const FileTypes: {
    pdf: string;
    png: string;
    jpg: string;
    jpeg: string;
    csv: string;
};
export declare const FileExtension: {
    NONE: number;
    IMAGE: number;
    PDF: number;
    properties: {
        1: {
            key: number;
            value: string[];
        };
        2: {
            key: number;
            value: string[];
        };
    };
};
export declare const getFileTypeFromFile: (data: string) => number;
export declare const base64ToBlob: (base64: string, mimeType: string) => Blob;
export declare const getExtension: (file: string) => string;
export declare function getDataURLPrefix(type: number): string;
export declare const isBase64Data: (data: string) => boolean;
