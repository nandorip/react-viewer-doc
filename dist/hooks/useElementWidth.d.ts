export declare const useElementWidth: <T extends HTMLElement>() => {
    ref: (node: T | null) => void;
    width: number;
    element: import("react").RefObject<T | null>;
};
