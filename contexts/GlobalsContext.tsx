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
   * File under focus
   */
  focussedFileId: string | null;
  setFocussedFileId: React.Dispatch<React.SetStateAction<string | null>>;
}

const GlobalsContext = React.createContext<GlobalsContextProps>({
  unsavedFileIds: new Set(),
  setUnsavedFileIds: () => null,

  openFileIds: [],
  setOpenFileIds: () => null,

  explorerItems: [],
  setExplorerItems: () => null,

  focussedFileId: null,
  setFocussedFileId: () => null,
});
export default GlobalsContext;

export const GlobalsContextProvider: React.FC = (props) => {
  const [unsavedFileIds, setUnsavedFileIds] = useState<Set<string>>(new Set());
  const [openFileIds, setOpenFileIds] = useState<string[]>([]);
  const [explorerItems, setExplorerItems] = useState<ExplorerItem[]>([]);
  const [focussedFileId, setFocussedFileId] = useState<string | null>(null);

  const value = useMemo<GlobalsContextProps>(
    () => ({
      unsavedFileIds,
      setUnsavedFileIds,

      openFileIds,
      setOpenFileIds,

      explorerItems,
      setExplorerItems,

      focussedFileId,
      setFocussedFileId,
    }),
    [unsavedFileIds, openFileIds, explorerItems, focussedFileId]
  );

  return <GlobalsContext.Provider value={value}>{props.children}</GlobalsContext.Provider>;
};
