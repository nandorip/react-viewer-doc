interface UseTiffImageOptions {
    source: Blob | string | null;
    pageNumber: number;
    onLoad?: () => void;
    onError?: (message: string) => void;
}
export declare const useTiffImage: ({ source, pageNumber, onLoad, onError, }: UseTiffImageOptions) => {
    imageUrl: string | undefined;
    pageCount: number;
    loading: boolean;
};
export {};
