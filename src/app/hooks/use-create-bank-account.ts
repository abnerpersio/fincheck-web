import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BankAccountsService, CreateBankAccountPayload } from '../services/bank-accounts';

type Options = {
  onSuccess?: () => void;
};

export function useCreateBankAccount(options?: Options) {
  return useMutation({
    mutationKey: ['bank-account', 'create'],
    mutationFn: (payload: CreateBankAccountPayload) => new BankAccountsService().create(payload),
    onSuccess: () => {
      toast.success('Conta criada com sucesso!');
      console.log('options', options);
      options?.onSuccess?.();
    },
    onError: () => toast.success('Não foi possível criar a conta!'),
  });
}
