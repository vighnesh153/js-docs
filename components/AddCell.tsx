import React from 'react';

import { useFileContextActions } from 'store/contexts/FileContext';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useFileContextActions();

  return (
    <Box
      className={`add-cell`}
      sx={{
        position: 'relative',
        opacity: forceVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in 0.1s',
        margin: '8px 0',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <Box
        className="add-buttons"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& > button': {
            margin: '0 20px',
          },
        }}
      >
        <Button
          size={'small'}
          startIcon={<Add />}
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          Code
        </Button>
        <Button
          size={'small'}
          startIcon={<Add />}
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          Text
        </Button>
      </Box>
      <Box
        className="divider"
        sx={{
          position: 'absolute',
          top: '50%',
          bottom: '50%',
          right: '2.5%',
          left: '2.5%',
          borderBottom: '1px solid gray',
          width: '95%',
          zIndex: -1,
        }}
      />
    </Box>
  );
};

export default AddCell;
