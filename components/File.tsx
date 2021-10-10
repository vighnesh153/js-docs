import React from 'react';

import { Box } from '@mui/system';

import CellList from 'components/CellList';
import { FileContextProvider } from 'store/contexts/FileContext';
import useGlobalUnsavedFilesUpdater from 'hooks/useGlobalUnsavedFilesUpdater';

interface FileProps {
  fileId: string;
}

const _File: React.FC<FileProps> = (props) => {
  // This updates the global unsaved files array
  useGlobalUnsavedFilesUpdater({ fileId: props.fileId });

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
