import { createContext } from 'react';

type ContextValue = {
  signedIn: boolean;
};

export const AuthContext = createContext<ContextValue>({} as ContextValue);
