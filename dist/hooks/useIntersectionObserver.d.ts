interface UseIntersectionObserverOptions {
    rootMargin?: string;
    threshold?: number;
}
export declare const useIntersectionObserver: <T extends Element>(options?: UseIntersectionObserverOptions) => {
    ref: import("react").RefObject<T | null>;
    isIntersecting: boolean;
};
export {};
