import { ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '../../../../../app/utils/class-names';
import { DropdownMenu } from '../../../../components/dropdown-menu';
import { ExpensesIcon } from '../../../../components/icons/expenses';
import { IncomeIcon } from '../../../../components/icons/income';
import { TransactionsIcon } from '../../../../components/icons/transactions';

type Props = {
  disabled?: boolean;
};

export function TransactionTypeDropdown(props: Props) {
  const { disabled } = props;

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <button
          disabled={disabled}
          className={cn(
            'enabled:cursor-pointer flex items-center gap-2 text-gray-900',
            'disabled:opacity-40',
          )}
        >
          <TransactionsIcon />

          <span className="text-gray-800 tracking-[-0.5px] font-medium">Transações</span>

          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[270px] mt-2" align="start">
        <DropdownMenu.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
