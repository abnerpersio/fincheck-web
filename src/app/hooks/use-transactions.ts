import { useQuery } from '@tanstack/react-query';
import { TransactionsFilters, TransactionsService } from '../services/transactions';

export function useTransactions(filters: TransactionsFilters) {
  const { data, ...query } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => new TransactionsService().list(filters).then((result) => result?.data),
    staleTime: Infinity,
  });

  return {
    ...query,
    transactions: data ?? [],
  };
}
