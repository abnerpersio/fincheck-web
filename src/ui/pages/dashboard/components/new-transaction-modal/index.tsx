import { BankAccountTypes } from '../../../../../app/types/bank-account';
import { TransactionTypes } from '../../../../../app/types/transaction';
import { CurrencyInput } from '../../../../components/currency-input';
import { DatePickerInput } from '../../../../components/date-picker-input';
import { Input } from '../../../../components/input';
import { Modal } from '../../../../components/modal';
import { Select } from '../../../../components/select';
import { useNewTransactionModalController } from './hooks/use-new-transaction-modal-controller';

export function NewTransactionModal() {
  const { isNewTransactionModalVisible, newTransactionType, onCloseNewTransactionModal } =
    useNewTransactionModalController();

  const isExpense = newTransactionType === TransactionTypes.EXPENSE;

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      visible={isNewTransactionModalVisible}
      onClose={onCloseNewTransactionModal}
    >
      <form className="space-y-10">
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <CurrencyInput />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            label={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />

          <Select
            label="Categoria"
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

          <Select
            label={isExpense ? 'Pagar com' : 'Receber com'}
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

          <DatePickerInput label="Data" />
        </div>
      </form>
    </Modal>
  );
}
