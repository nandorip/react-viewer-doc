/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toolbar } from './index';

describe('Toolbar', () => {
  const mockProps = {
    onZoomIn: jest.fn(),
    onZoomOut: jest.fn(),
    onRotate: jest.fn(),
    onReset: jest.fn(),
    onNextChange: jest.fn(),
    onPrevPage: jest.fn(),
    onPageChange: jest.fn(),
    onNewPage: jest.fn(),
    onDownload: jest.fn(),
    onPrint: jest.fn(),
    onFullscreen: jest.fn(),
    pdfPages: 5,
    pdfPage: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all default buttons', () => {
    render(<Toolbar {...mockProps} />);
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
    expect(screen.getByTestId('RemoveIcon')).toBeInTheDocument();
    expect(screen.getByTestId('RefreshIcon')).toBeInTheDocument();
    expect(screen.getByTestId('SettingsBackupRestoreIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ChevronRightIcon')).toBeInTheDocument();
    expect(screen.getByTestId('OpenInNewIcon')).toBeInTheDocument();
    expect(screen.getByTestId('DownloadIcon')).toBeInTheDocument();
    expect(screen.getByTestId('PrintIcon')).toBeInTheDocument();
    expect(screen.getByTestId('FullscreenIcon')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByText('/ 5')).toBeInTheDocument();
  });

  it('hides zoom buttons when hideZoom is true', () => {
    render(<Toolbar {...mockProps} hideZoom />);
    expect(screen.queryByTestId('AddIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('RemoveIcon')).not.toBeInTheDocument();
  });

  it('hides move page buttons when hideMovePage is true', () => {
    render(<Toolbar {...mockProps} hideMovePage />);
    expect(screen.queryByTestId('ChevronLeftIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ChevronRightIcon')).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue('1')).not.toBeInTheDocument();
    expect(screen.queryByText('/ 5')).not.toBeInTheDocument();
  });

  it('calls onZoomIn when zoom in button is clicked', () => {
    render(<Toolbar {...mockProps} />);
    fireEvent.click(screen.getByTestId('AddIcon').closest('button')!);
    expect(mockProps.onZoomIn).toHaveBeenCalledTimes(1);
  });

  it('renders extra content', () => {
    render(<Toolbar {...mockProps} extra={<div data-testid="extra-content">Extra</div>} />);
    expect(screen.getByTestId('extra-content')).toBeInTheDocument();
  });

  it('uses localized labels', async () => {
    render(<Toolbar {...mockProps} labels={{ nextPage: 'Siguiente pagina', currentPage: 'Pagina actual' }} />);

    expect(screen.getByLabelText('Pagina actual')).toBeInTheDocument();
    expect(await screen.findByLabelText('Siguiente pagina')).toBeInTheDocument();
  });
});
