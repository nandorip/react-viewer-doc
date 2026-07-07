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
import { Labels, ViewerTheme, ToolbarActions } from '../../types';
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
  extra?: React.ReactNode | ((actions: ToolbarActions) => React.ReactNode);
  labels?: Labels;
  theme?: ViewerTheme;
  toolbarActions?: ToolbarActions;
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
  theme = 'light',
  toolbarActions,
}: ToolbarProps) => {
  const resolvedLabels = labels ?? resolveLabels(DEFAULT_LOCALE);
  const resolvedExtra = typeof extra === 'function' ? extra(toolbarActions!) : extra;

  return (
  <ToolbarContainer theme={theme}>
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
          <Tooltip title={resolvedLabels.thumbnails} describeChild>
            <ToolbarButton icon={<ViewList color={showSidebar ? 'primary' : 'inherit'} />} onClick={onToggleSidebar} ariaLabel={resolvedLabels.thumbnails} />
          </Tooltip>
        </Grid>
      )}
      {resolvedExtra && (
        <Grid>
          {resolvedExtra}
        </Grid>
      )}
      {!hideZoom && (
        <>
          <Grid>
            <Tooltip title={resolvedLabels.zoomIn} describeChild>
              <ToolbarButton icon={<Add />} onClick={onZoomIn} ariaLabel={resolvedLabels.zoomIn} />
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title={resolvedLabels.zoomOut} describeChild>
              <ToolbarButton icon={<Remove />} onClick={onZoomOut} ariaLabel={resolvedLabels.zoomOut} />
            </Tooltip>
          </Grid>
        </>
      )}
      {!hideRotate && (
        <Grid>
          <Tooltip title={resolvedLabels.rotate} describeChild>
            <ToolbarButton icon={<Refresh />} onClick={onRotate} ariaLabel={resolvedLabels.rotate} />
          </Tooltip>
        </Grid>
      )}
      {!hideReset && (
        <Grid>
          <Tooltip title={resolvedLabels.reset} describeChild>
            <ToolbarButton icon={<SettingsBackupRestore />} onClick={onReset} ariaLabel={resolvedLabels.reset} />
          </Tooltip>
        </Grid>
      )}
      {!hideMovePage && (
        <>
          <Grid>
            <Tooltip title={resolvedLabels.prevPage} describeChild>
              <ToolbarButton icon={<ChevronLeft />} onClick={onPrevPage} ariaLabel={resolvedLabels.prevPage} />
            </Tooltip>
          </Grid>
          <Grid>
            <DisplayPageNumber totalPages={pdfPages} page={pdfPage} onPageChange={onPageChange} ariaLabel={resolvedLabels.currentPage} theme={theme} />
          </Grid>
          <Grid>
            <Tooltip title={resolvedLabels.nextPage} describeChild>
              <ToolbarButton icon={<ChevronRight />} onClick={onNextChange} ariaLabel={resolvedLabels.nextPage} />
            </Tooltip>
          </Grid>
        </>
      )}
      {onDownload && (
        <Grid>
          <Tooltip title={resolvedLabels.download} describeChild>
            <ToolbarButton icon={<Download />} onClick={onDownload} ariaLabel={resolvedLabels.download} />
          </Tooltip>
        </Grid>
      )}
      {onPrint && (
        <Grid>
          <Tooltip title={resolvedLabels.print} describeChild>
            <ToolbarButton icon={<Print />} onClick={onPrint} ariaLabel={resolvedLabels.print} />
          </Tooltip>
        </Grid>
      )}
      {onNewPage && (
        <Grid>
          <Tooltip title={resolvedLabels.openInNew} describeChild>
            <ToolbarButton icon={<OpenInNew />} onClick={onNewPage} ariaLabel={resolvedLabels.openInNew} />
          </Tooltip>
        </Grid>
      )}
      {onFullscreen && (
        <Grid>
          <Tooltip title={resolvedLabels.fullscreen} describeChild>
            <ToolbarButton icon={<Fullscreen />} onClick={onFullscreen} ariaLabel={resolvedLabels.fullscreen} />
          </Tooltip>
        </Grid>
      )}
    </Grid>
  </ToolbarContainer>
  );
};
