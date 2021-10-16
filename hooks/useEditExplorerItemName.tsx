import React, { useCallback, useContext, useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import ExplorerItem from 'models/ExplorerItem';

import GlobalsContext from 'contexts/GlobalsContext';
import JsDocsAuthContext from 'contexts/AuthContext';

import configuration from 'constants/configuration';
import { firebase } from 'services/firebase';

import { ModalContext } from 'components/Modal';
import { toast } from 'react-toastify';

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
  const { currentUser } = useContext(JsDocsAuthContext);
  const { setModalData } = useContext(ModalContext);

  /**
   * This function edits the item name in the ExplorerItems list
   */
  const editItemName = useCallback(
    (args: { newName: string; closeModal: () => void }) => {
      args.closeModal();

      // Not allowing to change the name of public or private folder
      if (['private', 'public'].includes(focussedNodeId || '')) return;

      /**
       * Fetch the item from the context
       */
      const updatedExplorerItem = explorerItems.find(
        (explorerItem) => explorerItem.id === focussedNodeId
      ) as ExplorerItem;

      /**
       * Update the info in the item
       */
      Object.assign(updatedExplorerItem, {
        name: args.newName,
        updatedOn: new Date().toString(),
        updatedBy: currentUser?.email || '',
      });

      const { FILE_META, PRIVATE } = configuration.FIREBASE.FIRESTORE.COLLECTIONS;
      const docRef = updatedExplorerItem.isPrivate
        ? doc(firebase.db, PRIVATE, FILE_META, updatedExplorerItem.id)
        : doc(firebase.db, FILE_META, updatedExplorerItem.id);

      /**
       * Update the doc in firestore
       */
      setDoc(docRef, updatedExplorerItem, { merge: true })
        .then(() => {
          /**
           * If firestore update succeeds, update in the context
           */
          setExplorerItems(
            explorerItems.map((explorerItem) =>
              explorerItem.id === focussedNodeId ? updatedExplorerItem : explorerItem
            )
          );
        })
        .catch((e) => {
          console.error(e);
          toast.error('Failed to update the name. Check the console for more info.');
        });
    },
    [focussedNodeId, explorerItems, setExplorerItems, currentUser]
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
