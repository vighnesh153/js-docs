import React, { useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import ExplorerItem from 'models/ExplorerItem';

import GlobalsContext from 'contexts/GlobalsContext';

import { ModalContext } from 'components/Modal';

type ExplorerItemType = 'file' | 'directory';

interface CreateExplorerItemProps {
  type: ExplorerItemType;
  onConfirm?: (itemName: string) => void;
}

const CreateExplorerItem: React.FC<CreateExplorerItemProps> = (props) => {
  const [value, setValue] = useState('');

  return (
    <Box width={300}>
      <TextField
        variant={'outlined'}
        value={value}
        fullWidth
        autoFocus
        placeholder={`Enter the ${props.type} name`}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => {
          if (!value.trim()) return;
          if (e.code !== 'Enter') return;
          if (props.onConfirm) props.onConfirm(value);
        }}
      />
    </Box>
  );
};

const useCreateExplorerItem = () => {
  const { focussedNodeId, explorerItems, setExplorerItems } = useContext(GlobalsContext);
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

              /**
               * Item definition
               */
              const childItem: ExplorerItem = {
                id: uuid(),
                name: itemName,
                type: args.type,
                parentIds: [],
                isPrivate: false,
              };

              if (focussedNodeId === 'public') {
                /**
                 * If parent is `public`, do nothing
                 */
              } else if (focussedNodeId === 'private') {
                /**
                 * If parent is `private`, set isPrivate to true
                 */
                childItem.isPrivate = true;
              } else {
                /**
                 * Get the actual parent ExplorerItem
                 */
                const parentExplorerItem = explorerItems.find(
                  (item) => item.id === focussedNodeId
                ) as ExplorerItem;

                /**
                 * The child's isPrivate status will be the same as the parent.
                 */
                childItem.isPrivate = parentExplorerItem.isPrivate;

                /**
                 * Set the parent directories of the child based on its parent
                 */
                if (parentExplorerItem.type === 'directory') {
                  childItem.parentIds = [...parentExplorerItem.parentIds, parentExplorerItem.id];
                } else {
                  childItem.parentIds = [...parentExplorerItem.parentIds];
                }
              }

              /**
               * Finally, add the child item to explorerItems array
               */
              setExplorerItems((items) => [...items, childItem]);
            }}
          />
        ),
      });
    },
    [setModalData, focussedNodeId, explorerItems, setExplorerItems]
  );

  return { createExplorerItem };
};

export default useCreateExplorerItem;
