import { Page } from 'react-pdf';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
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
}

export const LazyPdfThumbnail = ({
  pageNumber,
  active,
  width,
  theme,
  loadingLabel,
  onSelect,
  onLoadError,
}: LazyPdfThumbnailProps) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLButtonElement>({
    rootMargin: '160px',
  });

  return (
    <ThumbnailItem
      ref={ref}
      type="button"
      active={active}
      theme={theme}
      onClick={() => onSelect(pageNumber)}
      aria-label={`Page ${pageNumber}`}
      aria-current={active ? 'page' : undefined}
    >
      {isIntersecting ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          onLoadError={onLoadError}
          loading={<ThumbnailPlaceholder theme={theme}>{loadingLabel}</ThumbnailPlaceholder>}
        />
      ) : (
        <ThumbnailPlaceholder theme={theme} style={{ width, minHeight: width * 1.3 }} />
      )}
      <div style={{ fontSize: '12px' }}>{pageNumber}</div>
    </ThumbnailItem>
  );
};