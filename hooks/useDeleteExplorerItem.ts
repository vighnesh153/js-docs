import { useCallback, useContext } from 'react';

import GlobalsContext from 'contexts/GlobalsContext';
import JsDocsAuthContext from 'contexts/AuthContext';
import ExplorerItem from 'models/ExplorerItem';
import useUpdateExplorerItem from 'hooks/useUpdateExplorerItem';

const useDeleteExplorerItem = () => {
  const {
    focussedNodeId,
    explorerItems,
    setFocussedNodeId,
    setOpenFileIds,
    setUnsavedFileIds,
    setFocussedFileId,
  } = useContext(GlobalsContext);
  const { currentUser } = useContext(JsDocsAuthContext);
  const { updateExplorerItem } = useUpdateExplorerItem();

  const deleteExplorerItem = useCallback(() => {
    // Not allowing to delete public or private folder
    if (['private', 'public'].includes(focussedNodeId || '')) return;

    /**
     * Fetch the item from the context
     */
    const deletedExplorerItem = explorerItems.find(
      (explorerItem) => explorerItem.id === focussedNodeId
    ) as ExplorerItem;

    /**
     * Mark as deleted
     */
    Object.assign(deletedExplorerItem, {
      deletedOn: new Date().toString(),
      deletedBy: currentUser?.email || '',
    });

    /**
     * updates the firestore doc and the context
     */
    updateExplorerItem(deletedExplorerItem);

    /**
     * Reset the focussedNodeId and focussedFileId
     */
    setFocussedNodeId(null);
    setFocussedFileId(null);

    /**
     * Id -> item, mapping
     */
    const itemLookup: { [k: string]: ExplorerItem } = explorerItems.reduce((prev: any, current) => {
      prev[current.id] = current;
      return prev;
    }, {});

    /**
     * Close itself, if a file, and all the children of the item, if any.
     */
    setOpenFileIds((fileIds) =>
      fileIds.filter((fileId) => {
        if (fileId === focussedNodeId) return false; // This was deleted
        if (itemLookup[fileId].parentIds.includes(focussedNodeId || '')) return false; // Its ancestor was deleted;
        return true;
      })
    );

    /**
     * Discard any changes in the deleted files.
     */
    setUnsavedFileIds((fileIds) => {
      if (fileIds.has(focussedNodeId || '')) {
        const newFileIds = new Set<string>();
        Array.from(fileIds).forEach((fileId) => {
          /**
           * If the file's parent is not being deleted currently, then don't reset the unsaved status of it.
           */
          if (itemLookup[fileId].parentIds.includes(focussedNodeId || '') === false) {
            newFileIds.add(fileId);
          }
        });
        return newFileIds;
      }
      return fileIds;
    });
  }, [
    focussedNodeId,
    explorerItems,
    currentUser,
    updateExplorerItem,
    setFocussedNodeId,
    setOpenFileIds,
    setUnsavedFileIds,
    setFocussedFileId,
  ]);

  return { deleteExplorerItem };
};

export default useDeleteExplorerItem;
