import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { signInWithPopup, signOut as firebaseSignOut, UserCredential, User } from 'firebase/auth';
import { firebase } from 'services/firebase';
import configuration from 'constants/configuration';

interface IAuthContext {
  currentUser: null | User;
  getUser: () => User | null;
  signIn: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
  authLoading: boolean;
  isAdmin: boolean;
}

const JsDocsAuthContext = createContext<IAuthContext>({
  currentUser: null,
  getUser: () => null,
  signIn: () => Promise.resolve({} as UserCredential),
  signOut: () => Promise.resolve(),
  authLoading: false,
  isAdmin: false,
});

export const useJsDocsAuth = () => {
  return useContext(JsDocsAuthContext);
};

export const JsDocsAuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const signIn = (): Promise<UserCredential> => {
    setAuthLoading(true);
    return signInWithPopup(firebase.auth, firebase.authProvider);
  };
  const signOut = () => firebaseSignOut(firebase.auth);
  const getUser = () => firebase.auth.currentUser as User | null;

  const isAdmin = useMemo(() => configuration.ADMIN_EMAILS.includes(currentUser?.email || ''), [currentUser]);

  useEffect(() => {
    return firebase.auth.onAuthStateChanged((user) => {
      setCurrentUser(user as User);
      setAuthLoading(false);
    });
  }, []);

  const value = useMemo(
    () => ({ currentUser, getUser, signIn, signOut, isAdmin, authLoading }),
    [currentUser, getUser, signIn, signOut, isAdmin, authLoading]
  );

  return <JsDocsAuthContext.Provider value={value}>{children}</JsDocsAuthContext.Provider>;
};

export default JsDocsAuthContext;
