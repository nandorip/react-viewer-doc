/// <reference types="@testing-library/jest-dom" />
import { renderHook, act } from '@testing-library/react';
import { useViewerCore } from './useViewerCore';
import type { DocumentData } from '../types';

jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: { workerSrc: '' },
    version: '1.2.3',
  },
}));

jest.mock('./useTiffImage', () => ({
  useTiffImage: () => ({
    imageUrl: undefined,
    pageCount: 0,
    loading: false,
  }),
}));

const imageDocument: DocumentData = {
  fileName: 'photo.jpg',
  fileUri: 'http://example.com/photo.jpg',
};

const pdfDocument: DocumentData = {
  fileName: 'test.pdf',
  fileUri: 'http://example.com/test.pdf',
};

const unsupportedDocument: DocumentData = {
  fileName: 'data.csv',
  fileUri: 'http://example.com/data.csv',
};

describe('useViewerCore', () => {
  beforeEach(() => {
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: jest.fn(() => 'blob:http://localhost/file'),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: jest.fn(),
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useViewerCore({}));

    expect(result.current.state.zoom).toBe(1);
    expect(result.current.state.rotation).toBe(0);
    expect(result.current.state.pageNumber).toBe(1);
    expect(result.current.state.error).toBe('');
    expect(result.current.state.fileSelected).toBeNull();
  });

  it('loads an image document from URL', () => {
    const { result } = renderHook(() => useViewerCore({ document: imageDocument }));

    expect(result.current.state.fileSelected).toBe('http://example.com/photo.jpg');
    expect(result.current.state.error).toBe('');
  });

  it('does not re-initialize when document reference changes but content is the same', () => {
    const { result, rerender } = renderHook(
      ({ document }) => useViewerCore({ document }),
      { initialProps: { document: imageDocument } },
    );

    const initialResetKey = result.current.state.viewerResetKey;

    rerender({ document: { ...imageDocument } });

    expect(result.current.state.viewerResetKey).toBe(initialResetKey);
    expect(result.current.state.fileSelected).toBe('http://example.com/photo.jpg');
  });

  it('handles zoom in and zoom out', () => {
    const { result } = renderHook(() => useViewerCore({ document: imageDocument }));

    act(() => result.current.actions.zoomIn());
    expect(result.current.state.zoom).toBe(1.1);

    act(() => result.current.actions.zoomOut());
    expect(result.current.state.zoom).toBe(1);
  });

  it('resets view state', () => {
    const { result } = renderHook(() => useViewerCore({ document: imageDocument }));

    act(() => {
      result.current.actions.zoomIn();
      result.current.actions.rotate();
      result.current.actions.onPan(10, 20);
    });

    act(() => result.current.actions.resetViewState());

    expect(result.current.state.zoom).toBe(1);
    expect(result.current.state.rotation).toBe(0);
    expect(result.current.state.dx).toBe(0);
    expect(result.current.state.dy).toBe(0);
    expect(result.current.state.pageNumber).toBe(1);
  });

  it('rejects invalid page numbers', () => {
    const { result } = renderHook(() => useViewerCore({ document: pdfDocument }));

    act(() => result.current.actions.setPageNumber(0));
    expect(result.current.state.pageNumber).toBe(1);

    act(() => result.current.actions.setPageNumber(-1));
    expect(result.current.state.pageNumber).toBe(1);

    act(() => result.current.actions.setPageNumber(Number.NaN));
    expect(result.current.state.pageNumber).toBe(1);
  });

  it('reports unsupported files via onError', () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useViewerCore({
        document: unsupportedDocument,
        labels: { unsupportedFile: 'Unsupported file type' },
        onError,
      }),
    );

    expect(result.current.state.error).toBe('Unsupported file type');
    expect(onError).toHaveBeenCalledWith('Unsupported file type');
  });

  it('applies theme to merged state', () => {
    const { result } = renderHook(() =>
      useViewerCore({ document: imageDocument, theme: 'dark' }),
    );

    expect(result.current.state.theme).toBe('dark');
  });

  it('retries loading after handleRetry', () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useViewerCore({
        document: unsupportedDocument,
        labels: { unsupportedFile: 'Unsupported file type' },
        onError,
      }),
    );

    act(() => result.current.actions.handleRetry());

    expect(result.current.state.error).toBe('Unsupported file type');
    expect(onError).toHaveBeenCalledTimes(2);
  });
});