import React, { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Badge, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

import GlobalsContext from 'contexts/GlobalsContext';
import ExplorerItem from 'models/ExplorerItem';

interface TabProps {
  id: string;
  name: string;
  selected?: boolean;
}

const Tab: React.FC<TabProps> = (props) => {
  const globalsContext = useContext(GlobalsContext);
  const router = useRouter();

  const saveRequired = useMemo(
    () => globalsContext.unsavedFileIds.has(props.id),
    [globalsContext.unsavedFileIds]
  );

  const onClickTab = () => {
    const tabId = props.id;

    /**
     * Find the actual explorerItem
     */
    const explorerItem = globalsContext.explorerItems.find(
      (item) => item.id === tabId
    ) as ExplorerItem;

    router.push(`/${explorerItem.isPrivate ? 'private' : 'public'}/${tabId}`);
  };

  const closeTab: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // To prevent invoking the `onClickTab` function
    e.stopPropagation();

    // Update the openFiles array
    const newOpenFiles = globalsContext.openFiles.filter((file) => file.id !== props.id);
    globalsContext.setOpenFiles(newOpenFiles);

    // Change the route to new open file if any
    if (newOpenFiles.length > 0) {
      const file = newOpenFiles[0];
      router.push(`/${file.isPrivate ? 'private' : 'public'}/${file.id}`);
      return;
    }

    // If no file is open, go to root
    router.push(`/`);
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
