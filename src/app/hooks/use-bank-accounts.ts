import { useQuery } from '@tanstack/react-query';
import { BankAccountsService } from '../services/bank-accounts';

export function useBankAccounts() {
  return useQuery({
    queryKey: ['bank-accounts'],
    queryFn: () => new BankAccountsService().list().then((result) => result?.data),
    staleTime: Infinity,
  });
}
