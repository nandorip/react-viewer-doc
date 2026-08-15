/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactDocumentViewer, ReactViewerDoc } from './ReactViewerDoc';

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

describe('ReactViewerDoc', () => {
  it('renders without error', () => {
    render(<ReactViewerDoc />);
    expect(screen.getByTestId('mock-viewer')).toBeInTheDocument();
    expect(screen.getByText(/no file/)).toBeInTheDocument();
  });

  it('passes document prop correctly', () => {
    const doc = { fileName: 'test.pdf' };
    render(<ReactViewerDoc document={doc} />);
    expect(screen.getByText(/Viewer for test.pdf/)).toBeInTheDocument();
  });

  it('passes theme prop correctly', () => {
    render(<ReactViewerDoc theme="dark" />);
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('resolves labels from locale and allows overrides', () => {
    render(<ReactViewerDoc locale="es-ES" labels={{ reset: 'Reiniciar' }} />);

    expect(screen.getByText('Reiniciar')).toBeInTheDocument();
    expect(screen.getByText('es-ES')).toBeInTheDocument();
  });

  it('keeps ReactDocumentViewer as an alias', () => {
    expect(ReactDocumentViewer).toBe(ReactViewerDoc);
  });
});
