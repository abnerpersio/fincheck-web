import { useQuery } from '@tanstack/react-query';
import { BankAccountsService } from '../services/bank-accounts';

export function useBankAccounts() {
  const { data, ...query } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: () => new BankAccountsService().list().then((result) => result?.data),
    staleTime: Infinity,
  });

  return {
    ...query,
    accounts: data ?? [],
  };
}
