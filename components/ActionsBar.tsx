import React from 'react';

import { Box } from '@mui/system';

import { useFileContextActions } from 'store/contexts/FileContext';
import { IconButton } from '@mui/material';
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';

interface ActionsBarProps {
  id: string;
}

const ActionsBar: React.FC<ActionsBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useFileContextActions();

  return (
    <Box
      className="action-bar"
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        opacity: 0.25,
        transition: 'opacity 0.3s',
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <IconButton size={'small'} onClick={() => moveCell(id, 'up')}>
        <ArrowUpward />
      </IconButton>
      <IconButton size={'small'} onClick={() => moveCell(id, 'down')}>
        <ArrowDownward />
      </IconButton>
      <IconButton size={'small'} onClick={() => deleteCell(id)}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default ActionsBar;
