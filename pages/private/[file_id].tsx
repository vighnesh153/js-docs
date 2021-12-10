import React, { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';

import FilePage from 'components/FilePage';
import { fetchExplorerItems } from 'services/api';
import GlobalsContext from 'contexts/GlobalsContext';
import ExplorerItem from 'models/ExplorerItem';

const PrivateFile: React.FC<{ explorerItems: ExplorerItem[] }> = (props) => {
  const globalContext = useContext(GlobalsContext);

  useEffect(() => {
    if (globalContext.explorerItems.length === 0) {
      globalContext.setExplorerItems(props.explorerItems);
    }
  }, []);

  return <FilePage isPrivate />;
};

export default PrivateFile;

export const getServerSideProps: GetServerSideProps = async () => {
  const explorerItems = await fetchExplorerItems();

  return {
    props: {
      explorerItems,
    },
  };
};
