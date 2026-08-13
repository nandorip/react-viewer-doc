import { useMemo } from 'react';
import { Container, ErrorBoundary } from './components';
import { Viewer } from './Viewer';
import { ViewerProps } from './types';
import { DEFAULT_LOCALE, resolveLabels } from './i18n';

export const ReactDocumentViewer = ({
  document,
  documents,
  documentIndex,
  defaultDocumentIndex,
  onDocumentChange,
  showDocumentList,
  extraToolbar,
  renderToolbar,
  height,
  labels,
  locale = DEFAULT_LOCALE,
  theme = 'light',
  pdfWorkerSrc,
  onLoad,
  onError,
}: ViewerProps) => {
  const resolvedLabels = useMemo(
    () => resolveLabels(locale, labels),
    [locale, labels],
  );

  const errorResetKey = [
    document?.id,
    document?.fileName,
    document?.fileUri,
    document?.fileData,
    documents?.map((item) => item.id ?? item.fileName).join('|'),
    documentIndex,
  ].join('::');

  return (
    <ErrorBoundary labels={resolvedLabels} resetKey={errorResetKey}>
      <Container theme={theme}>
        <Viewer
          document={document}
          documents={documents}
          documentIndex={documentIndex}
          defaultDocumentIndex={defaultDocumentIndex}
          onDocumentChange={onDocumentChange}
          showDocumentList={showDocumentList}
          extraToolbar={extraToolbar}
          renderToolbar={renderToolbar}
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
