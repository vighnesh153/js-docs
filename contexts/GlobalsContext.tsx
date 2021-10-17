import React, { useMemo, useState } from 'react';
import ExplorerItem from 'models/ExplorerItem';

export type AppFile = {
  id: string;
  isPrivate: boolean;
};

interface GlobalsContextProps {
  /**
   * To track  all the unsaved files
   */
  unsavedFileIds: Set<string>;
  setUnsavedFileIds: React.Dispatch<React.SetStateAction<Set<string>>>;

  /**
   * To track all the open files in tabs
   */
  openFiles: AppFile[];
  setOpenFiles: React.Dispatch<React.SetStateAction<AppFile[]>>;

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
   * File under focus (Used to decide which file is active in the view)
   */
  focussedFile: AppFile | null;
  setFocussedFile: React.Dispatch<React.SetStateAction<AppFile | null>>;

  /**
   * Focussed node id (Used to decide on what node, the ExplorerActions, should act upon
   */
  focussedNodeId: string | null;
  setFocussedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlobalsContext = React.createContext<GlobalsContextProps>({
  unsavedFileIds: new Set(),
  setUnsavedFileIds: () => null,

  openFiles: [],
  setOpenFiles: () => null,

  explorerItems: [],
  setExplorerItems: () => null,

  expandedExplorerItemIds: [],
  setExpandedExplorerItemIds: () => null,

  focussedFile: null,
  setFocussedFile: () => null,

  focussedNodeId: null,
  setFocussedNodeId: () => null,
});
export default GlobalsContext;

export const GlobalsContextProvider: React.FC = (props) => {
  const [unsavedFileIds, setUnsavedFileIds] = useState<Set<string>>(new Set());
  const [openFiles, setOpenFiles] = useState<AppFile[]>([]);
  const [explorerItems, setExplorerItems] = useState<ExplorerItem[]>([]);
  const [expandedExplorerItemIds, setExpandedExplorerItemIds] = useState<string[]>([]);
  const [focussedFile, setFocussedFile] = useState<AppFile | null>(null);
  const [focussedNodeId, setFocussedNodeId] = useState<string | null>(null);

  const value = useMemo<GlobalsContextProps>(
    () => ({
      unsavedFileIds,
      setUnsavedFileIds,

      openFiles,
      setOpenFiles,

      explorerItems,
      setExplorerItems,

      expandedExplorerItemIds,
      setExpandedExplorerItemIds,

      focussedFile,
      setFocussedFile,

      focussedNodeId,
      setFocussedNodeId,
    }),
    [
      unsavedFileIds,
      openFiles,
      explorerItems,
      expandedExplorerItemIds,
      focussedFile,
      focussedNodeId,
    ]
  );

  return <GlobalsContext.Provider value={value}>{props.children}</GlobalsContext.Provider>;
};
