import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './index';

// Mock heavy components and external dependencies
jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: '',
    },
    version: '1.2.3',
  },
  Document: ({ children, onLoadSuccess }: any) => {
    // Simulate successful load after render
    React.useEffect(() => {
      onLoadSuccess?.({ numPages: 5 });
    }, [onLoadSuccess]);
    return <div data-testid="pdf-document">{children}</div>;
  },
  Page: ({ pageNumber }: any) => <div data-testid={`pdf-page-${pageNumber}`}>Page {pageNumber}</div>,
}));

// Mock LazyPdfThumbnail to avoid loading images
jest.mock('../src/components/LazyPdfThumbnail', () => ({
  LazyPdfThumbnail: ({ pageNumber }: any) => <div data-testid={`thumbnail-${pageNumber}`}>Thumb {pageNumber}</div>,
}));

// Mock the viewer core components to avoid canvas/DOM issues in jsdom
jest.mock('../src/Viewer', () => ({
  Viewer: ({ document, labels }: any) => (
    <div data-testid="mock-viewer">
      Viewer for {document?.fileName || 'no file'}
    </div>
  ),
}));

// Mock useViewerCore for headless testing
jest.mock('../src/hooks/useViewerCore', () => {
  const actual = jest.requireActual('../src/hooks/useViewerCore');
  return {
    ...actual,
    useViewerCore: (options: any) => {
      const viewer = actual.useViewerCore(options);
      return {
        ...viewer,
        // Ensure actions are mockable if needed
      };
    }
  };
});

describe('Demo App', () => {
  it('renders the header and upload area', () => {
    render(<App />);
    expect(screen.getByText('react-viewer-doc')).toBeInTheDocument();
    expect(screen.getByText('Upload a document')).toBeInTheDocument();
    expect(screen.getByText('v0.5.0')).toBeInTheDocument();
  });

  it('renders all sample buttons', () => {
    render(<App />);
    expect(screen.getByText('All Samples')).toBeInTheDocument();
    expect(screen.getByText('Tracemonkey PDF')).toBeInTheDocument();
    expect(screen.getByText('Nature Image')).toBeInTheDocument();
  });

  it('toggles between dark and light mode', () => {
    render(<App />);
    const toggleBtn = screen.getByRole('button', { name: /Dark|Light/ });
    const initialLabel = toggleBtn.textContent;
    
    fireEvent.click(toggleBtn);
    expect(toggleBtn.textContent).not.toBe(initialLabel);
  });

  it('switches between view modes', () => {
    render(<App />);
    
    const customModeBtn = screen.getByText('Custom Toolbar');
    fireEvent.click(customModeBtn);
    // Use getAllByText and pick the one in the selector (first one usually) or check presence
    expect(screen.getAllByText('renderToolbar').length).toBeGreaterThan(0);

    const headlessModeBtn = screen.getByText('Headless');
    fireEvent.click(headlessModeBtn);
    expect(screen.getAllByText('useViewerCore').length).toBeGreaterThan(0);
  });

  it('loads a sample document and displays the viewer', async () => {
    render(<App />);
    
    const sampleBtn = screen.getByText('Tracemonkey PDF');
    fireEvent.click(sampleBtn);
    
    // Should show file info
    expect(screen.getByText('tracemonkey.pdf')).toBeInTheDocument();
    
    // Should show the mock viewer (default mode uses ReactViewerDoc which we haven't mocked entirely,
    // but ReactViewerDoc uses Viewer which we HAVE mocked)
    expect(await screen.findByTestId('mock-viewer')).toBeInTheDocument();
  });

  it('tests the new toggleSidebar action in headless mode', async () => {
    render(<App />);
    
    // Switch to Headless mode
    fireEvent.click(screen.getByText('Headless'));
    
    // Load a sample to trigger the viewer
    fireEvent.click(screen.getByText('Tracemonkey PDF'));
    
    // In headless mode, we should see the ViewerCanvas (which we have NOT mocked, so it uses real logic)
    // Wait for the document to be "loaded" (our mock triggers this)
    await waitFor(() => expect(screen.getByTestId('pdf-document')).toBeInTheDocument());
    
    // Thumbnails button in our HeadlessViewer custom toolbar
    const thumbnailsBtn = screen.getByTitle('Thumbnails');
    
    // Initially sidebar should NOT be present (default showSidebar is false)
    expect(screen.queryByTestId('thumbnail-1')).not.toBeInTheDocument();
    
    // Toggle sidebar
    fireEvent.click(thumbnailsBtn);
    
    // Now sidebar should be present
    expect(await screen.findByTestId('thumbnail-1')).toBeInTheDocument();
    
    // Toggle again
    fireEvent.click(thumbnailsBtn);
    expect(screen.queryByTestId('thumbnail-1')).not.toBeInTheDocument();
  });
});
