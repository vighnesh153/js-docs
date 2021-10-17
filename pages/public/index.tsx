import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const PublicRoot: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return null;
};

export default PublicRoot;
