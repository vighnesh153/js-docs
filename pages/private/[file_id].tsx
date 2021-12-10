import React, { ReactElement, useContext, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import FilePage from 'components/FilePage';
import RootLayout from 'components/RootLayout';

import { fetchExplorerItems } from 'services/api';

import GlobalsContext from 'contexts/GlobalsContext';

import ExplorerItem from 'models/ExplorerItem';

function PrivateFilePage(props: { explorerItems: ExplorerItem[] }) {
  const globalContext = useContext(GlobalsContext);

  useEffect(() => {
    if (globalContext.explorerItems.length === 0) {
      globalContext.setExplorerItems(props.explorerItems);
    }
  }, []);

  return <FilePage isPrivate />;
}

export default PrivateFilePage;

PrivateFilePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
  const explorerItems = await fetchExplorerItems();

  return {
    props: {
      explorerItems,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const explorerItems = await fetchExplorerItems();

  // Get the paths we want to pre-render based on explorer items
  const paths = explorerItems.map((item) => ({
    params: { file_id: item.id },
  }));

  return { paths, fallback: 'blocking' };
};
