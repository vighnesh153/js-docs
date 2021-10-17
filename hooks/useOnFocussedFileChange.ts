import { useCallback, useContext, useEffect } from 'react';

import ExplorerItem from 'models/ExplorerItem';
import GlobalsContext, { AppFile } from 'contexts/GlobalsContext';

const useOnFocussedFileChange = () => {
  const { explorerItems, expandedExplorerItemIds, setExpandedExplorerItemIds, focussedFile } =
    useContext(GlobalsContext);

  const onFocussedFileChange = useCallback(
    (focussedFile: AppFile | null) => {
      // No file focussed yet
      if (!focussedFile) return;

      // Find the focussed file
      const explorerItem = explorerItems.find(
        (explorerItem) => explorerItem.id === focussedFile.id
      ) as ExplorerItem;

      // Convert the existing expanded nodes to set for ease of access
      const expandedNodes = new Set(expandedExplorerItemIds);

      // add the parent node ids of the current focussed file to expandedSet
      explorerItem.parentIds.forEach((id) => expandedNodes.add(`directory___${id}`));

      // Expand the public or private directory (as this is not included in the parentIds
      expandedNodes.add(`directory___${explorerItem.isPrivate ? 'private' : 'public'}`);

      // Update the expanded ids
      setExpandedExplorerItemIds(Array.from(expandedNodes));
    },
    [explorerItems, expandedExplorerItemIds]
  );

  // Do something whenever the focussed file id changes.
  useEffect(() => {
    onFocussedFileChange(focussedFile);
  }, [focussedFile]);
};

export default useOnFocussedFileChange;
