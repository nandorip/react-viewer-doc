import { Button } from '@mui/material';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const ToolbarButton = ({ icon, onClick }: ToolbarButtonProps) => (
  <Button onClick={onClick} sx={{ minWidth: '40px' }}>
    {icon}
  </Button>
);
