import React from 'react';

import { Box } from '@mui/system';

import CellList from 'components/CellList';
import { FileContextProvider } from 'store/contexts/FileContext';

interface FileProps {
  fileId: string;
}

const _File: React.FC<FileProps> = (props) => {
  return (
    <Box className={'hide-scrollbar'} flexGrow={1} overflow={'auto'}>
      <CellList />
    </Box>
  );
};

const File: React.FC<FileProps> = (props) => (
  <FileContextProvider>
    <_File {...props} />
  </FileContextProvider>
);

export default File;
