/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactDocumentViewer } from './ReactDocumentViewer';

// Mock do Viewer para testar apenas o componente ReactDocumentViewer
jest.mock('./Viewer', () => ({
  Viewer: ({ document, labels, locale, theme }: any) => (
    <div data-testid="mock-viewer">
      Viewer for {document?.fileName || 'no file'}
      {labels?.reset && <span>{labels.reset}</span>}
      {locale && <span>{locale}</span>}
      {theme && <span>{theme}</span>}
    </div>
  ),
}));

describe('ReactDocumentViewer', () => {
  it('renders without error', () => {
    render(<ReactDocumentViewer />);
    expect(screen.getByTestId('mock-viewer')).toBeInTheDocument();
    expect(screen.getByText(/no file/)).toBeInTheDocument();
  });

  it('passes document prop correctly', () => {
    const doc = { fileName: 'test.pdf' };
    render(<ReactDocumentViewer document={doc} />);
    expect(screen.getByText(/Viewer for test.pdf/)).toBeInTheDocument();
  });

  it('passes theme prop correctly', () => {
    render(<ReactDocumentViewer theme="dark" />);
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('resolves labels from locale and allows overrides', () => {
    render(<ReactDocumentViewer locale="es-ES" labels={{ reset: 'Reiniciar' }} />);

    expect(screen.getByText('Reiniciar')).toBeInTheDocument();
    expect(screen.getByText('es-ES')).toBeInTheDocument();
  });
});
