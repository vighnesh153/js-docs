// TODO: Maybe move this out of the code?
const configuration = {
  ADMIN_EMAILS: ['me@vighnesh153.com', 'vighnesh.raut13@gmail.com', 'vighnesh.raut133@gmail.com'],
  FIREBASE: {
    FIRESTORE: {
      COLLECTIONS: {
        FILE_META: 'file-meta',
        PRIVATE: 'private/vighnesh', // 2 segments are required as prefix because firebase requires odd number of segments
      },
    },
  },
};

export default configuration;
