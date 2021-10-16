import React, { useContext } from 'react';

import { Box } from '@mui/system';

import GlobalsContext from 'contexts/GlobalsContext';

import Tabs from 'components/Tabs';
import File from 'components/File';

interface ViewProps {}

const View: React.FC<ViewProps> = (props) => {
  const globalContext = useContext(GlobalsContext);
  const activeFileId = '123';

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'}>
      <Tabs activeTabId={activeFileId} />
      {globalContext.openFileIds.map((fileId) => (
        <Box
          key={fileId}
          display={globalContext.focussedFileId === fileId ? 'block' : 'none'}
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
