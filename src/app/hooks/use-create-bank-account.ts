import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BankAccountsService, CreateBankAccountPayload } from '../services/bank-accounts';

type Options = {
  onSuccess?: () => void;
};

export function useCreateBankAccount(options?: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['bank-account', 'create'],
    mutationFn: (payload: CreateBankAccountPayload) => new BankAccountsService().create(payload),
    onSuccess: () => {
      toast.success('Conta criada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      options?.onSuccess?.();
    },
    onError: () => toast.success('Não foi possível criar a conta!'),
  });
}
