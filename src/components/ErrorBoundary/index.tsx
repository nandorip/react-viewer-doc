import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Box } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  labels?: {
    error?: string;
  };
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

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Box sx={{ p: 2 }}>
          <Alert severity="error">
            {this.props.labels?.error || 'Desculpe, algo deu errado ao carregar o visualizador.'}
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}
