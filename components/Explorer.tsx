import React from 'react';

import { Box } from '@mui/material';

import TreeView from 'components/TreeView';

const Explorer: React.FC = () => {
  return (
    <Box width={'100%'} height={'100%'} overflow={'auto'} pt={2} pb={5} px={1}>
      <TreeView />
    </Box>
  );
};

export default Explorer;
