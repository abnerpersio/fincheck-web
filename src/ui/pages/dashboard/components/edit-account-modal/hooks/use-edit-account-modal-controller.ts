import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BankAccount, BankAccountTypes } from '../../../../../../app/entities/bank-account';
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

const transformInitialValues = (acountBeingEdited: BankAccount | null): Partial<FormValues> => ({
  color: acountBeingEdited?.color,
  type: acountBeingEdited?.type as BankAccountTypes,
  initialBalance: acountBeingEdited?.initialBalance,
  name: acountBeingEdited?.name,
});

export function useEditAccountModalController() {
  const { isEditAccountModalVisible, acountBeingEdited, onCloseEditAccountModal } = useDashboard();

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit: handleFormSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(createSchema()),
    defaultValues: transformInitialValues(acountBeingEdited),
  });

  const handleCloseModal = useCallback(() => {
    onCloseEditAccountModal();
    reset();
  }, [reset, onCloseEditAccountModal]);

  const { mutate, isPending } = useUpdateBankAccount({
    onSuccess: handleCloseModal,
  });

  const handleSubmit = handleFormSubmit((formValues) => {
    mutate({
      accountId: acountBeingEdited!.id,
      payload: {
        initialBalance: currencyToNumber(formValues.initialBalance),
        name: formValues.name,
        type: formValues.type,
        color: formValues.color,
      },
    });
  });

  useEffect(() => {
    if (acountBeingEdited) {
      reset(transformInitialValues(acountBeingEdited));
    }
  }, [reset, acountBeingEdited]);

  return {
    isEditAccountModalVisible,
    acountBeingEdited,
    onCloseEditAccountModal: handleCloseModal,
    handleSubmit,
    register,
    control,
    errors,
    isValid,
    isLoading: isPending,
  };
}
