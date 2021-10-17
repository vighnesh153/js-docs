import React, { useContext } from 'react';

import { Box } from '@mui/system';

import GlobalsContext from 'contexts/GlobalsContext';

import Tabs from 'components/Tabs';
import File from 'components/File';

const View: React.FC = (props) => {
  const globalContext = useContext(GlobalsContext);

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'}>
      <Tabs />
      {props.children}
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

export default View;
