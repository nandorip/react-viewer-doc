/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './index';

const Content = ({ fail }: { fail: boolean }) => {
  if (fail) throw new Error('render failed');
  return <span>Recovered document</span>;
};

test('recovers when document content changes under the same identifier', () => {
  const log = jest.spyOn(console, 'error').mockImplementation(() => {});
  try {
    const { rerender } = render(
      <ErrorBoundary resetKey={['same-id', 'old-uri']}>
        <Content fail />
      </ErrorBoundary>,
    );
    expect(screen.queryByText('Recovered document')).not.toBeInTheDocument();
    rerender(
      <ErrorBoundary resetKey={['same-id', 'new-uri']}>
        <Content fail={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Recovered document')).toBeInTheDocument();
  } finally {
    log.mockRestore();
  }
});
