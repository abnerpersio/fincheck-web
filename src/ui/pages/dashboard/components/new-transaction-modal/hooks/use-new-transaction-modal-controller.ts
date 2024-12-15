import { useDashboard } from '../../../hooks/use-dashboard';

export function useNewTransactionModalController() {
  const { isNewTransactionModalVisible, newTransactionType, onCloseNewTransactionModal } =
    useDashboard();

  return {
    isNewTransactionModalVisible,
    newTransactionType,
    onCloseNewTransactionModal,
  };
}
