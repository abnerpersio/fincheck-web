import { createContext, useCallback, useState } from 'react';
import { BankAccount } from '../../../../app/entities/bank-account';
import { Transaction, TransactionType } from '../../../../app/entities/transaction';

type ContextValue = {
  isCurrencyVisible: boolean;
  onToggleCurrencyVisibility: () => void;
  isNewAccountModalVisible: boolean;
  onOpenNewAccountModal: () => void;
  onCloseNewAccountModal: () => void;
  isEditAccountModalVisible: boolean;
  accountBeingEdited: BankAccount | null;
  onOpenEditAccountModal: (bankAccount: BankAccount) => void;
  onCloseEditAccountModal: () => void;
  isNewTransactionModalVisible: boolean;
  onOpenNewTransactionModal: (type: TransactionType) => void;
  onCloseNewTransactionModal: () => void;
  newTransactionType: TransactionType | null;
  isEditTransactionModalVisible: boolean;
  onOpenEditTransactionModal: (transaction: Transaction) => void;
  onCloseEditTransactionModal: () => void;
  transactionBeingEdited: Transaction | null;
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

  const [isEditAccountModalVisible, setIsEditAccountModalVisible] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

  const [isNewTransactionModalVisible, setIsNewTransactionModalVisible] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<TransactionType | null>(null);

  const [isEditTransactionModalVisible, setIsEditTransactionModalVisible] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

  const handleToggleCurrencyVisibility = useCallback(() => {
    setIsCurrencyVisible((prevState) => !prevState);
  }, []);

  const handleOpenNewAccountModal = useCallback(() => {
    setIsNewAccountModalVisible(true);
  }, []);

  const handleCloseNewAccountModal = useCallback(() => {
    setIsNewAccountModalVisible(false);
  }, []);

  const handleOpenEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setIsEditAccountModalVisible(true);
    setAccountBeingEdited(bankAccount);
  }, []);

  const handleCloseEditAccountModal = useCallback(() => {
    setIsEditAccountModalVisible(false);
    setAccountBeingEdited(null);
  }, []);

  const handleOpenNewTransactionModal = useCallback((type: TransactionType) => {
    setIsNewTransactionModalVisible(true);
    setNewTransactionType(type);
  }, []);

  const handleCloseNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalVisible(false);
    setNewTransactionType(null);
  }, []);

  const handleOpenEditTransactionModal = useCallback((transaction: Transaction) => {
    setIsEditTransactionModalVisible(true);
    setTransactionBeingEdited(transaction);
  }, []);

  const handleCloseEditTransactionModal = useCallback(() => {
    setIsEditTransactionModalVisible(false);
    setTransactionBeingEdited(null);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isCurrencyVisible,
        onToggleCurrencyVisibility: handleToggleCurrencyVisibility,
        isNewAccountModalVisible,
        onOpenNewAccountModal: handleOpenNewAccountModal,
        onCloseNewAccountModal: handleCloseNewAccountModal,
        isEditAccountModalVisible,
        accountBeingEdited,
        onOpenEditAccountModal: handleOpenEditAccountModal,
        onCloseEditAccountModal: handleCloseEditAccountModal,
        isNewTransactionModalVisible,
        newTransactionType,
        onOpenNewTransactionModal: handleOpenNewTransactionModal,
        onCloseNewTransactionModal: handleCloseNewTransactionModal,
        isEditTransactionModalVisible,
        transactionBeingEdited,
        onOpenEditTransactionModal: handleOpenEditTransactionModal,
        onCloseEditTransactionModal: handleCloseEditTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
