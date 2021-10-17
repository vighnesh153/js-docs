import React from 'react';

import { Box } from '@mui/system';

import CellList from 'components/CellList';
import { FileContextProvider } from 'store/contexts/FileContext';
import useGlobalUnsavedFilesUpdater from 'hooks/useGlobalUnsavedFilesUpdater';

interface FileProps {
  fileId: string;
  isPrivate: boolean;
}

const _File: React.FC<FileProps> = (props) => {
  // This updates the global unsaved files array
  useGlobalUnsavedFilesUpdater({ fileId: props.fileId });

  return <CellList />;
};

const File: React.FC<FileProps> = (props) => (
  <FileContextProvider>
    <_File {...props} />
  </FileContextProvider>
);

export default File;
