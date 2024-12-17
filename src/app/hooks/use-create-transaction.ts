import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TransactionTypes } from '../entities/transaction';
import { CreateTransactionPayload, TransactionsService } from '../services/transactions';

type Options = {
  onSuccess?: () => void;
};

export function useCreateTransaction(options?: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['transaction', 'create'],
    mutationFn: (payload: CreateTransactionPayload) => new TransactionsService().create(payload),
    onSuccess: (_, payload) => {
      toast.success(
        `${payload.type === TransactionTypes.EXPENSE ? 'Despesa' : 'Receita'} criada com sucesso!`,
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      options?.onSuccess?.();
    },
    onError: (_, payload) =>
      toast.error(
        `Não foi possível criar a ${
          payload.type === TransactionTypes.EXPENSE ? 'despesa' : 'receita'
        }!`,
      ),
  });
}
