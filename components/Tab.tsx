import React, { useContext, useMemo } from 'react';

import { Badge, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import GlobalsContext from 'contexts/GlobalsContext';

interface TabProps {
  id: string;
  name: string;
  selected?: boolean;
}

const Tab: React.FC<TabProps> = (props) => {
  const globalsContext = useContext(GlobalsContext);

  const saveRequired = useMemo(
    () => globalsContext.unsavedFileIds.has(props.id),
    [globalsContext.unsavedFileIds]
  );

  const onClickTab = () => {
    const tabId = props.id;

    /**
     * Set the tab as focussedNode
     */
    if (globalsContext.focussedNodeId !== tabId) {
      globalsContext.setFocussedNodeId(tabId);
    }

    /**
     * Set the tab as focussedFile
     */
    if (globalsContext.focussedFileId !== tabId) {
      globalsContext.setFocussedFileId(tabId);
    }
  };

  const closeTab: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // To prevent invoking the `onClickTab` function
    e.stopPropagation();

    globalsContext.setOpenFileIds((fileIds) => fileIds.filter((fileId) => fileId !== props.id));
  };

  return (
    <Box
      px={2}
      sx={{
        border: `1px solid hsl(0, 0%, 15%)`,
        borderTopWidth: 0,
        borderRightWidth: 0,
        cursor: 'pointer',
        backgroundColor: props.selected ? 'hsl(0, 0%, 15%)' : 'initial',
        '&:hover': {
          backgroundColor: 'hsl(0, 0%, 10%)',
        },
      }}
      display={'flex'}
      alignItems={'center'}
      gap={saveRequired ? 3 : 1}
      onClick={onClickTab}
    >
      <Typography variant={'body1'} component={'p'}>
        {props.name}
      </Typography>
      {saveRequired ? (
        <Badge color="secondary" variant="dot" />
      ) : (
        <IconButton onClick={closeTab}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Tab;
