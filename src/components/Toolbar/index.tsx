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
  labels?: {
    zoomIn?: string;
    zoomOut?: string;
    rotate?: string;
    reset?: string;
    nextPage?: string;
    prevPage?: string;
    download?: string;
    openInNew?: string;
    print?: string;
    fullscreen?: string;
    thumbnails?: string;
  };
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
}: ToolbarProps) => (
  <ToolbarContainer>
    <Grid container spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
      {onToggleSidebar && (
        <Grid>
          <Tooltip title={labels?.thumbnails || 'Ver Miniaturas'}>
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
            <Tooltip title={labels?.zoomIn || 'Aumentar Zoom'}>
              <span><ToolbarButton icon={<Add />} onClick={onZoomIn} /></span>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip title={labels?.zoomOut || 'Diminuir Zoom'}>
              <span><ToolbarButton icon={<Remove />} onClick={onZoomOut} /></span>
            </Tooltip>
          </Grid>
        </>
      )}
      {!hideRotate && (
        <Grid>
          <Tooltip title={labels?.rotate || 'Girar'}>
            <span><ToolbarButton icon={<Refresh />} onClick={onRotate} /></span>
          </Tooltip>
        </Grid>
      )}
      {!hideReset && (
        <Grid>
          <Tooltip title={labels?.reset || 'Resetar'}>
            <span><ToolbarButton icon={<SettingsBackupRestore />} onClick={onReset} /></span>
          </Tooltip>
        </Grid>
      )}
      {!hideMovePage && (
        <>
          <Grid>
            <Tooltip title={labels?.prevPage || 'Página Anterior'}>
              <span><ToolbarButton icon={<ChevronLeft />} onClick={onPrevPage} /></span>
            </Tooltip>
          </Grid>
          <Grid>
            <DisplayPageNumber totalPages={pdfPages} page={pdfPage} onPageChange={onPageChange} />
          </Grid>
          <Grid>
            <Tooltip title={labels?.nextPage || 'Próxima Página'}>
              <span><ToolbarButton icon={<ChevronRight />} onClick={onNextChange} /></span>
            </Tooltip>
          </Grid>
        </>
      )}
      {onDownload && (
        <Grid>
          <Tooltip title={labels?.download || 'Download'}>
            <span><ToolbarButton icon={<Download />} onClick={onDownload} /></span>
          </Tooltip>
        </Grid>
      )}
      {onPrint && (
        <Grid>
          <Tooltip title={labels?.print || 'Imprimir'}>
            <span><ToolbarButton icon={<Print />} onClick={onPrint} /></span>
          </Tooltip>
        </Grid>
      )}
      {onNewPage && (
        <Grid>
          <Tooltip title={labels?.openInNew || 'Abrir em nova aba'}>
            <span><ToolbarButton icon={<OpenInNew />} onClick={onNewPage} /></span>
          </Tooltip>
        </Grid>
      )}
      {onFullscreen && (
        <Grid>
          <Tooltip title={labels?.fullscreen || 'Tela Cheia'}>
            <span><ToolbarButton icon={<Fullscreen />} onClick={onFullscreen} /></span>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  </ToolbarContainer>
);
