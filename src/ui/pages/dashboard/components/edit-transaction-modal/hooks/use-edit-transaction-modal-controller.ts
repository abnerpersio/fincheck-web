import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Transaction } from '../../../../../../app/entities/transaction';
import { useBankAccounts } from '../../../../../../app/hooks/use-bank-accounts';
import { useCategories } from '../../../../../../app/hooks/use-categories';
import { useDeleteTransaction } from '../../../../../../app/hooks/use-delete-transaction';
import { useUpdateTransaction } from '../../../../../../app/hooks/use-update-transaction';
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

const transformInitialValues = (
  transactionBeingEdited: Transaction | null,
): Partial<FormValues> => ({
  value: transactionBeingEdited?.value,
  description: transactionBeingEdited?.description,
  categoryId: transactionBeingEdited?.categoryId,
  bankAccountId: transactionBeingEdited?.bankAccountId,
  date: transactionBeingEdited?.date ? new Date(transactionBeingEdited?.date) : undefined,
});

export function useEditTransactionModalController() {
  const { isEditTransactionModalVisible, transactionBeingEdited, onCloseEditTransactionModal } =
    useDashboard();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { accounts, isFetching: isLoadingAccounts } = useBankAccounts();
  const { categories, isFetching: isLoadingCategories } = useCategories();

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit: handleFormSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(createSchema()),
    defaultValues: transformInitialValues(transactionBeingEdited),
  });

  const handleCloseModal = useCallback(() => {
    onCloseEditTransactionModal();
    reset({});
  }, [reset, onCloseEditTransactionModal]);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateTransaction({
    onSuccess: handleCloseModal,
  });

  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteTransaction({
    onSuccess: () => {
      handleCloseModal();
      handleCloseDeleteModal();
    },
  });

  const handleSubmit = handleFormSubmit((formValues) => {
    mutateUpdate({
      transactionId: transactionBeingEdited!.id,
      payload: {
        description: formValues.description,
        type: transactionBeingEdited!.type,
        bankAccountId: formValues.bankAccountId,
        categoryId: formValues.categoryId,
        date: formValues.date.toISOString(),
        value: formValues.value,
      },
    });
  });

  const handleConfirmDelete = () => {
    mutateDelete(transactionBeingEdited!.id);
  };

  const filteredCategories = useMemo(() => {
    if (!transactionBeingEdited?.type) {
      return [];
    }

    return categories.filter((category) => category.type === transactionBeingEdited.type);
  }, [categories, transactionBeingEdited?.type]);

  useEffect(() => {
    if (transactionBeingEdited) {
      reset(transformInitialValues(transactionBeingEdited));
    }
  }, [reset, transactionBeingEdited]);

  return {
    isEditTransactionModalVisible,
    transactionBeingEdited,
    onCloseEditTransactionModal,
    isDeleteModalVisible,
    onOpenDeleteModal: handleOpenDeleteModal,
    onCloseDeleteModal: handleCloseDeleteModal,
    onConfirmDelete: handleConfirmDelete,
    handleSubmit,
    register,
    control,
    errors,
    isValid,
    isUpdating: isPendingUpdate,
    isDeleting: isPendingDelete,
    accounts,
    filteredCategories,
    isLoadingAccounts,
    isLoadingCategories,
  };
}
