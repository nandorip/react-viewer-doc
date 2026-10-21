import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Box, Button } from '@mui/material';
import { Labels } from '../../types';
import { DEFAULT_LOCALE, resolveLabels } from '../../i18n';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  labels?: Labels;
  resetKey?: readonly unknown[];
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Viewer Error:', error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props) {
    const current = this.props.resetKey;
    const previous = prevProps.resetKey;
    const changed = current?.length !== previous?.length
      || current?.some((value, index) => !Object.is(value, previous?.[index]));
    if (this.state.hasError && changed) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const labels = resolveLabels(DEFAULT_LOCALE, this.props.labels);
      return (
        <Box sx={{ p: 2 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={this.handleRetry}>
                {labels.retry}
              </Button>
            }
          >
            {labels.errorBoundary}
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
