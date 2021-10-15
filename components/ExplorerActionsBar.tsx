import React from 'react';

import { Box, SxProps, Theme } from '@mui/system';

import EditIcon from '@mui/icons-material/Edit';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import RefreshIcon from '@mui/icons-material/Refresh';

enum Action {
  EditName = 'edit_name',
  NewFolder = 'new_folder',
  NewFile = 'new_file',
  Refresh = 'refresh',
}

const ExplorerActionsBar: React.FC = (props) => {
  const iconStyles: SxProps<Theme> = {
    '&:hover': {
      color: 'secondary.main',
    },
  };

  const onClickIcon = (action: Action) => {
    console.log(action);
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
