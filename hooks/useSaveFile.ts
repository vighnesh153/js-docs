import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useHotkeys } from 'react-hotkeys-hook';
import { doc, setDoc } from 'firebase/firestore';

import { firebase } from 'services/firebase';
import ExplorerItem from 'models/ExplorerItem';
import FileContext, { useFileContextActions } from 'store/contexts/FileContext';
import GlobalsContext from 'contexts/GlobalsContext';
import configuration from 'constants/configuration';

interface Props {
  fileId: string;
  isPrivate: boolean;
}

const useSaveFile = (props: Props) => {
  const { explorerItems } = useContext(GlobalsContext);
  const { fileSavedSuccessfully } = useFileContextActions();
  const { cells } = useContext(FileContext);

  useHotkeys(
    'cmd+s',
    (e: KeyboardEvent) => {
      // Prevent the default save functionality by browser
      e.preventDefault();

      // Ignore the event if the file doesn't require saving
      if (cells.saveRequired === false) return;

      // Fetch the corresponding explorer item
      const explorerItem = explorerItems.find(
        (explorerItem) => explorerItem.id === props.fileId
      ) as ExplorerItem;

      const { FILES, PRIVATE } = configuration.FIREBASE.FIRESTORE.COLLECTIONS;

      const collectionPathPrefix = props.isPrivate ? `${PRIVATE}/` : '';

      // Spinner toast
      const loadingToastId = toast.dark(`Saving file ${explorerItem.name}...`, {
        isLoading: true,
        autoClose: false,
      });

      // Serialize the payload
      const payload: any = { ...cells.data };
      for (const key of Object.keys(payload)) {
        payload[key] = payload[key].serialize();
      }

      // Save in firestore
      setDoc(
        doc(firebase.db, `${collectionPathPrefix}${FILES}`, props.fileId),
        {
          fileId: props.fileId,
          data: payload,
        },
        { merge: true }
      )
        .then(() => {
          toast.success(`${explorerItem.name} saved successfully.`);
          fileSavedSuccessfully();
        })
        .catch((e) => {
          console.error(e);
          toast.error('Something went wrong. Check the console for more info.');
        })
        .finally(() => {
          // Clear spinner toast
          toast.dismiss(loadingToastId);
        });
    },
    [cells.saveRequired, explorerItems]
  );
};

export default useSaveFile;
