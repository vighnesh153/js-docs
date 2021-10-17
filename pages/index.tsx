import React, { useContext } from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import GlobalsContext from 'contexts/GlobalsContext';

const HomePage = () => {
  const globalContext = useContext(GlobalsContext);

  if (globalContext.openFiles.length > 0) {
    return null;
  }

  return (
    <Box p={2}>
      <Typography variant={'h4'}>Welcome to Vighnesh's documentation web app</Typography>
      <Box height={20} />
      <Typography>
        This app's primary purpose is to store documentation or notes of different things.
      </Typography>
      <Box height={20} />
      <Typography>Features</Typography>
      <ul>
        <li>
          In browser javascript code transpiling. Supports React. You can directly import any npm
          module and start working with it.
        </li>
        <li>Markdown text boxes with support for Katex (Math equations)</li>
      </ul>
      <Typography>
        Open any file from the explorer on the left and feel free to play around with it. Note: All
        changes you make will be lost on refresh.
      </Typography>
    </Box>
  );
};

export default HomePage;
