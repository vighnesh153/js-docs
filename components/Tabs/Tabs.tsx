import React from 'react';

import { Box } from '@mui/material';

import Tab from './Tab';
import { useJsDocsAuth } from 'contexts/AuthContext';

interface TabsProps {
  activeTabId: string;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { isAdmin } = useJsDocsAuth();

  return (
    <Box position={'relative'} overflow={'auto'} className={'hide-scrollbar'} flexShrink={0}>
      <Box display={'flex'}>
        <Tab id={'readme'} name={'README.md'} selected />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
        <Tab id={'prettier'} name={'prettier.config.js'} />
      </Box>
    </Box>
  );
};

export default Tabs;
