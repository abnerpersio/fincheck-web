import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { localStorageKeys } from '../../infra/local-storage';
import { LaunchScreen } from '../../ui/components/launch-screen';
import { AuthContext } from '../contexts/auth';
import { useUserDetails } from '../hooks/use-user-details';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider(props: Props) {
  const { children } = props;

  const [hasAccessToken, setHasAccessToken] = useState<boolean>(() => {
    const fromStorage = localStorage.getItem(localStorageKeys.accessToken);
    return !!fromStorage;
  });

  const {
    isFetching,
    isSuccess,
    isError,
    remove: removeUserDetails,
  } = useUserDetails({
    enabled: hasAccessToken,
  });

  const signin = useCallback((token: string) => {
    if (!token) {
      return;
    }

    localStorage.setItem(localStorageKeys.accessToken, token);
    setHasAccessToken(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.accessToken);
    setHasAccessToken(false);
    removeUserDetails();
  }, [removeUserDetails]);

  useEffect(() => {
    if (isError) {
      toast.error('Sessão expirada. Faça login novamente.');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: hasAccessToken && isSuccess,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
