import React, { useCallback, useContext, useState } from 'react';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import ExplorerItem from 'models/ExplorerItem';

import GlobalsContext from 'contexts/GlobalsContext';

import { ModalContext } from 'components/Modal';

type ExplorerItemType = 'file' | 'directory';

interface EditExplorerItemNameProps {
  initialValue: string;
  type?: ExplorerItemType;
  onConfirm?: (itemName: string) => void;
}

const EditExplorerItemName: React.FC<EditExplorerItemNameProps> = (props) => {
  const [value, setValue] = useState(props.initialValue);

  return (
    <Box width={300}>
      <TextField
        variant={'outlined'}
        value={value}
        fullWidth
        autoFocus
        placeholder={`Update the ${props.type} name`}
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

const useEditExplorerItemName = () => {
  const { focussedNodeId, explorerItems, setExplorerItems } = useContext(GlobalsContext);
  const { setModalData } = useContext(ModalContext);

  /**
   * This function edits the item name in the ExplorerItems list
   */
  const editItemName = useCallback(
    (args: { newName: string; closeModal: () => void }) => {
      args.closeModal();

      // Not allowing to change the name of public or private folder
      if (['private', 'public'].includes(focussedNodeId || '')) return;

      setExplorerItems(
        explorerItems.map((explorerItem) =>
          explorerItem.id === focussedNodeId
            ? { ...explorerItem, name: args.newName }
            : explorerItem
        )
      );
    },
    [focussedNodeId, explorerItems, setExplorerItems]
  );

  const editExplorerItemName = useCallback(() => {
    const item = explorerItems.find((item) => item.id === focussedNodeId) as ExplorerItem;
    setModalData({
      title: `Edit ${item.type} name`,
      content: ({ closeModal }) => (
        <EditExplorerItemName
          initialValue={item.name}
          type={item.type}
          onConfirm={(itemName: string) => editItemName({ newName: itemName, closeModal })}
        />
      ),
    });
  }, [setModalData, editItemName, focussedNodeId, explorerItems]);

  return { editExplorerItemName };
};

export default useEditExplorerItemName;
