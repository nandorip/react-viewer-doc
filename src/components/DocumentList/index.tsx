import { DocumentData, Labels, ViewerTheme } from '../../types';
import {
  DocumentListContainer,
  DocumentListHeader,
  DocumentListItem,
} from '../../styles';

interface DocumentListProps {
  documents: DocumentData[];
  activeIndex: number;
  onSelect: (index: number) => void;
  labels?: Labels;
  theme?: ViewerTheme;
}

export const DocumentList = ({
  documents,
  activeIndex,
  onSelect,
  labels,
  theme = 'light',
}: DocumentListProps) => (
  <DocumentListContainer theme={theme} data-testid="document-list">
    <DocumentListHeader theme={theme}>
      {labels?.documents || 'Documents'}
    </DocumentListHeader>
    {documents.map((doc, index) => (
      <DocumentListItem
        key={doc.id ?? `${doc.fileName}-${index}`}
        type="button"
        active={index === activeIndex}
        theme={theme}
        onClick={() => onSelect(index)}
        aria-label={`${labels?.currentDocument || 'Current document'}: ${doc.fileName}`}
        aria-current={index === activeIndex ? 'true' : undefined}
      >
        {doc.fileName}
      </DocumentListItem>
    ))}
  </DocumentListContainer>
);