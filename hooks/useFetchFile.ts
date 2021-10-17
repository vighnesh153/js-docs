import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';

import configuration from 'constants/configuration';
import { firebase } from 'services/firebase';
import GlobalsContext from 'contexts/GlobalsContext';
import { useFileContextActions } from 'store/contexts/FileContext';

import ExplorerItem from 'models/ExplorerItem';
import Cell from 'models/Cell';

interface FetchFileArgs {
  fileId: string;
  isPrivate: boolean;
}

const useFetchFile = (props: FetchFileArgs) => {
  const { explorerItems } = useContext(GlobalsContext);
  const { initializeCells } = useFileContextActions();
  const [loading, setLoading] = useState(false);

  const fetchFile = useCallback((args: FetchFileArgs) => {
    // Fetch the corresponding explorer item
    const explorerItem = explorerItems.find(
      (explorerItem) => explorerItem.id === props.fileId
    ) as ExplorerItem;

    const { FILES, PRIVATE } = configuration.FIREBASE.FIRESTORE.COLLECTIONS;
    const collectionPathPrefix = args.isPrivate ? `${PRIVATE}/` : '';

    setLoading(true);

    // Spinner toast
    const loadingToastId = toast.dark(`Fetching file ${explorerItem.name}...`, {
      isLoading: true,
      autoClose: false,
    });

    // Fetch from firestore
    getDoc(doc(firebase.db, `${collectionPathPrefix}${FILES}`, args.fileId))
      .then((res) => {
        // Store the fetched cells in the store
        const { data } = (res.data() || {}) as any;
        initializeCells(Object.keys(data || []).map((key) => Cell.deserialize(data[key])));
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong fetching. Check the console for more info.');
      })
      .finally(() => {
        setLoading(false);
        toast.dismiss(loadingToastId);
      });
  }, []);

  useEffect(() => {
    fetchFile(props);
  }, []);

  return { fetchFile, loading };
};

export default useFetchFile;
