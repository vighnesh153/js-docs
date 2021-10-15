import React, { useCallback, useContext, useState } from 'react';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import { ModalContext } from 'components/Modal';

type ExplorerItemType = 'file' | 'directory';

interface CreateExplorerItemProps {
  type: ExplorerItemType;
  onConfirm: (itemName: string) => void;
}

const CreateExplorerItem: React.FC<CreateExplorerItemProps> = (props) => {
  const [value, setValue] = useState('');

  return (
    <Box width={200}>
      <TextField
        variant={'outlined'}
        value={value}
        fullWidth
        placeholder={`Enter the ${props.type} name`}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (!value.trim()) return;
          if (e.code !== 'Enter') return;
          props.onConfirm(value);
        }}
      />
    </Box>
  );
};

const useCreateExplorerItem = () => {
  const { setModalData } = useContext(ModalContext);

  const createExplorerItem = useCallback(
    (args: CreateExplorerItemProps) => {
      setModalData({
        title: `Create a ${args.type}`,
        content: ({ closeModal }) => (
          <CreateExplorerItem
            type={args.type}
            onConfirm={(itemName: string) => {
              closeModal();
              args.onConfirm(itemName);
            }}
          />
        ),
      });
    },
    [setModalData]
  );

  return { createExplorerItem };
};

export default useCreateExplorerItem;
