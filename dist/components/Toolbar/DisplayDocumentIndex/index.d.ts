import { ViewerTheme } from '../../../types';
interface Props {
    index: number;
    total: number;
    fileName: string;
    ariaLabel?: string;
    theme?: ViewerTheme;
}
export declare const DisplayDocumentIndex: ({ index, total, fileName, ariaLabel, theme, }: Props) => import("react").JSX.Element;
export {};
