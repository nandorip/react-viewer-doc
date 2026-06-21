import { ViewerTheme } from '../../../types';
interface Props {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
    ariaLabel?: string;
    theme?: ViewerTheme;
}
export declare const DisplayPageNumber: ({ totalPages, page, onPageChange, ariaLabel, theme, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
