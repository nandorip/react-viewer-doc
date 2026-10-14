import UTIF from 'utif2';
import * as TiffHelpers from './TiffHelpers';

jest.mock('utif2', () => ({ __esModule: true, default: { decode: jest.fn(), decodeImage: jest.fn(), toRGBA8: jest.fn() } }));
const mockedUtif = UTIF as jest.Mocked<typeof UTIF>;

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(TiffHelpers, 'readSourceAsArrayBuffer').mockResolvedValue(new ArrayBuffer(16));
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    createImageData: (width: number, height: number) => ({ data: new Uint8ClampedArray(width * height * 4) }),
    putImageData: jest.fn(),
  } as any);
  jest.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(callback => callback(new Blob(['png'], { type: 'image/png' })));
  mockedUtif.toRGBA8.mockReturnValue(new Uint8Array(16));
});
afterEach(() => jest.restoreAllMocks());

test('recognizes TIFF MIME aliases', () => {
  expect(TiffHelpers.isTiffMime('image/tiff')).toBe(true);
  expect(TiffHelpers.isTiffMime('image/tif')).toBe(true);
  expect(TiffHelpers.isTiffMime('IMAGE/TIFF')).toBe(true);
  expect(TiffHelpers.isTiffMime('image/png')).toBe(false);
});

test('decodes only requested pages and releases the previous decoded page', async () => {
  const pages = [{ width: 2, height: 2, data: undefined as Uint8Array | undefined }, { width: 2, height: 2, data: undefined as Uint8Array | undefined }];
  mockedUtif.decode.mockReturnValue(pages);
  mockedUtif.decodeImage.mockImplementation((_buffer, page) => { page.data = new Uint8Array(4); });
  const decoded = await TiffHelpers.decodeTiff(new Blob(['tiff']));
  expect(decoded?.pageCount).toBe(2);
  expect(mockedUtif.decodeImage).not.toHaveBeenCalled();
  expect((await decoded?.renderPage(0))?.type).toBe('image/png');
  expect(pages[0].data).toBeDefined();
  expect(pages[1].data).toBeUndefined();
  await decoded?.renderPage(1);
  expect(pages[0].data).toBeUndefined();
  expect(pages[1].data).toBeDefined();
  expect(mockedUtif.decodeImage.mock.calls.map(call => call[1])).toEqual([pages[0], pages[1]]);
  await decoded?.renderPage(0);
  expect(pages[1].data).toBeUndefined();
  expect(pages[0].data).toBeDefined();
});

test('returns null on malformed input or page decode failure', async () => {
  mockedUtif.decode.mockImplementationOnce(() => { throw new Error('bad tiff'); });
  expect(await TiffHelpers.decodeTiff(new Blob(['bad']))).toBeNull();
  mockedUtif.decode.mockReturnValue([{ width: 2, height: 2 }]);
  const decoded = await TiffHelpers.decodeTiff(new Blob(['tiff']));
  expect(await decoded?.renderPage(2)).toBeNull();
  expect(await decoded?.renderPage(0.5)).toBeNull();
  mockedUtif.decodeImage.mockImplementation(() => { throw new Error('bad page'); });
  expect(await decoded?.renderPage(0)).toBeNull();
});

test('does not decode an aborted source', async () => {
  const controller = new AbortController();
  controller.abort();
  expect(await TiffHelpers.decodeTiff(new Blob(['tiff']), controller.signal)).toBeNull();
  expect(mockedUtif.decode).not.toHaveBeenCalled();
});

test('passes cancellation to fetch', async () => {
  (TiffHelpers.readSourceAsArrayBuffer as jest.Mock).mockRestore();
  const originalFetch = globalThis.fetch;
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
  globalThis.fetch = fetchMock;
  try {
    const controller = new AbortController();
    await TiffHelpers.readSourceAsArrayBuffer('https://example.com/scan.tiff', controller.signal);
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/scan.tiff', { signal: controller.signal });
    controller.abort();
    expect(await TiffHelpers.readSourceAsArrayBuffer('https://example.com/scan.tiff', controller.signal)).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  } finally { globalThis.fetch = originalFetch; }
});
