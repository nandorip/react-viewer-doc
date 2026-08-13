import { DocumentData } from '../types';
export interface UseDocumentListOptions {
    documents: DocumentData[];
    documentIndex?: number;
    defaultDocumentIndex?: number;
    onDocumentChange?: (index: number, document: DocumentData) => void;
}
export interface UseDocumentListResult {
    activeIndex: number;
    activeDocument: DocumentData | undefined;
    hasMultiple: boolean;
    setDocumentIndex: (index: number) => void;
    nextDocument: () => void;
    prevDocument: () => void;
}
export declare function useDocumentList({ documents, documentIndex, defaultDocumentIndex, onDocumentChange, }: UseDocumentListOptions): UseDocumentListResult;
