import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
interface DocumentData {
    fileData?: string;
    fileUri?: string;
    fileName: string;
}
interface ViewerProps {
    document: {
        document?: DocumentData;
    };
    extraToolbar?: React.ReactNode;
}
export declare const Viewer: ({ document, extraToolbar }: ViewerProps) => import("react/jsx-runtime").JSX.Element;
export {};
