import React from 'react';

import { FileContextProvider } from 'store/contexts/FileContext';

import Tabs from 'components/Tabs';
import File from 'components/File';

interface ViewProps {}

const View: React.FC<ViewProps> = (props) => {
  return (
    <FileContextProvider>
      <Tabs />
      <File id={'123'} />
    </FileContextProvider>
  );
};

export default View;
