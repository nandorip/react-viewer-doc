import { Container, ErrorBoundary } from './components';
import { Viewer } from './Viewer';
import { ViewerProps } from './types';

export const ReactDocumentViewer = ({
  document,
  extraToolbar,
  height,
  labels,
  pdfWorkerSrc,
  onLoad,
  onError
}: ViewerProps) => (
  <ErrorBoundary labels={labels}>
    <Container>
      <Viewer 
        document={document} 
        extraToolbar={extraToolbar} 
        height={height} 
        labels={labels}
        pdfWorkerSrc={pdfWorkerSrc}
        onLoad={onLoad}
        onError={onError}
      />
    </Container>
  </ErrorBoundary>
);
