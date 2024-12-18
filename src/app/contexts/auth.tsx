import { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LaunchScreen } from '../../ui/components/launch-screen';
import { localStorageKeys } from '../constants/local-storage';
import { useUserDetails } from '../hooks/use-user-details';
import { GetMeResult } from '../services/users';

type ContextValue = {
  userDetails: GetMeResult | undefined;
  signedIn: boolean;
  signin: (token: string) => void;
  signout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<ContextValue>({} as ContextValue);

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
    data: userDetails,
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
        userDetails,
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
