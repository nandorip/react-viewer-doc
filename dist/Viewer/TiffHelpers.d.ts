export declare const TIFF_MIME = "image/tiff";
export declare const isTiffMime: (mime?: string) => boolean;
export declare const readSourceAsArrayBuffer: (source: Blob | string) => Promise<ArrayBuffer | null>;
export interface DecodedTiff {
    pageCount: number;
    renderPage: (pageIndex: number) => Promise<Blob | null>;
}
export declare const decodeTiff: (source: Blob | string) => Promise<DecodedTiff | null>;
