import { Grid, Tooltip } from '@mui/material';
import {
  Add,
  Remove,
  Refresh,
  Fullscreen,
  ChevronLeft,
  ChevronRight,
  OpenInNew,
  Download,
  Print,
  SettingsBackupRestore,
  ViewList,
} from '@mui/icons-material';
import { ToolbarContainer } from '../../styles';
import { ToolbarButton } from './ToolbarButton';
import { DisplayPageNumber } from './DisplayPageNumber';
import { Labels } from '../../types';
import { DEFAULT_LOCALE, resolveLabels } from '../../i18n';

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onReset: () => void;
  onNextChange: () => void;
  onPrevPage: () => void;
  onPageChange: (page: number) => void;
  onNewPage?: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
  onFullscreen?: () => void;
  onToggleSidebar?: () => void;
  hideZoom?: boolean;
  hideRotate?: boolean;
  hideReset?: boolean;
  hideMovePage?: boolean;
  pdfPages: number;
  pdfPage: number;
  showSidebar?: boolean;
  extra?: React.ReactNode;
  labels?: Labels;
}

export const Toolbar = ({
  onZoomIn,
  onZoomOut,
  onRotate,
  onReset,
  onNextChange,
  onPrevPage,
  onPageChange,
  onNewPage,
  onDownload,
  onPrint,
  onFullscreen,
  onToggleSidebar,
  hideZoom,
  hideRotate,
  hideReset,
  hideMovePage,
  pdfPages,
  pdfPage,
  showSidebar,
  extra,
  labels,
}: ToolbarProps) => {
  const resolvedLabels = labels ?? resolveLabels(DEFAULT_LOCALE);

  return (
  <ToolbarContainer>
    <Grid
      container
      spacing={{ xs: 0.25, sm: 1 }}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        rowGap: { xs: 0.25, sm: 0.5 },
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {onToggleSidebar && (
        <Grid>
          <Tooltip title={resolvedLabels.thumbnails}>
            <span><ToolbarButton icon={<ViewList color={showSidebar ? 'primary' : 'inherit'} />} onClick={onToggleSidebar} /></span>
          </Tooltip>
        </Grid>
      )}
      {extra && (
        <Grid>
          {extra}
        </Grid>
      )}
      {!hideZoom && (
        <>
          <Grid>
            <Tooltip title={resolvedLabels.zoomIn}>
              <span><ToolbarButton icon={<Add />} onClick={onZoomIn} /></span>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title={resolvedLabels.zoomOut}>
              <span><ToolbarButton icon={<Remove />} onClick={onZoomOut} /></span>
            </Tooltip>
          </Grid>
        </>
      )}
      {!hideRotate && (
        <Grid>
          <Tooltip title={resolvedLabels.rotate}>
            <span><ToolbarButton icon={<Refresh />} onClick={onRotate} /></span>
          </Tooltip>
        </Grid>
      )}
      {!hideReset && (
        <Grid>
          <Tooltip title={resolvedLabels.reset}>
            <span><ToolbarButton icon={<SettingsBackupRestore />} onClick={onReset} /></span>
          </Tooltip>
        </Grid>
      )}
      {!hideMovePage && (
        <>
          <Grid>
            <Tooltip title={resolvedLabels.prevPage}>
              <span><ToolbarButton icon={<ChevronLeft />} onClick={onPrevPage} /></span>
            </Tooltip>
          </Grid>
          <Grid>
            <DisplayPageNumber totalPages={pdfPages} page={pdfPage} onPageChange={onPageChange} ariaLabel={resolvedLabels.currentPage} />
          </Grid>
          <Grid>
            <Tooltip title={resolvedLabels.nextPage}>
              <span><ToolbarButton icon={<ChevronRight />} onClick={onNextChange} /></span>
            </Tooltip>
          </Grid>
        </>
      )}
      {onDownload && (
        <Grid>
          <Tooltip title={resolvedLabels.download}>
            <span><ToolbarButton icon={<Download />} onClick={onDownload} /></span>
          </Tooltip>
        </Grid>
      )}
      {onPrint && (
        <Grid>
          <Tooltip title={resolvedLabels.print}>
            <span><ToolbarButton icon={<Print />} onClick={onPrint} /></span>
          </Tooltip>
        </Grid>
      )}
      {onNewPage && (
        <Grid>
          <Tooltip title={resolvedLabels.openInNew}>
            <span><ToolbarButton icon={<OpenInNew />} onClick={onNewPage} /></span>
          </Tooltip>
        </Grid>
      )}
      {onFullscreen && (
        <Grid>
          <Tooltip title={resolvedLabels.fullscreen}>
            <span><ToolbarButton icon={<Fullscreen />} onClick={onFullscreen} /></span>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  </ToolbarContainer>
  );
};
