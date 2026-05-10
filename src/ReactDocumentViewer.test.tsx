/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReactDocumentViewer } from './ReactDocumentViewer';

// Mock do Viewer para testar apenas o componente ReactDocumentViewer
jest.mock('./Viewer', () => ({
  Viewer: ({ document }: any) => (
    <div data-testid="mock-viewer">
      Viewer for {document?.fileName || 'no file'}
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
});
