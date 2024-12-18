import { Controller } from 'react-hook-form';
import { TransactionTypes } from '../../../../../app/entities/transaction';
import { Button } from '../../../../components/button';
import { CurrencyInput } from '../../../../components/currency-input';
import { DatePickerInput } from '../../../../components/date-picker-input';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { Select } from '../../../../components/select';
import { useEditTransactionModalController } from './hooks/use-edit-transaction-modal-controller';

export function EditTransactionModal() {
  const {
    isEditTransactionModalVisible,
    onCloseEditTransactionModal,
    transactionBeingEdited,
    errors,
    handleSubmit,
    isUpdating,
    isDeleting,
    isValid,
    register,
    control,
    accounts,
    isLoadingAccounts,
    filteredCategories,
    isLoadingCategories,
  } = useEditTransactionModalController();

  if (!transactionBeingEdited) {
    return null;
  }

  const isExpense = transactionBeingEdited.type === TransactionTypes.EXPENSE;

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      visible={isEditTransactionModalVisible}
      onClose={onCloseEditTransactionModal}
      disabledClose={isUpdating || isDeleting}
    >
      <form onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="value"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              label={`Valor ${isExpense ? 'da despesa' : 'da receita'}`}
              value={value}
              onChange={onChange}
              error={errors.value?.message}
            />
          )}
        />

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            {...register('description')}
            label={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { value, onChange } }) => (
              <Select
                label="Categoria"
                value={value}
                onChange={onChange}
                isLoading={isLoadingCategories}
                error={errors.categoryId?.message}
                options={filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { value, onChange } }) => (
              <Select
                label={isExpense ? 'Pagar com' : 'Receber com'}
                value={value}
                onChange={onChange}
                isLoading={isLoadingAccounts}
                error={errors.bankAccountId?.message}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors?.date?.message}
                label="Data"
              />
            )}
          />
        </div>

        <Button type="submit" className="mt-6" disabled={!isValid} isLoading={isUpdating}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
