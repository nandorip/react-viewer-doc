import { Box, Typography, Alert, Button } from '@mui/material';

interface ErrorViewerProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorViewer = ({ message, onRetry, retryLabel = 'Retry' }: ErrorViewerProps) => (
  <Box sx={{ p: 2 }}>
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : undefined
      }
    >
      <Typography variant="body2">{message}</Typography>
    </Alert>
  </Box>
);