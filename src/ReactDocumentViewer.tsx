import { useMemo } from 'react';
import { Container, ErrorBoundary } from './components';
import { Viewer } from './Viewer';
import { ViewerProps } from './types';
import { DEFAULT_LOCALE, resolveLabels } from './i18n';

export const ReactDocumentViewer = ({
  document,
  extraToolbar,
  height,
  labels,
  locale = DEFAULT_LOCALE,
  theme = 'light',
  pdfWorkerSrc,
  onLoad,
  onError
}: ViewerProps) => {
  const resolvedLabels = useMemo(
    () => resolveLabels(locale, labels),
    [locale, labels],
  );

  return (
  <ErrorBoundary labels={resolvedLabels}>
    <Container theme={theme}>
      <Viewer 
        document={document} 
        extraToolbar={extraToolbar} 
        height={height} 
        labels={resolvedLabels}
        locale={locale}
        theme={theme}
        pdfWorkerSrc={pdfWorkerSrc}
        onLoad={onLoad}
        onError={onError}
      />
    </Container>
  </ErrorBoundary>
  );
};
