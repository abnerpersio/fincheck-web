import { Controller } from 'react-hook-form';
import { BankAccountTypes } from '../../../../../app/entities/bank-account';
import { Button } from '../../../../components/button';
import { ColorsInput } from '../../../../components/colors-input';
import { ConfirmDeleteModal } from '../../../../components/confirm-delete-modal';
import { CurrencyInput } from '../../../../components/currency-input';
import { TrashIcon } from '../../../../components/icons/trash';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { Select } from '../../../../components/select';
import { useEditAccountModalController } from './hooks/use-edit-account-modal-controller';

export function EditAccountModal() {
  const {
    isEditAccountModalVisible,
    isDeleteModalVisible,
    accountBeingEdited,
    onOpenDeleteModal,
    onCloseEditAccountModal,
    onConfirmDelete,
    errors,
    handleSubmit,
    isUpdating,
    isDeleting,
    isValid,
    register,
    control,
  } = useEditAccountModalController();

  if (!accountBeingEdited) {
    return null;
  }

  if (isDeleteModalVisible) {
    return (
      <ConfirmDeleteModal
        visible
        isLoading={isDeleting}
        onConfirm={onConfirmDelete}
        onClose={onCloseEditAccountModal}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      visible={isEditAccountModalVisible}
      onClose={onCloseEditAccountModal}
      disabledClose={isUpdating || isDeleting}
      rightAction={
        <button className="text-red-900" onClick={onOpenDeleteModal} disabled={isUpdating}>
          <TrashIcon className="w-6 h-6" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="initialBalance"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              label="Saldo inicial"
              value={value}
              onChange={onChange}
              error={errors.initialBalance?.message}
            />
          )}
        />

        <div className="flex flex-col gap-4 mt-10">
          <Input
            type="text"
            label="Nome da conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue={BankAccountTypes.CHECKING}
            render={({ field: { value, onChange } }) => (
              <Select
                label="Tipo"
                value={value}
                onChange={onChange}
                options={[
                  {
                    value: BankAccountTypes.CHECKING,
                    label: 'Conta Corrente',
                  },
                  {
                    value: BankAccountTypes.INVESTMENT,
                    label: 'Investimentos',
                  },
                  {
                    value: BankAccountTypes.CASH,
                    label: 'Dinheiro Físico',
                  },
                ]}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            render={({ field: { value, onChange } }) => (
              <ColorsInput
                label="Cor"
                value={value}
                onChange={onChange}
                error={errors.color?.message}
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
