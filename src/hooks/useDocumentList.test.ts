import { renderHook, act } from '@testing-library/react';
import { useDocumentList } from './useDocumentList';
import type { DocumentData } from '../types';

const docs: DocumentData[] = [
  { id: '1', fileName: 'a.pdf', fileUri: 'http://example.com/a.pdf' },
  { id: '2', fileName: 'b.jpg', fileUri: 'http://example.com/b.jpg' },
  { id: '3', fileName: 'c.png', fileUri: 'http://example.com/c.png' },
];

describe('useDocumentList', () => {
  it('starts at default index', () => {
    const { result } = renderHook(() =>
      useDocumentList({ documents: docs, defaultDocumentIndex: 1 }),
    );

    expect(result.current.activeIndex).toBe(1);
    expect(result.current.activeDocument?.fileName).toBe('b.jpg');
    expect(result.current.hasMultiple).toBe(true);
  });

  it('navigates between documents', () => {
    const { result } = renderHook(() => useDocumentList({ documents: docs }));

    act(() => result.current.nextDocument());
    expect(result.current.activeIndex).toBe(1);

    act(() => result.current.nextDocument());
    expect(result.current.activeIndex).toBe(2);

    act(() => result.current.nextDocument());
    expect(result.current.activeIndex).toBe(2);

    act(() => result.current.prevDocument());
    expect(result.current.activeIndex).toBe(1);
  });

  it('calls onDocumentChange when selecting a document', () => {
    const onDocumentChange = jest.fn();
    const { result } = renderHook(() =>
      useDocumentList({ documents: docs, onDocumentChange }),
    );

    act(() => result.current.setDocumentIndex(2));

    expect(onDocumentChange).toHaveBeenCalledWith(2, docs[2]);
  });

  it('supports controlled documentIndex', () => {
    const { result, rerender } = renderHook(
      ({ documentIndex }) => useDocumentList({ documents: docs, documentIndex }),
      { initialProps: { documentIndex: 0 } },
    );

    rerender({ documentIndex: 2 });
    expect(result.current.activeIndex).toBe(2);
    expect(result.current.activeDocument?.fileName).toBe('c.png');
  });
});