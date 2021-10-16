import { useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

import GlobalsContext from 'contexts/GlobalsContext';
import { firebase } from 'services/firebase';
import ExplorerItem from 'models/ExplorerItem';
import configuration from 'constants/configuration';

const useUpdateExplorerItem = () => {
  const { focussedNodeId, explorerItems, setExplorerItems } = useContext(GlobalsContext);

  const updateExplorerItem = useCallback(
    (updatedExplorerItem: ExplorerItem) => {
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
          toast.error('Failed to update the item. Check the console for more info.');
        });
    },
    [focussedNodeId, explorerItems, setExplorerItems]
  );

  return { updateExplorerItem };
};

export default useUpdateExplorerItem;
