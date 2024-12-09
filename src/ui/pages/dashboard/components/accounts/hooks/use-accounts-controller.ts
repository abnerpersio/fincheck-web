export function useAccountsController() {
  return {
    accounts: [
      {
        color: '#7950F2',
        name: 'Nubank',
        balance: 100.23,
        type: 'CHECKING' as const,
      },
      {
        color: '#f89943',
        name: 'Inter',
        balance: 2000.99,
        type: 'CHECKING' as const,
      },
      {
        color: '#000',
        name: 'XP',
        balance: 10000.23,
        type: 'INVESTMENT' as const,
      },
    ],
    isLoading: false,
  };
}
