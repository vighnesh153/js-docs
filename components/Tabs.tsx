import React, { useContext, useMemo } from 'react';

import { Box } from '@mui/system';

import { useJsDocsAuth } from 'contexts/AuthContext';
import GlobalsContext from 'contexts/GlobalsContext';

import Tab from './Tab';

const Tabs: React.FC = (props) => {
  const globalsContext = useContext(GlobalsContext);

  const tabs = useMemo(
    () =>
      globalsContext.explorerItems.filter((item) =>
        globalsContext.openFiles.map((file) => file.id).includes(item.id || '')
      ),
    [globalsContext.explorerItems, globalsContext.openFiles]
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
            selected={globalsContext.focussedFile?.id === tab.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Tabs;
