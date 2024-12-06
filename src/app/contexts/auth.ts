import { createContext } from 'react';

type ContextValue = {
  signedIn: boolean;
  signin: (token: string) => void;
  signout: () => void;
};

export const AuthContext = createContext<ContextValue>({} as ContextValue);
