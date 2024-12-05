import { useCallback, useState } from 'react';
import { localStorageKeys } from '../../infra/local-storage';
import { AuthContext } from '../contexts/auth';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider(props: Props) {
  const { children } = props;

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const fromStorage = localStorage.getItem(localStorageKeys.accessToken);
    return !!fromStorage;
  });

  const signin = useCallback((token: string) => {
    if (!token) {
      return;
    }

    localStorage.setItem(localStorageKeys.accessToken, token);
    setSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signedIn,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
