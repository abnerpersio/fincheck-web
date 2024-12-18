import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BankAccount, BankAccountTypes } from '../../../../../../app/entities/bank-account';
import { useDeleteBankAccount } from '../../../../../../app/hooks/use-delete-bank-account';
import { useUpdateBankAccount } from '../../../../../../app/hooks/use-update-bank-account';
import { currencyToNumber } from '../../../../../../app/utils/currency';
import { useDashboard } from '../../../hooks/use-dashboard';

const createSchema = () =>
  z.object({
    initialBalance: z
      .number({ required_error: 'Campo obrigatório' })
      .min(0, 'Preencha um número válido'),
    name: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
    type: z.nativeEnum(BankAccountTypes, { message: 'Tipo de conta inválido' }),
    color: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  });

type FormValues = z.infer<ReturnType<typeof createSchema>>;

const transformInitialValues = (accountBeingEdited: BankAccount | null): Partial<FormValues> => ({
  color: accountBeingEdited?.color,
  type: accountBeingEdited?.type as BankAccountTypes,
  initialBalance: accountBeingEdited?.initialBalance,
  name: accountBeingEdited?.name,
});

export function useEditAccountModalController() {
  const { isEditAccountModalVisible, accountBeingEdited, onCloseEditAccountModal } = useDashboard();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit: handleFormSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(createSchema()),
    defaultValues: transformInitialValues(accountBeingEdited),
  });

  const handleOpenDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleCloseModal = useCallback(() => {
    onCloseEditAccountModal();
    reset({});
  }, [reset, onCloseEditAccountModal]);

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateBankAccount({
    onSuccess: handleCloseModal,
  });

  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteBankAccount({
    onSuccess: () => {
      handleCloseModal();
      handleCloseDeleteModal();
    },
  });

  const handleSubmit = handleFormSubmit((formValues) => {
    mutateUpdate({
      accountId: accountBeingEdited!.id,
      payload: {
        initialBalance: currencyToNumber(formValues.initialBalance),
        name: formValues.name,
        type: formValues.type,
        color: formValues.color,
      },
    });
  });

  const handleConfirmDelete = () => {
    mutateDelete(accountBeingEdited!.id);
  };

  useEffect(() => {
    if (accountBeingEdited) {
      reset(transformInitialValues(accountBeingEdited));
    }
  }, [reset, accountBeingEdited]);

  return {
    isEditAccountModalVisible,
    isDeleteModalVisible,
    accountBeingEdited,
    onCloseEditAccountModal: handleCloseModal,
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
  };
}
