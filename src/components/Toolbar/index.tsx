import { Grid, Tooltip } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Refresh from '@mui/icons-material/Refresh';
import Fullscreen from '@mui/icons-material/Fullscreen';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Download from '@mui/icons-material/Download';
import Print from '@mui/icons-material/Print';
import SettingsBackupRestore from '@mui/icons-material/SettingsBackupRestore';
import ViewList from '@mui/icons-material/ViewList';
import { ToolbarContainer } from '../../styles';
import { ToolbarButton } from './ToolbarButton';
import { DisplayPageNumber } from './DisplayPageNumber';
import { DisplayDocumentIndex } from './DisplayDocumentIndex';
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
  hideDocumentNav?: boolean;
  onPrevDocument?: () => void;
  onNextDocument?: () => void;
  documentIndex?: number;
  documentCount?: number;
  currentDocumentName?: string;
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
  hideDocumentNav,
  onPrevDocument,
  onNextDocument,
  documentIndex = 0,
  documentCount = 0,
  currentDocumentName,
  pdfPages,
  pdfPage,
  showSidebar,
  extra,
  labels,
  theme = 'light',
  toolbarActions,
}: ToolbarProps) => {
  const resolvedLabels = labels ?? resolveLabels(DEFAULT_LOCALE);
  const resolvedExtra = typeof extra === 'function'
    ? (toolbarActions ? extra(toolbarActions) : null)
    : extra;

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
      {!hideDocumentNav && onPrevDocument && onNextDocument && documentCount > 1 && (
        <>
          <Grid>
            <Tooltip title={resolvedLabels.prevDocument} describeChild>
              <ToolbarButton icon={<NavigateBefore />} onClick={onPrevDocument} ariaLabel={resolvedLabels.prevDocument} />
            </Tooltip>
          </Grid>
          <Grid>
            <DisplayDocumentIndex
              index={documentIndex}
              total={documentCount}
              fileName={currentDocumentName ?? resolvedLabels.defaultDocumentName ?? 'document'}
              ariaLabel={resolvedLabels.currentDocument}
              theme={theme}
            />
          </Grid>
          <Grid>
            <Tooltip title={resolvedLabels.nextDocument} describeChild>
              <ToolbarButton icon={<NavigateNext />} onClick={onNextDocument} ariaLabel={resolvedLabels.nextDocument} />
            </Tooltip>
          </Grid>
        </>
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
