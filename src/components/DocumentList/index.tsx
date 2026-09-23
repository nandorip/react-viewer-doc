import { List, type RowComponentProps } from 'react-window';
import { useElementSize } from '../../hooks/useElementSize';
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

type DocumentListRowProps = {
  documents: DocumentData[];
  activeIndex: number;
  onSelect: (index: number) => void;
  theme: ViewerTheme;
};

function DocumentListRow({
  index,
  style,
  documents,
  activeIndex,
  onSelect,
  theme,
}: RowComponentProps<DocumentListRowProps>) {
  const doc = documents[index];
  return (
    <DocumentListItem
      type="button"
      active={index === activeIndex}
      theme={theme}
      onClick={() => onSelect(index)}
      aria-label={doc.fileName}
      aria-current={index === activeIndex ? 'true' : undefined}
      style={style}
    >
      {doc.fileName}
    </DocumentListItem>
  );
}

export const DocumentList = ({
  documents,
  activeIndex,
  onSelect,
  labels,
  theme = 'light',
}: DocumentListProps) => {
  const { ref, height } = useElementSize<HTMLDivElement>();
  // The header height is approx 33px (10px padding top/bottom + 12px font + 1px border)
  const headerHeight = 33;
  const listHeight = Math.max(0, height - headerHeight);

  return (
    <DocumentListContainer ref={ref} theme={theme} data-testid="document-list">
      <DocumentListHeader theme={theme}>
        {labels?.documents || 'Documents'}
      </DocumentListHeader>
      <List
        rowComponent={DocumentListRow}
        rowCount={documents.length}
        rowHeight={40}
        rowProps={{ documents, activeIndex, onSelect, theme }}
        style={{ height: listHeight, width: '100%' }}
      />
    </DocumentListContainer>
  );
};
