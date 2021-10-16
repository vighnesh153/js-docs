// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import configuration from 'constants/configuration';

import { googleProvider } from './firebaseAuth';

// Initialize Firebase
const firebaseApp = initializeApp(configuration.FIREBASE.CONFIG);

const firebase = {
  auth: getAuth(firebaseApp),
  authProvider: googleProvider,
  db: getFirestore(firebaseApp),
};

export { firebase };
