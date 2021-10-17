const configuration = {
  ADMIN_EMAILS: ['me@vighnesh153.com', 'vighnesh.raut13@gmail.com', 'vighnesh.raut133@gmail.com'],
  FIREBASE: {
    CONFIG: {
      apiKey: 'AIzaSyAeYODLnJxZK9MYDCW9gL-dWXZUTysEvHE',
      authDomain: 'rv-js-docs.firebaseapp.com',
      projectId: 'rv-js-docs',
      storageBucket: 'rv-js-docs.appspot.com',
      messagingSenderId: '600915178178',
      appId: '1:600915178178:web:58777388df0330b0c8815b',
      measurementId: 'G-SHHZH0Z2ER',
    },
    FIRESTORE: {
      COLLECTIONS: {
        FILE_META: 'file-meta',
        FILES: 'files',
        PRIVATE: 'private/vighnesh', // 2 segments are required as prefix because firebase requires odd number of segments
      },
    },
  },
};

export default configuration;
