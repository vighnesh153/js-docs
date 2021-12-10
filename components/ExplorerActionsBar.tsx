import React from 'react';

import { Box, SxProps, Theme } from '@mui/system';

import EditIcon from '@mui/icons-material/Edit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import useCreateExplorerItem from 'hooks/useCreateExplorerItem';
import useEditExplorerItemName from 'hooks/useEditExplorerItemName';
import usePopulateTreeView from 'hooks/usePopulateTreeView';
import useDeleteExplorerItem from 'hooks/useDeleteExplorerItem';
import useConfirmation from 'hooks/useConfirmation';

enum Action {
  EditName = 'edit_name',
  NewFolder = 'new_folder',
  NewFile = 'new_file',
  Delete = 'delete',
  Refresh = 'refresh',
}

const ExplorerActionsBar: React.FC = () => {
  const { fetchAndPopulateTree } = usePopulateTreeView();
  const { createExplorerItem } = useCreateExplorerItem();
  const { editExplorerItemName } = useEditExplorerItemName();
  const { deleteExplorerItem } = useDeleteExplorerItem();
  const { confirmation } = useConfirmation();

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
      case Action.Delete:
        confirmation({
          message: 'Are you sure you want to delete this item?',
          onConfirm: deleteExplorerItem,
        });
        break;
      case Action.Refresh:
        fetchAndPopulateTree({ isRefresh: true });
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
      <DeleteIcon sx={iconStyles} onClick={() => onClickIcon(Action.Delete)} />
      <RefreshIcon sx={iconStyles} onClick={() => onClickIcon(Action.Refresh)} />
    </Box>
  );
};

export default ExplorerActionsBar;
