import { act, renderHook, waitFor } from '@testing-library/react';
import { useTiffImage } from './useTiffImage';
import { useViewerCore } from './useViewerCore';
import { decodeTiff } from '../Viewer/TiffHelpers';

jest.mock('react-pdf', () => ({ pdfjs: { version: 'test', GlobalWorkerOptions: { workerSrc: '' } } }));
jest.mock('../Viewer/TiffHelpers', () => ({
  isTiffMime: (mime: string) => mime === 'image/tiff',
  decodeTiff: jest.fn(),
}));
const decode = decodeTiff as jest.Mock;
const source = 'https://example.com/scan.tiff';
const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
};

beforeEach(() => {
  decode.mockReset();
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: jest.fn((blob: Blob) => 'blob:' + blob.type) });
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: jest.fn() });
});

test('a slow previous page cannot overwrite the selected page', async () => {
  const first = deferred<Blob>();
  const second = deferred<Blob>();
  const renderPage = jest.fn((index: number) => index === 0 ? first.promise : second.promise);
  decode.mockResolvedValue({ pageCount: 2, renderPage });
  const onLoad = jest.fn();
  const { result, rerender, unmount } = renderHook(({ pageNumber }) => useTiffImage({ source, pageNumber, onLoad }), { initialProps: { pageNumber: 1 } });
  await waitFor(() => expect(renderPage).toHaveBeenCalledWith(0));
  rerender({ pageNumber: 2 });
  await waitFor(() => expect(renderPage).toHaveBeenCalledWith(1));
  await act(async () => second.resolve(new Blob(['second'], { type: 'page/second' })));
  await act(async () => first.resolve(new Blob(['first'], { type: 'page/first' })));
  expect(result.current.imageUrl).toBe('blob:page/second');
  expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
  expect(onLoad).toHaveBeenCalledTimes(1);
  unmount();
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:page/second');
});

test('uses the page selected while the source was decoding', async () => {
  const pending = deferred<any>();
  const renderPage = jest.fn().mockResolvedValue(new Blob(['second'], { type: 'page/second' }));
  decode.mockReturnValue(pending.promise);
  const { result, rerender } = renderHook(({ pageNumber }) => useTiffImage({ source, pageNumber }), { initialProps: { pageNumber: 1 } });
  rerender({ pageNumber: 2 });
  await act(async () => pending.resolve({ pageCount: 2, renderPage }));
  await waitFor(() => expect(result.current.imageUrl).toBe('blob:page/second'));
  expect(renderPage).toHaveBeenCalledTimes(1);
  expect(renderPage).toHaveBeenCalledWith(1);
});

test('retrying a failed TIFF URL starts another decode and recovers', async () => {
  const renderPage = jest.fn().mockResolvedValue(new Blob(['ok'], { type: 'image/png' }));
  decode.mockResolvedValueOnce(null).mockResolvedValueOnce({ pageCount: 2, renderPage });
  const onError = jest.fn();
  const onLoad = jest.fn();
  const { result } = renderHook(() => useViewerCore({ document: { fileName: 'scan.tiff', fileUri: source }, onError, onLoad }));
  await waitFor(() => expect(result.current.state.error).not.toBe(''));
  act(() => result.current.actions.handleRetry());
  await waitFor(() => expect(result.current.state.displayImageUrl).toBe('blob:image/png'));
  expect(decode).toHaveBeenCalledTimes(2);
  expect(result.current.state.error).toBe('');
  expect(result.current.state.tiffLoading).toBe(false);
  expect(onLoad).toHaveBeenCalledTimes(1);
  expect(onError).toHaveBeenCalledTimes(1);
});

test('aborts an obsolete request and ignores a late source result', async () => {
  const pending = deferred<any>();
  const oldPage = jest.fn().mockResolvedValue(new Blob(['old']));
  const newPage = jest.fn().mockResolvedValue(new Blob(['new'], { type: 'page/new' }));
  decode.mockReturnValueOnce(pending.promise).mockResolvedValueOnce({ pageCount: 1, renderPage: newPage });
  const onError = jest.fn();
  const { result, rerender } = renderHook(({ url }) => useTiffImage({ source: url, pageNumber: 1, onError }), { initialProps: { url: source } });
  const oldSignal = decode.mock.calls[0][1] as AbortSignal;
  rerender({ url: 'https://example.com/new.tiff' });
  await waitFor(() => expect(result.current.imageUrl).toBe('blob:page/new'));
  expect(oldSignal.aborted).toBe(true);
  await act(async () => pending.resolve({ pageCount: 1, renderPage: oldPage }));
  expect(result.current.imageUrl).toBe('blob:page/new');
  expect(oldPage).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
});

test('revokes the previous page only when its replacement is available', async () => {
  const replacement = deferred<Blob>();
  const renderPage = jest.fn().mockResolvedValueOnce(new Blob(['first'], { type: 'page/first' })).mockReturnValueOnce(replacement.promise);
  decode.mockResolvedValue({ pageCount: 2, renderPage });
  const { result, rerender } = renderHook(({ pageNumber }) => useTiffImage({ source, pageNumber }), { initialProps: { pageNumber: 1 } });
  await waitFor(() => expect(result.current.imageUrl).toBe('blob:page/first'));
  rerender({ pageNumber: 2 });
  expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  await act(async () => replacement.resolve(new Blob(['second'], { type: 'page/second' })));
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:page/first');
  expect(result.current.imageUrl).toBe('blob:page/second');
});
