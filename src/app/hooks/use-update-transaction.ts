import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { TransactionTypes } from '../entities/transaction';
import { TransactionsService, UpdateTransactionPayload } from '../services/transactions';

type Options = {
  onSuccess?: () => void;
};

type Params = {
  transactionId: string;
  payload: UpdateTransactionPayload;
};

export function useUpdateTransaction(options?: Options) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['transaction', 'update'],
    mutationFn: (params: Params) =>
      new TransactionsService().update(params.transactionId, params.payload),
    onSuccess: (_, { payload }) => {
      toast.success(
        payload.type === TransactionTypes.EXPENSE
          ? 'Despesa atualizada com sucesso'
          : 'Receita atualizada com sucesso',
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      options?.onSuccess?.();
    },
    onError: (_, { payload }) =>
      toast.error(
        payload.type === TransactionTypes.EXPENSE
          ? 'Não foi possível atualizar a despesa'
          : 'Não foi possível atualizar a receita',
      ),
  });
}
