import React from 'react';

import { Box } from '@mui/system';
import { LinearProgress } from '@mui/material';

import CellList from 'components/CellList';
import { FileContextProvider } from 'store/contexts/FileContext';

import useGlobalUnsavedFilesUpdater from 'hooks/useGlobalUnsavedFilesUpdater';
import useSaveFile from 'hooks/useSaveFile';
import useFetchFile from 'hooks/useFetchFile';

interface FileProps {
  fileId: string;
  isPrivate: boolean;
}

const _File: React.FC<FileProps> = (props) => {
  // This updates the global unsaved files array
  useGlobalUnsavedFilesUpdater(props);

  // This fetches the file very first time.
  const { loading } = useFetchFile(props);

  // Detect the save command (cmd + s) and save the file if it requires saving
  useSaveFile(props);

  if (loading) {
    return (
      <Box p={2}>
        <LinearProgress />
      </Box>
    );
  }

  return <CellList />;
};

const File: React.FC<FileProps> = (props) => (
  <FileContextProvider>
    <_File {...props} />
  </FileContextProvider>
);

export default File;
