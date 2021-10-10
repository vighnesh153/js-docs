// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { googleProvider } from './firebaseAuth';

const firebaseConfig = {
  apiKey: 'AIzaSyAeYODLnJxZK9MYDCW9gL-dWXZUTysEvHE',
  authDomain: 'rv-js-docs.firebaseapp.com',
  projectId: 'rv-js-docs',
  storageBucket: 'rv-js-docs.appspot.com',
  messagingSenderId: '600915178178',
  appId: '1:600915178178:web:58777388df0330b0c8815b',
  measurementId: 'G-SHHZH0Z2ER',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const firebase = {
  auth,
  authProvider: googleProvider,
};

export { firebase };