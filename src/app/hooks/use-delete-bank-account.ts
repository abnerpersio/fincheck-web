import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BankAccountsService } from '../services/bank-accounts';

type Options = {
  onSuccess?: () => void;
};

export function useDeleteBankAccount(options?: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['bank-account', 'delete'],
    mutationFn: (accountId: string) => new BankAccountsService().delete(accountId),
    onSuccess: () => {
      toast.success('Conta removida com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      options?.onSuccess?.();
    },
    onError: () => toast.error('Não foi possível remover a conta!'),
  });
}
