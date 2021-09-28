import React from 'react';

import { Box } from '@mui/system';

import CellList from 'components/CellList';

interface FileProps {
  id: string;
}

const File: React.FC<FileProps> = (props) => {
  return (
    <Box>
      <CellList />
    </Box>
  );
};

export default File;
