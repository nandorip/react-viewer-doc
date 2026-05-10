type Props = {
    document?: {
        fileData?: string;
        fileUri?: string;
        fileName: string;
    };
    extraToolbar?: React.ReactNode;
    height?: string | number;
};
export declare const ReactDocumentViewer: ({ document, extraToolbar, height }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
