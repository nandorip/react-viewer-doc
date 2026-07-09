import { DisplayDocument } from '../../../styles';
import { ViewerTheme } from '../../../types';

interface Props {
  index: number;
  total: number;
  fileName: string;
  ariaLabel?: string;
  theme?: ViewerTheme;
}

export const DisplayDocumentIndex = ({
  index,
  total,
  fileName,
  ariaLabel = 'Current document',
  theme = 'light',
}: Props) => (
  <DisplayDocument theme={theme} aria-label={ariaLabel}>
    <span title={fileName}>{fileName}</span>
    <span>{`(${index + 1} / ${total})`}</span>
  </DisplayDocument>
);