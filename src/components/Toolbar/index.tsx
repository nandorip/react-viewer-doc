import { Grid } from '@mui/material';
import {
  Add,
  Remove,
  Refresh,
  Fullscreen,
  ChevronLeft,
  ChevronRight,
  OpenInNew,
} from '@mui/icons-material';
import { ToolbarButton } from './ToolbarButton';
import { DisplayPageNumber } from './DisplayPageNumber';

interface ToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onReset: () => void;
  onNextChange: () => void;
  onPrevPage: () => void;
  onNewPage?: () => void;
  hideZoom?: boolean;
  hideRotate?: boolean;
  hideReset?: boolean;
  hideMovePage?: boolean;
  pdfPages: number;
  pdfPage: number;
  extra?: React.ReactNode;
}

export const Toolbar = ({
  onZoomIn,
  onZoomOut,
  onRotate,
  onReset,
  onNextChange,
  onPrevPage,
  onNewPage,
  hideZoom,
  hideRotate,
  hideReset,
  hideMovePage,
  pdfPages,
  pdfPage,
  extra,
}: ToolbarProps) => (
  <Grid container spacing={1} sx={{ alignItems: 'center' }}>
    {extra && (
      <Grid>
        {extra}
      </Grid>
    )}
    {!hideZoom && (
      <>
        <Grid>
          <ToolbarButton icon={<Add />} onClick={onZoomIn} />
        </Grid>
        <Grid>
          <ToolbarButton icon={<Remove />} onClick={onZoomOut} />
        </Grid>
      </>
    )}
    {!hideRotate && (
      <Grid>
        <ToolbarButton icon={<Refresh />} onClick={onRotate} />
      </Grid>
    )}
    {!hideReset && (
      <Grid>
        <ToolbarButton icon={<Fullscreen />} onClick={onReset} />
      </Grid>
    )}
    {!hideMovePage && (
      <>
        <Grid>
          <ToolbarButton icon={<ChevronLeft />} onClick={onPrevPage} />
        </Grid>
        <Grid>
          <DisplayPageNumber totalPages={pdfPages} page={pdfPage} />
        </Grid>
        <Grid>
          <ToolbarButton icon={<ChevronRight />} onClick={onNextChange} />
        </Grid>
      </>
    )}
    {onNewPage && (
      <Grid>
        <ToolbarButton icon={<OpenInNew />} onClick={onNewPage} />
      </Grid>
    )}
  </Grid>
);
