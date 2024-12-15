import { createContext, useCallback, useState } from 'react';
import { TransactionType } from '../../../../app/types/transaction';

type ContextValue = {
  isCurrencyVisible: boolean;
  onToggleCurrencyVisibility: () => void;
  isNewAccountModalVisible: boolean;
  onOpenNewAccountModal: () => void;
  onCloseNewAccountModal: () => void;
  isNewTransactionModalVisible: boolean;
  onOpenNewTransactionModal: (type: TransactionType) => void;
  onCloseNewTransactionModal: () => void;
  newTransactionType: TransactionType | null;
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

  const [isNewTransactionModalVisible, setIsNewTransactionModalVisible] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<TransactionType | null>(null);

  const handleToggleCurrencyVisibility = useCallback(() => {
    setIsCurrencyVisible((prevState) => !prevState);
  }, []);

  const handleOpenNewAccountModal = useCallback(() => {
    setIsNewAccountModalVisible(true);
  }, []);

  const handleCloseNewAccountModal = useCallback(() => {
    setIsNewAccountModalVisible(false);
  }, []);

  const handleOpenNewTransactionModal = useCallback((type: TransactionType) => {
    setIsNewTransactionModalVisible(true);
    setNewTransactionType(type);
  }, []);

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalVisible(false);
    setNewTransactionType(null);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isCurrencyVisible,
        onToggleCurrencyVisibility: handleToggleCurrencyVisibility,
        isNewAccountModalVisible,
        onOpenNewAccountModal: handleOpenNewAccountModal,
        onCloseNewAccountModal: handleCloseNewAccountModal,
        isNewTransactionModalVisible,
        newTransactionType,
        onOpenNewTransactionModal: handleOpenNewTransactionModal,
        onCloseNewTransactionModal: handleCloseNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
