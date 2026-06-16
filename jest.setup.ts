import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
