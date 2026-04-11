import { Grid } from '@mui/material';

export const ErrorViewer = ({ message }: { message: string }) => (
  <Grid sx={{ color: 'error.main', p: 2 }}>{message}</Grid>
);
