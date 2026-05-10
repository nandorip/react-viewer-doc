import { Container, ErrorBoundary } from './components';
import { Viewer } from './Viewer';

type Props = {
  document?: { fileData?: string; fileUri?: string; fileName: string };
  extraToolbar?: React.ReactNode;
  height?: string | number;
  labels?: {
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
  };
  onLoad?: () => void;
  onError?: (error: string) => void;
};

export const ReactDocumentViewer = ({ 
  document, 
  extraToolbar, 
  height,
  labels,
  onLoad,
  onError
}: Props) => (
  <ErrorBoundary labels={labels}>
    <Container>
      <Viewer 
        document={document} 
        extraToolbar={extraToolbar} 
        height={height} 
        labels={labels}
        onLoad={onLoad}
        onError={onError}
      />
    </Container>
  </ErrorBoundary>
);
