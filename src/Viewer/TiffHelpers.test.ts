import UTIF from 'utif';
import * as TiffHelpers from './TiffHelpers';

jest.mock('utif', () => ({
  __esModule: true,
  default: {
    decode: jest.fn(),
    decodeImage: jest.fn(),
    toRGBA8: jest.fn(),
  },
}));

describe('TiffHelpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('identifies TIFF mime type', () => {
    expect(TiffHelpers.isTiffMime('image/tiff')).toBe(true);
    expect(TiffHelpers.isTiffMime('image/png')).toBe(false);
  });

  it('decodes TIFF and renders a page to PNG blob', async () => {
    const mockedUtif = UTIF as jest.Mocked<typeof UTIF>;
    mockedUtif.decode.mockReturnValue([{ width: 2, height: 2, data: new Uint8Array(16) }]);
    mockedUtif.toRGBA8.mockReturnValue(new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255]));

    jest
      .spyOn(TiffHelpers, 'readSourceAsArrayBuffer')
      .mockResolvedValue(new ArrayBuffer(16));

    const source = new Blob(['tiff'], { type: 'image/tiff' });
    const decoded = await TiffHelpers.decodeTiff(source);
    expect(decoded).not.toBeNull();
    expect(decoded?.pageCount).toBe(1);
    expect(typeof decoded?.renderPage).toBe('function');
    expect(mockedUtif.decodeImage).toHaveBeenCalled();
  });
});