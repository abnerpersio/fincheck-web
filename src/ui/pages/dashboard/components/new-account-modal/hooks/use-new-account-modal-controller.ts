import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BankAccountTypes } from '../../../../../../app/entities/bank-account';
import { useCreateBankAccount } from '../../../../../../app/hooks/use-create-bank-account';
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

export function useNewAccountModalController() {
  const { isNewAccountModalVisible, onCloseNewAccountModal } = useDashboard();

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
    onCloseNewAccountModal();
    reset();
  }, [reset, onCloseNewAccountModal]);

  const { mutate, isPending } = useCreateBankAccount({
    onSuccess: handleCloseModal,
  });

  const handleSubmit = handleFormSubmit((formValues) => {
    mutate({
      initialBalance: currencyToNumber(formValues.initialBalance),
      name: formValues.name,
      type: formValues.type,
      color: formValues.color,
    });
  });

  return {
    isNewAccountModalVisible,
    onCloseNewAccountModal: handleCloseModal,
    handleSubmit,
    register,
    control,
    errors,
    isValid,
    isLoading: isPending,
  };
}
