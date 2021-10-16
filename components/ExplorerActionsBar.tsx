import React from 'react';

import { Box, SxProps, Theme } from '@mui/system';

import EditIcon from '@mui/icons-material/Edit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import RefreshIcon from '@mui/icons-material/Refresh';

import useCreateExplorerItem from 'hooks/useCreateExplorerItem';
import useEditExplorerItemName from 'hooks/useEditExplorerItemName';
import usePopulateTreeView from 'hooks/tree-view/usePopulateTreeView';

enum Action {
  EditName = 'edit_name',
  NewFolder = 'new_folder',
  NewFile = 'new_file',
  Refresh = 'refresh',
}

const ExplorerActionsBar: React.FC = () => {
  const { fetchAndPopulateTree } = usePopulateTreeView();
  const { createExplorerItem } = useCreateExplorerItem();
  const { editExplorerItemName } = useEditExplorerItemName();

  const iconStyles: SxProps<Theme> = {
    '&:hover': {
      color: 'secondary.main',
    },
  };

  const onClickIcon = (action: Action) => {
    switch (action) {
      case Action.NewFile:
      case Action.NewFolder:
        const type = action === Action.NewFolder ? 'directory' : 'file';
        createExplorerItem({ type });
        break;
      case Action.EditName:
        editExplorerItemName();
        break;
      case Action.Refresh:
        fetchAndPopulateTree({ showSuccessBanner: true });
        break;
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'flex-end'}
      gap={0.5}
      sx={{
        '& > *': {
          cursor: 'pointer',
        },
      }}
    >
      <EditIcon sx={iconStyles} onClick={() => onClickIcon(Action.EditName)} />
      <CreateNewFolderIcon sx={iconStyles} onClick={() => onClickIcon(Action.NewFolder)} />
      <NoteAddIcon sx={iconStyles} onClick={() => onClickIcon(Action.NewFile)} />
      <RefreshIcon sx={iconStyles} onClick={() => onClickIcon(Action.Refresh)} />
    </Box>
  );
};

export default ExplorerActionsBar;
