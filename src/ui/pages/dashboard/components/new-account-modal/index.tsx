import { Controller } from 'react-hook-form';
import { BankAccountTypes } from '../../../../../app/entities/bank-account';
import { Button } from '../../../../components/button';
import { ColorsInput } from '../../../../components/colors-input';
import { CurrencyInput } from '../../../../components/currency-input';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { Select } from '../../../../components/select';
import { useNewAccountModalController } from './hooks/use-new-account-modal-controller';

export function NewAccountModal() {
  const {
    isNewAccountModalVisible,
    onCloseNewAccountModal,
    errors,
    handleSubmit,
    isCreating,
    isValid,
    register,
    control,
  } = useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      visible={isNewAccountModalVisible}
      onClose={onCloseNewAccountModal}
      disabledClose={isCreating}
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

        <Button type="submit" className="mt-6" disabled={!isValid} isLoading={isCreating}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
