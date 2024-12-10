import { createContext, useCallback, useState } from 'react';

type ContextValue = {
  isCurrencyVisible: boolean;
  onToggleCurrencyVisibility: () => void;
  isNewAccountModalVisible: boolean;
  onOpenNewAccountModal: () => void;
  onCloseNewAccountModal: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext<ContextValue>({} as ContextValue);

type Props = {
  children: React.ReactNode;
};

export function DashboardProvider(props: Props) {
  const { children } = props;

  const [isCurrencyVisible, setIsCurrencyVisible] = useState(true);
  const [isNewAccountModalVisible, setIsNewAccountModalVisible] = useState(false);

  const handleToggleCurrencyVisibility = useCallback(() => {
    setIsCurrencyVisible((prevState) => !prevState);
  }, []);

  const handleOpenNewAccountModal = useCallback(() => {
    setIsNewAccountModalVisible(true);
  }, []);

  const handleCloseNewAccountModal = useCallback(() => {
    setIsNewAccountModalVisible(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isCurrencyVisible,
        onToggleCurrencyVisibility: handleToggleCurrencyVisibility,
        isNewAccountModalVisible,
        onOpenNewAccountModal: handleOpenNewAccountModal,
        onCloseNewAccountModal: handleCloseNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
