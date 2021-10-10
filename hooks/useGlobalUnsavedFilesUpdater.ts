import { useContext, useEffect } from 'react';
import GlobalsContext from 'contexts/GlobalsContext';
import FileContext from 'store/contexts/FileContext';

interface Props {
  fileId: string;
}

/**
 * Update the global unsaved files array with appropriate file ids.
 */
const useGlobalUnsavedFilesUpdater = (props: Props) => {
  const { setUnsavedFileIds } = useContext(GlobalsContext);
  const { cells } = useContext(FileContext);

  useEffect(() => {
    setUnsavedFileIds((prevFileIds) => {
      const unsavedFileIds = new Set(Array.from(prevFileIds));

      if (cells.saveRequired) {
        unsavedFileIds.add(props.fileId);
      } else {
        unsavedFileIds.delete(props.fileId);
      }

      return unsavedFileIds;
    });
  }, [cells.saveRequired, props.fileId]);
};

export default useGlobalUnsavedFilesUpdater;
