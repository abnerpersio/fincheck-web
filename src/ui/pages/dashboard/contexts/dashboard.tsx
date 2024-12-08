import { createContext, useCallback, useState } from 'react';

type ContextValue = {
  isCurrencyVisible: boolean;
  onToggleCurrencyVisibility: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext<ContextValue>({} as ContextValue);

type Props = {
  children: React.ReactNode;
};

export function DashboardProvider(props: Props) {
  const { children } = props;

  const [isCurrencyVisible, setIsCurrencyVisible] = useState(true);

  const handleToggleCurrencyVisibility = useCallback(() => {
    setIsCurrencyVisible((prevState) => !prevState);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isCurrencyVisible,
        onToggleCurrencyVisibility: handleToggleCurrencyVisibility,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
