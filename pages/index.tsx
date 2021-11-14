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
        <li>Pending: Markdown text boxes with support for Katex (Math equations)</li>
      </ul>
      <Typography>
        Open any file, like "Playground", from the explorer on the left and feel free to play around
        with it. Note: All changes you make will be lost on refresh. Also note, you can only modify
        existing cells and cannot create or delete cells. And, you won't be able to create/delete a
        file as only Admin (me) has permission to do so.
      </Typography>
    </Box>
  );
};

export default HomePage;
