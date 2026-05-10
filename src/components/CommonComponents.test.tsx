/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToolbarButton } from './Toolbar/ToolbarButton';
import { DisplayPageNumber } from './Toolbar/DisplayPageNumber';
import { ErrorViewer } from './ErrorViewer';
import { Container } from './Container';

describe('Common Components', () => {
  describe('ToolbarButton', () => {
    it('renders with icon and handles click', () => {
      const handleClick = jest.fn();
      render(<ToolbarButton icon={<span data-testid="icon" />} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('DisplayPageNumber', () => {
    it('renders correct page format', () => {
      render(<DisplayPageNumber page={2} totalPages={10} onPageChange={() => {}} />);
      expect(screen.getByDisplayValue('2')).toBeInTheDocument();
      expect(screen.getByText('/ 10')).toBeInTheDocument();
    });
  });

  describe('ErrorViewer', () => {
    it('renders error message', () => {
      render(<ErrorViewer message="Test error message" />);
      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });
  });

  describe('Container', () => {
    it('renders children correctly', () => {
      render(
        <Container>
          <div data-testid="child">Child Content</div>
        </Container>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });
});
