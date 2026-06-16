import { Button } from '@mui/material';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const ToolbarButton = ({ icon, onClick }: ToolbarButtonProps) => (
  <Button
    onClick={onClick}
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
);