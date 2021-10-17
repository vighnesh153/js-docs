import React, { useMemo, useState } from 'react';
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
