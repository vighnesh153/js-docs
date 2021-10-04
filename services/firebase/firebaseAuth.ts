import { GoogleAuthProvider } from 'firebase/auth';

const getGoogleProvider = (): GoogleAuthProvider => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  return provider;
};

export const googleProvider = getGoogleProvider();
