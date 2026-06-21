import { forwardRef } from 'react';
import { Button } from '@mui/material';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ icon, onClick, ariaLabel, ...props }, ref) => (
    <Button
      ref={ref}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
      sx={{
        minWidth: { xs: '34px', sm: '40px' },
        padding: { xs: '4px', sm: '6px 8px' },
        '& .MuiSvgIcon-root': {
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
        },
      }}
    >
      {icon}
    </Button>
  ),
);

ToolbarButton.displayName = 'ToolbarButton';