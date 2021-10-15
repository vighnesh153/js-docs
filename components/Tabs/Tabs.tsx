import React, { useContext, useMemo } from 'react';

import { Box } from '@mui/system';

import { useJsDocsAuth } from 'contexts/AuthContext';
import GlobalsContext from 'contexts/GlobalsContext';

import Tab from './Tab';

interface TabsProps {
  activeTabId: string;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { isAdmin } = useJsDocsAuth();
  const globalsContext = useContext(GlobalsContext);

  const tabs = useMemo(
    () =>
      globalsContext.explorerItems.filter((item) =>
        globalsContext.openFileIds.includes(item.id || '')
      ),
    [globalsContext.explorerItems, globalsContext.openFileIds]
  );

  return (
    <Box
      position={'relative'}
      overflow={'auto'}
      className={'hide-scrollbar'}
      flexShrink={0}
      height={42}
      sx={{
        borderBottomColor: 'divider',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
      }}
    >
      <Box display={'flex'} height={'100%'} alignItems={'stretch'}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            name={tab.name}
            selected={globalsContext.focussedFileId === tab.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Tabs;
