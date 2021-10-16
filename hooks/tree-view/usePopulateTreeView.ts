import { useCallback, useContext, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { firebase } from 'services/firebase';
import JsDocsAuthContext from 'contexts/AuthContext';
import GlobalsContext from 'contexts/GlobalsContext';

import configuration from 'constants/configuration';
import ExplorerItem from 'models/ExplorerItem';

const usePopulateTreeView = () => {
  const globalsContext = useContext(GlobalsContext);
  const { isAdmin } = useContext(JsDocsAuthContext);

  const fetchAndPopulateTree = useCallback(() => {
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
    Promise.all(promises).then((responses) => {
      const explorerItems: ExplorerItem[] = [];

      responses.forEach((response) => {
        response.docs.forEach((doc) => explorerItems.push(doc.data() as ExplorerItem));
      });

      /**
       * Set the fetched items in context
       */
      globalsContext.setExplorerItems(explorerItems);
    });
  }, [isAdmin, globalsContext.setExplorerItems]);

  /**
   * Fetch only once
   */
  useEffect(() => {
    fetchAndPopulateTree();
  }, []);

  return { fetchAndPopulateTree };
};

export default usePopulateTreeView;
