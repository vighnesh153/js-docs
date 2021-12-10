import React, { ReactElement, useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import GlobalsContext from 'contexts/GlobalsContext';
import { fetchExplorerItems } from 'services/api';
import ExplorerItem from 'models/ExplorerItem';
import RootLayout from 'components/RootLayout';

function HomePage(props: { explorerItems: ExplorerItem[] }) {
  const globalContext = useContext(GlobalsContext);

  useEffect(() => {
    if (globalContext.explorerItems.length === 0) {
      globalContext.setExplorerItems(props.explorerItems);
    }
  }, []);

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
}

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const explorerItems = await fetchExplorerItems();

  return {
    props: {
      explorerItems,
    },
  };
};
