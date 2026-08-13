import { DocumentData, Labels, ViewerTheme } from '../../types';
interface DocumentListProps {
    documents: DocumentData[];
    activeIndex: number;
    onSelect: (index: number) => void;
    labels?: Labels;
    theme?: ViewerTheme;
}
export declare const DocumentList: ({ documents, activeIndex, onSelect, labels, theme, }: DocumentListProps) => import("react").JSX.Element;
export {};
