import UTIF from 'utif2';
import * as TiffHelpers from './TiffHelpers';

jest.mock('utif2', () => ({
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

  it('returns null when UTIF throws on malformed bytes', async () => {
    const mockedUtif = UTIF as jest.Mocked<typeof UTIF>;
    mockedUtif.decode.mockImplementation(() => {
      throw new Error('bad tiff');
    });
    jest
      .spyOn(TiffHelpers, 'readSourceAsArrayBuffer')
      .mockResolvedValue(new ArrayBuffer(8));

    const decoded = await TiffHelpers.decodeTiff(new Blob(['bad'], { type: 'image/tiff' }));
    expect(decoded).toBeNull();
  });
});