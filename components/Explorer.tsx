import React from 'react';

import { Box } from '@mui/material';

import TreeView from 'components/TreeView';

const Explorer: React.FC = () => {
  return (
    <Box width={'100%'} height={'100%'} pt={2} pb={5} pl={1} overflow={'auto'}>
      <TreeView className={'hide-scrollbar'} />
    </Box>
  );
};

export default Explorer;
