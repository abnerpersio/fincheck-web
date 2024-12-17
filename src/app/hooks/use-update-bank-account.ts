import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BankAccountsService, UpdateBankAccountPayload } from '../services/bank-accounts';

type Options = {
  onSuccess?: () => void;
};

type Params = {
  accountId: string;
  payload: UpdateBankAccountPayload;
};

export function useUpdateBankAccount(options?: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['bank-account', 'update'],
    mutationFn: (params: Params) =>
      new BankAccountsService().update(params.accountId, params.payload),
    onSuccess: () => {
      toast.success('Conta atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      options?.onSuccess?.();
    },
    onError: () => toast.error('Não foi possível atualizar a conta!'),
  });
}
