import { Page } from 'react-pdf';
import { ThumbnailItem, ThumbnailPlaceholder } from '../../styles';
import { ViewerTheme } from '../../types';

interface LazyPdfThumbnailProps {
  pageNumber: number;
  active: boolean;
  width: number;
  theme: ViewerTheme;
  loadingLabel: string;
  onSelect: (page: number) => void;
  onLoadError: (error: Error) => void;
  style?: React.CSSProperties;
}

export const LazyPdfThumbnail = ({
  pageNumber,
  active,
  width,
  theme,
  loadingLabel,
  onSelect,
  onLoadError,
  style,
}: LazyPdfThumbnailProps) => {
  return (
    <ThumbnailItem
      type="button"
      active={active}
      theme={theme}
      onClick={() => onSelect(pageNumber)}
      aria-label={`Page ${pageNumber}`}
      aria-current={active ? 'page' : undefined}
      style={style}
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        onLoadError={onLoadError}
        loading={<ThumbnailPlaceholder theme={theme}>{loadingLabel}</ThumbnailPlaceholder>}
      />
      <div style={{ fontSize: '12px' }}>{pageNumber}</div>
    </ThumbnailItem>
  );
};