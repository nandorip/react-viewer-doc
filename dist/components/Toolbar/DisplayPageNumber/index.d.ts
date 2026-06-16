interface Props {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
    ariaLabel?: string;
}
export declare const DisplayPageNumber: ({ totalPages, page, onPageChange, ariaLabel }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
