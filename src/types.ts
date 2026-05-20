export interface DocumentData {
  fileData?: string;
  fileUri?: string;
  fileName: string;
}

export interface Labels {
  zoomIn?: string;
  zoomOut?: string;
  rotate?: string;
  reset?: string;
  nextPage?: string;
  prevPage?: string;
  download?: string;
  openInNew?: string;
  loading?: string;
  error?: string;
  thumbnails?: string;
  print?: string;
  fullscreen?: string;
  unsupportedFile?: string;
}

export interface ViewerProps {
  document?: DocumentData;
  extraToolbar?: React.ReactNode;
  height?: string | number;
  labels?: Labels;
  pdfWorkerSrc?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}
