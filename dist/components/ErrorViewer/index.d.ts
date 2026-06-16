interface ErrorViewerProps {
    message: string;
    onRetry?: () => void;
    retryLabel?: string;
}
export declare const ErrorViewer: ({ message, onRetry, retryLabel }: ErrorViewerProps) => import("react/jsx-runtime").JSX.Element;
export {};
