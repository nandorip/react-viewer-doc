/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Viewer } from './index';

// Mock das dependências externas que podem ser difíceis em JSDOM
jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: '',
    },
    version: '1.2.3',
  },
  Document: ({ children, onLoadSuccess }: any) => {
    // Simular o evento de sucesso após a renderização
    React.useEffect(() => {
      onLoadSuccess?.({ numPages: 5 });
    }, [onLoadSuccess]);
    return <div data-testid="mock-pdf-document">{children}</div>;
  },
  Page: ({ pageNumber, scale, rotate }: any) => (
    <div data-testid="mock-pdf-page">
      Page: {pageNumber}, Scale: {scale}, Rotate: {rotate}
    </div>
  ),
}));

jest.mock('react-image-pan-zoom-rotate', () => ({
  PanViewer: ({ children, zoom }: any) => (
    <div data-testid="mock-pan-viewer" data-zoom={zoom}>
      {children}
    </div>
  ),
}));

describe('Viewer', () => {
  it('renders correctly with no document', () => {
    render(<Viewer />);
    // O toolbar deve estar lá, mas sem botões de página
    expect(screen.queryByText(/1 \/ 0/)).not.toBeInTheDocument();
  });

  it('renders image correctly', () => {
    const document = {
      fileName: 'test.jpg',
      fileUri: 'http://example.com/test.jpg',
    };
    render(<Viewer document={document} />);
    expect(screen.getByTestId('mock-pan-viewer')).toBeInTheDocument();
    expect(screen.getByAltText('document')).toHaveAttribute('src', 'http://example.com/test.jpg');
  });

  it('renders PDF correctly', async () => {
    const document = {
      fileName: 'test.pdf',
      fileUri: 'http://example.com/test.pdf',
    };
    render(<Viewer document={document} />);
    expect(await screen.findByTestId('mock-pdf-document')).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 5/)).toBeInTheDocument();
  });

  it('handles zoom in and zoom out', () => {
    const document = {
      fileName: 'test.jpg',
      fileUri: 'http://example.com/test.jpg',
    };
    render(<Viewer document={document} />);
    const zoomInBtn = screen.getByTestId('AddIcon').closest('button')!;
    const zoomOutBtn = screen.getByTestId('RemoveIcon').closest('button')!;

    fireEvent.click(zoomInBtn);
    // Zoom inicial é 1, sensibilidade é 0.1
    expect(screen.getByTestId('mock-pan-viewer')).toHaveAttribute('data-zoom', '1.1');

    fireEvent.click(zoomOutBtn);
    expect(screen.getByTestId('mock-pan-viewer')).toHaveAttribute('data-zoom', '1');
  });

  it('handles rotation', () => {
    const document = {
      fileName: 'test.jpg',
      fileUri: 'http://example.com/test.jpg',
    };
    render(<Viewer document={document} />);
    const rotateBtn = screen.getByTestId('RefreshIcon').closest('button')!;

    fireEvent.click(rotateBtn);
    // Verificamos o estilo da imagem se o mock permitir ou o estado via props do container
    // Mas no caso da imagem, a rotação é passada via styled-components prop
    // O mock do PanViewer não mostra a rotação, mas a img dentro do ImageContainer sim.
    const img = screen.getByAltText('document');
    expect(img).toHaveStyle('transform: rotate(90deg) scale(1)');
  });

  it('resets state on reset button click', () => {
    const document = {
      fileName: 'test.jpg',
      fileUri: 'http://example.com/test.jpg',
    };
    render(<Viewer document={document} />);
    const zoomInBtn = screen.getByTestId('AddIcon').closest('button')!;
    const rotateBtn = screen.getByTestId('RefreshIcon').closest('button')!;
    const resetBtn = screen.getByTestId('FullscreenIcon').closest('button')!;

    fireEvent.click(zoomInBtn);
    fireEvent.click(rotateBtn);

    const img = screen.getByAltText('document');
    expect(img).toHaveStyle('transform: rotate(90deg) scale(1.1)');

    fireEvent.click(resetBtn);
    expect(img).toHaveStyle('transform: rotate(0deg) scale(1)');
  });

  it('changes PDF pages', async () => {
    const document = {
      fileName: 'test.pdf',
      fileUri: 'http://example.com/test.pdf',
    };
    render(<Viewer document={document} />);
    expect(await screen.findByText(/1 \/ 5/)).toBeInTheDocument();

    const nextBtn = screen.getByTestId('ChevronRightIcon').closest('button')!;
    fireEvent.click(nextBtn);
    expect(screen.getByText(/2 \/ 5/)).toBeInTheDocument();

    const prevBtn = screen.getByTestId('ChevronLeftIcon').closest('button')!;
    fireEvent.click(prevBtn);
    expect(screen.getByText(/1 \/ 5/)).toBeInTheDocument();
  });

  it('applies custom height to containers', () => {
    const document = {
      fileName: 'test.jpg',
      fileUri: 'http://example.com/test.jpg',
    };
    const { rerender } = render(<Viewer document={document} height={500} />);
    expect(screen.getByTestId('image-container')).toHaveStyle('height: 500px');

    const pdfDoc = {
      fileName: 'test.pdf',
      fileUri: 'http://example.com/test.pdf',
    };
    rerender(<Viewer document={pdfDoc} height="80vh" />);
    expect(screen.getByTestId('document-container')).toHaveStyle('height: 80vh');
  });

  it('renders image from base64 data correctly', () => {
    const document = {
      fileName: 'test.png',
      fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    };
    render(<Viewer document={document} />);
    const img = screen.getByAltText('document');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
  });
});
