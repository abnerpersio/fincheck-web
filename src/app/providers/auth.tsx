import { AuthContext } from '../contexts/auth';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider(props: Props) {
  const { children } = props;

  return (
    <AuthContext.Provider
      value={{
        signedIn: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
