import { useEffect, useState } from 'react';
import { useTransactions } from '../../../../../../app/hooks/use-transactions';
import { TransactionsFilters } from '../../../../../../app/services/transactions';

export function useTransactionsController() {
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);

  const [filters, setFilters] = useState<TransactionsFilters>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const { transactions, isFetching, refetch } = useTransactions(filters);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalVisible(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalVisible(false);
  };

  const handleApplyFilters = (filters: Partial<TransactionsFilters>) => {
    setFilters((prevState) => ({ ...prevState, ...filters }));
  };

  const handleChangeMonth = (month: number) => {
    setFilters((prevState) => ({ ...prevState, month }));
  };

  useEffect(() => {
    refetch();
  }, [refetch, filters]);

  return {
    transactions,
    isLoading: isFetching,
    isFiltersModalVisible,
    filters,
    onOpenFiltersModal: handleOpenFiltersModal,
    onCloseFiltersModal: handleCloseFiltersModal,
    onChangeMonth: handleChangeMonth,
    onApplyFilters: handleApplyFilters,
  };
}
