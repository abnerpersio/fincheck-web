import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useBankAccounts } from '../../../../../../app/hooks/use-bank-accounts';
import { useCategories } from '../../../../../../app/hooks/use-categories';
import { useCreateTransaction } from '../../../../../../app/hooks/use-create-transaction';
import { useDashboard } from '../../../hooks/use-dashboard';

const createSchema = () =>
  z.object({
    value: z.number({ required_error: 'Campo obrigatório' }).min(0, 'Preencha um número válido'),
    description: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    categoryId: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    bankAccountId: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    date: z.date({ required_error: 'Tipo de conta inválido' }),
  });

type FormValues = z.infer<ReturnType<typeof createSchema>>;

export function useNewTransactionModalController() {
  const { isNewTransactionModalVisible, newTransactionType, onCloseNewTransactionModal } =
    useDashboard();

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit: handleFormSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(createSchema()),
  });

  const handleCloseModal = useCallback(() => {
    onCloseNewTransactionModal();
    reset({});
  }, [reset, onCloseNewTransactionModal]);

  const { mutate, isPending } = useCreateTransaction({
    onSuccess: handleCloseModal,
  });

  const handleSubmit = handleFormSubmit((formValues) => {
    mutate({
      description: formValues.description,
      type: newTransactionType!,
      bankAccountId: formValues.bankAccountId,
      categoryId: formValues.categoryId,
      date: formValues.date.toISOString(),
      value: formValues.value,
    });
  });

  const { accounts, isFetching: isLoadingAccounts } = useBankAccounts();
  const { categories, isFetching: isLoadingCategories } = useCategories();

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.type === newTransactionType),
    [categories, newTransactionType],
  );

  return {
    isNewTransactionModalVisible,
    newTransactionType,
    onCloseNewTransactionModal,
    handleSubmit,
    register,
    control,
    errors,
    isValid,
    isCreating: isPending,
    accounts,
    filteredCategories,
    isLoadingAccounts,
    isLoadingCategories,
  };
}
