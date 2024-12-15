import { BankAccountTypes } from '../../../../../app/types/bank-account';
import { TransactionTypes } from '../../../../../app/types/transaction';
import { Button } from '../../../../components/button';
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
      <form>
        <CurrencyInput label={`Valor ${isExpense ? 'da despesa' : 'da receita'}`} />

        <div className="flex flex-col gap-4 mt-10">
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

        <Button type="submit" className="mt-6">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
