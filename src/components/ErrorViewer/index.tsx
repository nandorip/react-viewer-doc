import { Box, Typography, Alert } from '@mui/material';

export const ErrorViewer = ({ message }: { message: string }) => (
  <Box sx={{ p: 2 }}>
    <Alert severity="error">
      <Typography variant="body2">{message}</Typography>
    </Alert>
  </Box>
);
