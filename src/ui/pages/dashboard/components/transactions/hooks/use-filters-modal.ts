import { useState } from 'react';

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

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
  };
}
