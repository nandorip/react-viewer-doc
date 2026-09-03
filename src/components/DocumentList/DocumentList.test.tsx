import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DocumentList } from './index';

// Mock the ResizeObserver used by useElementSize
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = MockResizeObserver as any;

describe('DocumentList', () => {
  const documents = [
    { id: '1', fileName: 'doc1.pdf' },
    { id: '2', fileName: 'doc2.jpg' },
    { id: '3', fileName: 'doc3.png' },
  ];

  it('renders document names', () => {
    render(
      <DocumentList
        documents={documents}
        activeIndex={0}
        onSelect={jest.fn()}
      />
    );

    expect(screen.getByText('doc1.pdf')).toBeInTheDocument();
    expect(screen.getByText('doc2.jpg')).toBeInTheDocument();
    expect(screen.getByText('doc3.png')).toBeInTheDocument();
  });

  it('calls onSelect when a document is clicked', () => {
    const onSelect = jest.fn();
    render(
      <DocumentList
        documents={documents}
        activeIndex={0}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByText('doc2.jpg'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('highlights the active document', () => {
    render(
      <DocumentList
        documents={documents}
        activeIndex={1}
        onSelect={jest.fn()}
      />
    );

    const activeItem = screen.getByLabelText('doc2.jpg');
    expect(activeItem).toHaveAttribute('aria-current', 'true');
  });
});
