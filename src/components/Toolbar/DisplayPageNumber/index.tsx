import React, { useState, useEffect } from 'react';
import { InputBase } from '@mui/material';
import { DisplayPage } from '../../../styles';

interface Props {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
}

export const DisplayPageNumber = ({ totalPages, page, onPageChange, ariaLabel = 'Current page' }: Props) => {
  const [val, setVal] = useState(page.toString());

  useEffect(() => {
    setVal(page.toString());
  }, [page]);

  const handleBlur = () => {
    const p = parseInt(val, 10);
    if (!isNaN(p) && p > 0 && p <= totalPages) {
      onPageChange(p);
    } else {
      setVal(page.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <DisplayPage>
      <InputBase 
        value={val} 
        onChange={e => setVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        sx={{
          width: { xs: '24px', sm: '30px' },
          color: 'inherit',
          fontSize: { xs: '12px', sm: '14px' },
        }}
        inputProps={{
          style: { textAlign: 'center', padding: 0 },
          'aria-label': ariaLabel,
        }}
      />
      <span style={{ fontSize: 'inherit', marginLeft: '4px' }}>{`/ ${totalPages}`}</span>
    </DisplayPage>
  );
};
