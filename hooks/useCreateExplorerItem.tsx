import React, { useCallback, useContext, useState } from 'react';
import { addDoc, collection, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import ExplorerItem from 'models/ExplorerItem';

import GlobalsContext from 'contexts/GlobalsContext';
import JsDocsAuthContext from 'contexts/AuthContext';

import { firebase } from 'services/firebase';
import configuration from 'constants/configuration';

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
  const { currentUser } = useContext(JsDocsAuthContext);
  const { setModalData } = useContext(ModalContext);

  /**
   * This function adds an item to the ExplorerItems list with the given name
   */
  const addItemToList = useCallback(
    (args: { type: ExplorerItemType; itemName: string; closeModal: () => void }) => {
      args.closeModal();

      /**
       * Item definition
       */
      const childItem: ExplorerItem = {
        id: '',
        name: args.itemName,
        type: args.type,
        parentIds: [],
        isPrivate: false,
        createdOn: new Date().toString(),
        createdBy: currentUser?.email || '',
        updatedOn: new Date().toString(),
        updatedBy: currentUser?.email || '',
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

      const { FILE_META, PRIVATE } = configuration.FIREBASE.FIRESTORE.COLLECTIONS;
      const collectionObj = childItem.isPrivate
        ? collection(firebase.db, PRIVATE, FILE_META)
        : collection(firebase.db, FILE_META);

      /**
       * Add the doc to firestore
       */
      const toastId = toast.dark('Creating new item', {
        autoClose: false,
        isLoading: true,
      });
      addDoc(collectionObj, childItem)
        .then((ref) => {
          childItem.id = ref.id;

          /**
           * Finally, add the child item to explorerItems array
           */
          setExplorerItems((items) => [...items, childItem]);

          /**
           * Update the doc in firestore with the id
           */
          setDoc(ref, { id: ref.id }, { merge: true });
        })
        .catch((e) => {
          console.error(e);
          toast.error('Failed to create the explorer item. Check console for the error.');
        })
        .finally(() => {
          toast.dismiss(toastId);
        });
    },
    [focussedNodeId, explorerItems, setExplorerItems, currentUser]
  );

  const createExplorerItem = useCallback(
    (args: CreateExplorerItemProps) => {
      setModalData({
        title: `Create a ${args.type}`,
        content: ({ closeModal }) => (
          <CreateExplorerItem
            type={args.type}
            onConfirm={(itemName: string) =>
              addItemToList({
                itemName,
                closeModal,
                type: args.type,
              })
            }
          />
        ),
      });
    },
    [setModalData, addItemToList]
  );

  return { createExplorerItem };
};

export default useCreateExplorerItem;
