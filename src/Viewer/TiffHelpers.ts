import UTIF from 'utif2';

export const TIFF_MIME = 'image/tiff';

export const isTiffMime = (mime?: string): boolean => mime === TIFF_MIME;

const rgbaToPngBlob = (rgba: Uint8Array, width: number, height: number): Promise<Blob | null> => {
  if (typeof document === 'undefined') return Promise.resolve(null);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);

  const imageData = context.createImageData(width, height);
  imageData.data.set(rgba);
  context.putImageData(imageData, 0, 0);

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), 'image/png');
  });
};

export const readSourceAsArrayBuffer = async (source: Blob | string): Promise<ArrayBuffer | null> => {
  try {
    if (source instanceof Blob) {
      return source.arrayBuffer();
    }

    const response = await fetch(source);
    if (!response.ok) return null;
    return response.arrayBuffer();
  } catch {
    return null;
  }
};

export interface DecodedTiff {
  pageCount: number;
  renderPage: (pageIndex: number) => Promise<Blob | null>;
}

export const decodeTiff = async (source: Blob | string): Promise<DecodedTiff | null> => {
  try {
    const buffer = await readSourceAsArrayBuffer(source);
    if (!buffer) return null;

    const ifds = UTIF.decode(buffer);
    if (!ifds.length) return null;

    ifds.forEach(ifd => UTIF.decodeImage(buffer, ifd));

    return {
      pageCount: ifds.length,
      renderPage: async (pageIndex: number) => {
        try {
          const ifd = ifds[pageIndex];
          if (!ifd) return null;

          const rgba = UTIF.toRGBA8(ifd);
          return rgbaToPngBlob(rgba, ifd.width, ifd.height);
        } catch {
          return null;
        }
      },
    };
  } catch {
    return null;
  }
};