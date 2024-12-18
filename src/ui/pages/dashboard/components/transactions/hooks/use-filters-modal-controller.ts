import { useState } from 'react';
import { useBankAccounts } from '../../../../../../app/hooks/use-bank-accounts';
import { TransactionsFilters } from '../../../../../../app/services/transactions';

type Options = {
  defaultValues?: TransactionsFilters;
};

export function useFiltersModalController(options?: Options) {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(
    options?.defaultValues?.bankAccountId ?? null,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    options?.defaultValues?.year ?? new Date().getFullYear(),
  );

  const { accounts, isFetching: isLoadingAccounts } = useBankAccounts();

  const handleToggleBankAccount = (bankAccountId: string) => {
    setSelectedBankAccountId((prevState) => (prevState === bankAccountId ? null : bankAccountId));
  };

  const handleChangeYear = (step: number) => {
    setSelectedYear((prevState) => prevState + step);
  };

  return {
    selectedBankAccountId,
    handleToggleBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
    isLoadingAccounts,
  };
}
