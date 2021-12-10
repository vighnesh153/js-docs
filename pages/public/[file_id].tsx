import React, { ReactElement, useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';

import FilePage from 'components/FilePage';
import RootLayout from 'components/RootLayout';

import { fetchExplorerItems } from 'services/api';

import GlobalsContext from 'contexts/GlobalsContext';

import ExplorerItem from 'models/ExplorerItem';

function PublicFilePage(props: { explorerItems: ExplorerItem[] }) {
  const globalContext = useContext(GlobalsContext);

  useEffect(() => {
    if (globalContext.explorerItems.length === 0) {
      globalContext.setExplorerItems(props.explorerItems);
    }
  }, []);

  return <FilePage isPrivate={false} />;
}

export default PublicFilePage;

PublicFilePage.getLayout = function getLayout(page: ReactElement) {
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
