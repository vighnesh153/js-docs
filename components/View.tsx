import React, { useState } from 'react';

import Tabs from 'components/Tabs';
import File from 'components/File';
import { Box } from '@mui/system';

interface ViewProps {}

const View: React.FC<ViewProps> = (props) => {
  const activeFileId = '123';

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'}>
      <Tabs activeTabId={activeFileId} />
      <File fileId={activeFileId} />
    </Box>
  );
};

export default View;
