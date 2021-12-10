/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { collection, getDocs } from 'firebase/firestore';

import { firebase } from 'services/firebase';
import configuration from 'constants/configuration';
import ExplorerItem from 'models/ExplorerItem';

const { FILE_META, PRIVATE } = configuration.FIREBASE.FIRESTORE.COLLECTIONS;

const CACHE: {
  explorerItems: ExplorerItem[] | null;
} = {
  explorerItems: null,
};

export const fetchExplorerItems = async (fetchPrivate?: boolean): Promise<ExplorerItem[]> => {
  const promises = [getDocs(collection(firebase.db, FILE_META))];
  if (fetchPrivate) {
    promises.push(getDocs(collection(firebase.db, `${PRIVATE}/${FILE_META}`)));
  }

  if (CACHE.explorerItems) {
    return CACHE.explorerItems;
  }

  try {
    const responses = await Promise.all(promises);
    const explorerItems: ExplorerItem[] = [];

    responses.forEach((response) => {
      response.docs.forEach((doc) => explorerItems.push(doc.data() as ExplorerItem));
    });

    CACHE.explorerItems = explorerItems;

    return explorerItems;
  } catch (err) {
    return [];
  }
};
