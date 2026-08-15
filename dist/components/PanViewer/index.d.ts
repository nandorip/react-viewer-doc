import { type ReactNode } from 'react';
export interface PanViewerProps {
    zoom: number;
    dx: number;
    dy: number;
    onPan: (x: number, y: number) => void;
    children: ReactNode;
}
export declare const PanViewer: ({ zoom, dx, dy, onPan, children }: PanViewerProps) => import("react").JSX.Element;
