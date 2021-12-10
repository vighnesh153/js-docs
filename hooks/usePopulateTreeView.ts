import { useCallback, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { collection, getDocs } from 'firebase/firestore';

import { firebase } from 'services/firebase';
import JsDocsAuthContext from 'contexts/AuthContext';
import GlobalsContext from 'contexts/GlobalsContext';

import configuration from 'constants/configuration';
import ExplorerItem from 'models/ExplorerItem';

interface Props {
  fetchOnMount?: boolean;
}

const usePopulateTreeView = (props?: Props) => {
  const globalsContext = useContext(GlobalsContext);
  const { isAdmin } = useContext(JsDocsAuthContext);

  const fetchAndPopulateTree = useCallback(
    (args?: { isRefresh?: boolean }) => {
      const { FILE_META, PRIVATE } = configuration.FIREBASE.FIRESTORE.COLLECTIONS;

      /**
       * Public collection
       */
      const promises = [getDocs(collection(firebase.db, FILE_META))];
      if (isAdmin) {
        /**
         * Admins private only collection.
         */
        promises.push(getDocs(collection(firebase.db, `${PRIVATE}/${FILE_META}`)));
      }

      /**
       * Fetch from firebase
       */
      const infoToastId = args?.isRefresh
        ? toast.dark('Refreshing explorer...', {
            isLoading: true,
            autoClose: false,
          })
        : null;
      Promise.all(promises)
        .then((responses) => {
          const explorerItems: ExplorerItem[] = [];

          responses.forEach((response) => {
            response.docs.forEach((doc) => explorerItems.push(doc.data() as ExplorerItem));
          });

          /**
           * Set the fetched items in context
           */
          globalsContext.setExplorerItems(explorerItems);

          if (args?.isRefresh) {
            toast.success('Refresh successful.');
          }
        })
        .finally(() => {
          if (infoToastId) {
            toast.dismiss(infoToastId);
          }
        });
    },
    [isAdmin, globalsContext.setExplorerItems]
  );

  /**
   * Fetch after mount
   */
  useEffect(() => {
    if (props?.fetchOnMount) {
      fetchAndPopulateTree();
    }
  }, [fetchAndPopulateTree]);

  return { fetchAndPopulateTree };
};

export default usePopulateTreeView;
