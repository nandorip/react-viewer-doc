import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
interface DocumentData {
    fileData?: string;
    fileUri?: string;
    fileName: string;
}
interface ViewerProps {
    document?: DocumentData;
    extraToolbar?: React.ReactNode;
    height?: string | number;
}
export declare const Viewer: ({ document, extraToolbar, height }: ViewerProps) => import("react/jsx-runtime").JSX.Element;
export {};
