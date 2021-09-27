import React from 'react';

import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from '@mui/icons-material/Close';

interface TabProps {
  id: string;
  name: string;
  selected?: boolean;
}

const Tab: React.FC<TabProps> = (props) => {
  return (
    <Box
      px={2}
      sx={{
        border: `1px solid hsl(0, 0%, 15%)`,
        borderTopWidth: 0,
        borderRightWidth: 0,
        cursor: 'pointer',
        backgroundColor: props.selected ? 'hsl(0, 0%, 15%)' : 'initial',
        '&:hover': {
          backgroundColor: 'hsl(0, 0%, 10%)',
        },
      }}
      display={'flex'}
      alignItems={'center'}
      gap={1}
    >
      <Typography variant={'body1'} component={'p'}>
        {props.name}
      </Typography>
      <IconButton>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default Tab;
