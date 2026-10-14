import UTIF from 'utif2';

export const TIFF_MIME = 'image/tiff';

export const isTiffMime = (mime?: string): boolean =>
  mime?.toLowerCase() === TIFF_MIME || mime?.toLowerCase() === 'image/tif';

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

export const readSourceAsArrayBuffer = async (source: Blob | string, signal?: AbortSignal): Promise<ArrayBuffer | null> => {
  try {
    if (signal?.aborted) return null;
    if (source instanceof Blob) {
      return source.arrayBuffer();
    }

    const response = await fetch(source, { signal });
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

export const decodeTiff = async (source: Blob | string, signal?: AbortSignal): Promise<DecodedTiff | null> => {
  try {
    const buffer = await readSourceAsArrayBuffer(source, signal);
    if (!buffer || signal?.aborted) return null;

    const ifds = UTIF.decode(buffer);
    if (!ifds.length) return null;

    // Keep only the most recently requested page decoded, rather than the entire file.
    let decodedPage: typeof ifds[number] | undefined;

    return {
      pageCount: ifds.length,
      renderPage: async (pageIndex: number) => {
        try {
          if (signal?.aborted || !Number.isInteger(pageIndex)) return null;
          const ifd = ifds[pageIndex];
          if (!ifd) return null;

          if (decodedPage && decodedPage !== ifd) delete decodedPage.data;
          decodedPage = ifd;
          UTIF.decodeImage(buffer, ifd, ifds);
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
