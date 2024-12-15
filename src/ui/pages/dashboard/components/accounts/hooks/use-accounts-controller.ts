import { useBankAccounts } from '../../../../../../app/hooks/use-bank-accounts';

export function useAccountsController() {
  const { data: accounts, isLoading } = useBankAccounts();

  return {
    accounts: accounts || [],
    isLoading,
  };
}
