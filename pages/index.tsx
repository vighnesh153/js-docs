import React, { useContext } from 'react';

import GlobalsContext from 'contexts/GlobalsContext';

const HomePage = () => {
  const globalContext = useContext(GlobalsContext);

  if (globalContext.openFiles.length === 0) {
    return null;
  }

  // Todo: Build a welcome page
  return null;
};

export default HomePage;
