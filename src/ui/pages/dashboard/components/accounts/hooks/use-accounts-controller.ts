import { useMemo } from 'react';
import { useBankAccounts } from '../../../../../../app/hooks/use-bank-accounts';

export function useAccountsController() {
  const { accounts, isFetching } = useBankAccounts();

  const totalBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + (account.currentBalance ?? 0), 0);
  }, [accounts]);

  return {
    totalBalance,
    accounts,
    isLoading: isFetching,
  };
}
