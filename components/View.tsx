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
      {globalContext.openFileIds.length === 0 && props.children}
      {globalContext.openFileIds.map((fileId) => (
        <Box
          key={fileId}
          display={globalContext.focussedFile?.id === fileId ? 'block' : 'none'}
          className={'hide-scrollbar'}
          flexGrow={1}
          overflow={'auto'}
        >
          <File fileId={fileId} />
        </Box>
      ))}
    </Box>
  );
};

export default View;
