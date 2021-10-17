import React, { useContext } from 'react';

import { Box } from '@mui/material';

import TreeView from 'components/TreeView';
import ExplorerActionsBar from 'components/ExplorerActionsBar';

import JsDocsAuthContext from 'contexts/AuthContext';

const Explorer: React.FC = () => {
  const { isAdmin } = useContext(JsDocsAuthContext);

  return (
    <Box width={'100%'} height={'100%'} pt={2} pb={5} pl={1} overflow={'auto'}>
      {isAdmin && <ExplorerActionsBar />}
      <TreeView className={'hide-scrollbar'} />
    </Box>
  );
};

export default Explorer;
