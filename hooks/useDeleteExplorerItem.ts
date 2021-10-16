import { useCallback, useContext } from 'react';

import GlobalsContext from 'contexts/GlobalsContext';
import JsDocsAuthContext from 'contexts/AuthContext';
import ExplorerItem from 'models/ExplorerItem';
import useUpdateExplorerItem from 'hooks/useUpdateExplorerItem';

const useDeleteExplorerItem = () => {
  const { focussedNodeId, explorerItems, setFocussedNodeId, setOpenFileIds, setUnsavedFileIds } =
    useContext(GlobalsContext);
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

    updateExplorerItem(deletedExplorerItem);
    setFocussedNodeId(null);
    setOpenFileIds((fileIds) => fileIds.filter((fileId) => fileId !== focussedNodeId));
    setUnsavedFileIds((fileIds) => {
      if (fileIds.has(focussedNodeId || '')) {
        const newFileIds = new Set(Array.from(fileIds));
        newFileIds.delete(focussedNodeId || '');
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
  ]);

  return { deleteExplorerItem };
};

export default useDeleteExplorerItem;
