import { useState } from 'react';
import { TransactionTypes } from '../../../../../../app/entities/transaction';

export function useTransactionsController() {
  const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalVisible(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalVisible(false);
  };

  return {
    transactions: [
      {
        id: 'random-uuid-1',
        description: 'Almoço',
        type: 'EXPENSE' as const,
        date: '2023-09-07T00:00:00.000Z',
        value: -100.99,
      },
      {
        id: 'random-uuid-2',
        description: 'Uber',
        type: 'EXPENSE' as const,
        date: '2023-09-07T00:00:00.000Z',
        value: -50.99,
      },
      {
        id: 'random-uuid-3',
        description: 'Salário',
        type: TransactionTypes.INCOME,
        date: '2023-09-07T00:00:00.000Z',
        value: 200,
      },
      {
        id: 'random-uuid-4',
        description: 'Freela',
        type: TransactionTypes.INCOME,
        date: '2023-09-07T00:00:00.000Z',
        value: 500,
      },
    ],
    isLoading: false,
    isFiltersModalVisible,
    onOpenFiltersModal: handleOpenFiltersModal,
    onCloseFiltersModal: handleCloseFiltersModal,
  };
}
