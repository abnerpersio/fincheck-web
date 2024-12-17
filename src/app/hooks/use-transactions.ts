import { useQuery } from '@tanstack/react-query';
import { TransactionsService } from '../services/transactions';

export function useTransactions() {
  const { data, ...query } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => new TransactionsService().list().then((result) => result?.data),
    staleTime: Infinity,
  });

  return {
    ...query,
    transactions: data ?? [],
  };
}
