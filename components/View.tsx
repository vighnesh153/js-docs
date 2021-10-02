import React from 'react';

import { FileContextProvider } from 'store/contexts/FileContext';

import Tabs from 'components/Tabs';
import File from 'components/File';
import { Box } from '@mui/system';

interface ViewProps {}

const View: React.FC<ViewProps> = (props) => {
  return (
    <FileContextProvider>
      <Box height={'100%'} display={'flex'} flexDirection={'column'}>
        <Tabs />
        <File id={'123'} />
      </Box>
    </FileContextProvider>
  );
};

export default View;
