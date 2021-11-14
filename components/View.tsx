import React, { useContext } from 'react';

import { Box } from '@mui/system';

import GlobalsContext from 'contexts/GlobalsContext';

import Tabs from 'components/Tabs';
import File from 'components/File';

import useWarnUserForUnsavedChanges from 'hooks/useWarnUserForUnsavedChanges';
import useOnFocussedFileChange from 'hooks/useOnFocussedFileChange';

const _View: React.FC = (props) => {
  const globalContext = useContext(GlobalsContext);

  // For acting on the focussedFileChange event
  useOnFocussedFileChange();

  // Warn the user before un-mount
  useWarnUserForUnsavedChanges();

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'}>
      <Tabs />
      {props.children}

      {/* Adding this for having some space between tabs and file content*/}
      <Box height={'20px'} />

      {globalContext.openFiles.map((file) => (
        <Box
          key={file.id}
          display={globalContext.focussedFile?.id === file.id ? 'block' : 'none'}
          className={'hide-scrollbar'}
          flexGrow={1}
          overflow={'auto'}
        >
          <File fileId={file.id} isPrivate={file.isPrivate} />
        </Box>
      ))}
    </Box>
  );
};

const View: React.FC = (props) => {
  const globalContext = useContext(GlobalsContext);

  if (globalContext.explorerItems.length === 0) {
    return <Box height={'100%'} display={'flex'} flexDirection={'column'} />;
  }

  return <_View {...props} />;
};

export default View;
