import { useState } from 'react';
import { useTransactions } from '../../../../../../app/hooks/use-transactions';

export function useTransactionsController() {
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
  const { transactions, isFetching } = useTransactions();

  const handleOpenFiltersModal = () => {
    setIsFiltersModalVisible(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalVisible(false);
  };

  return {
    transactions,
    isLoading: isFetching,
    isFiltersModalVisible,
    onOpenFiltersModal: handleOpenFiltersModal,
    onCloseFiltersModal: handleCloseFiltersModal,
  };
}
