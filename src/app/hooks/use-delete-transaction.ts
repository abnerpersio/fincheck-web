import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TransactionsService } from '../services/transactions';

type Options = {
  onSuccess?: () => void;
};

export function useDeleteTransaction(options?: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['transaction', 'delete'],
    mutationFn: (accountId: string) => new TransactionsService().delete(accountId),
    onSuccess: () => {
      toast.success('Transação excluida com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      options?.onSuccess?.();
    },
    onError: () => toast.error('Não foi possível excluir a transação!'),
  });
}
