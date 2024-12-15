import { BankAccountTypes } from '../../../../../app/types/bank-account';
import { ColorsInput } from '../../../../components/colors-input';
import { CurrencyInput } from '../../../../components/currency-input';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { Select } from '../../../../components/select';
import { useNewAccountModalController } from './hooks/use-new-account-modal-controller';

export function NewAccountModal() {
  const { isNewAccountModalVisible, onCloseNewAccountModal } = useNewAccountModalController();

  return (
    <Modal title="Nova Conta" visible={isNewAccountModalVisible} onClose={onCloseNewAccountModal}>
      <form className="space-y-10">
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <CurrencyInput />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input type="text" name="name" label="Nome da conta" />

          <Select
            label="Tipo"
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
          />

          <ColorsInput label="Cor" />
        </div>
      </form>
    </Modal>
  );
}
