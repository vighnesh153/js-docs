import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ExplorerItem from 'models/ExplorerItem';

interface GlobalsContextProps {
  /**
   * To track  all the unsaved files
   */
  unsavedFileIds: Set<string>;
  setUnsavedFileIds: React.Dispatch<React.SetStateAction<Set<string>>>;

  /**
   * To track all the open files in tabs
   */
  openFileIds: string[];
  setOpenFileIds: React.Dispatch<React.SetStateAction<string[]>>;

  /**
   * File/Directory meta information
   */
  explorerItems: ExplorerItem[];
  setExplorerItems: React.Dispatch<React.SetStateAction<ExplorerItem[]>>;

  /**
   * Ids of the explorerItems that are expanded
   */
  expandedExplorerItemIds: string[];
  setExpandedExplorerItemIds: React.Dispatch<React.SetStateAction<string[]>>;

  /**
   * File under focus (Used to decide which file is active in the view
   */
  focussedFileId: string | null;
  setFocussedFileId: React.Dispatch<React.SetStateAction<string | null>>;

  /**
   * Focussed node id (Used to decide on what node, the ExplorerActions, should act upon
   */
  focussedNodeId: string | null;
  setFocussedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlobalsContext = React.createContext<GlobalsContextProps>({
  unsavedFileIds: new Set(),
  setUnsavedFileIds: () => null,

  openFileIds: [],
  setOpenFileIds: () => null,

  explorerItems: [],
  setExplorerItems: () => null,

  expandedExplorerItemIds: [],
  setExpandedExplorerItemIds: () => null,

  focussedFileId: null,
  setFocussedFileId: () => null,

  focussedNodeId: null,
  setFocussedNodeId: () => null,
});
export default GlobalsContext;

export const GlobalsContextProvider: React.FC = (props) => {
  const [unsavedFileIds, setUnsavedFileIds] = useState<Set<string>>(new Set());
  const [openFileIds, setOpenFileIds] = useState<string[]>([]);
  const [explorerItems, setExplorerItems] = useState<ExplorerItem[]>([]);
  const [expandedExplorerItemIds, setExpandedExplorerItemIds] = useState<string[]>([]);
  const [focussedFileId, setFocussedFileId] = useState<string | null>(null);
  const [focussedNodeId, setFocussedNodeId] = useState<string | null>(null);

  const onFocussedFileChange = useCallback(
    (focussedFileId: string | null) => {
      // No file focussed yet
      if (!focussedFileId) return;

      // Find the focussed file
      const explorerItem = explorerItems.find(
        (explorerItem) => explorerItem.id === focussedFileId
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
    onFocussedFileChange(focussedFileId);
  }, [focussedFileId]);

  const value = useMemo<GlobalsContextProps>(
    () => ({
      unsavedFileIds,
      setUnsavedFileIds,

      openFileIds,
      setOpenFileIds,

      explorerItems,
      setExplorerItems,

      expandedExplorerItemIds,
      setExpandedExplorerItemIds,

      focussedFileId,
      setFocussedFileId,

      focussedNodeId,
      setFocussedNodeId,
    }),
    [
      unsavedFileIds,
      openFileIds,
      explorerItems,
      expandedExplorerItemIds,
      focussedFileId,
      focussedNodeId,
    ]
  );

  return <GlobalsContext.Provider value={value}>{props.children}</GlobalsContext.Provider>;
};
