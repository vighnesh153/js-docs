/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { useMemo, useState } from 'react';

interface GlobalsContextProps {
  unsavedFileIds: Set<string>;
  setUnsavedFileIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const GlobalsContext = React.createContext<GlobalsContextProps>({
  unsavedFileIds: new Set(),
  setUnsavedFileIds: (value) => null,
});
export default GlobalsContext;

export const GlobalsContextProvider: React.FC = (props) => {
  const [unsavedFileIds, setUnsavedFileIds] = useState<Set<string>>(new Set());

  const value = useMemo<GlobalsContextProps>(
    () => ({
      unsavedFileIds,
      setUnsavedFileIds,
    }),
    [unsavedFileIds]
  );

  return <GlobalsContext.Provider value={value}>{props.children}</GlobalsContext.Provider>;
};
