interface ErrorViewerProps {
    message: string;
    onRetry?: () => void;
    retryLabel?: string;
}
export declare const ErrorViewer: ({ message, onRetry, retryLabel }: ErrorViewerProps) => import("react").JSX.Element;
export {};
