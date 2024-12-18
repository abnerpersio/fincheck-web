import { ChevronDownIcon } from '@radix-ui/react-icons';
import { TransactionType, TransactionTypes } from '../../../../../app/entities/transaction';
import { cn } from '../../../../../app/utils/class-names';
import { DropdownMenu } from '../../../../components/dropdown-menu';
import { ExpensesIcon } from '../../../../components/icons/expenses';
import { IncomeIcon } from '../../../../components/icons/income';
import { TransactionsIcon } from '../../../../components/icons/transactions';

type Props = {
  disabled?: boolean;
  selected?: TransactionType;
  onSelect: (type: TransactionType | undefined) => void;
};

const options = [
  {
    value: TransactionTypes.INCOME,
    label: 'Receitas',
    icon: <IncomeIcon />,
  },
  {
    value: TransactionTypes.EXPENSE,
    label: 'Despesas',
    icon: <ExpensesIcon />,
  },
  {
    value: undefined,
    label: 'Todas as Transações',
    icon: <TransactionsIcon />,
  },
];

export function TransactionTypeDropdown(props: Props) {
  const { disabled, selected, onSelect } = props;

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
          {options.find((option) => option.value === selected)?.icon ?? <TransactionsIcon />}

          <span className="text-gray-800 tracking-[-0.5px] font-medium">
            {options.find((option) => option.value === selected)?.label ?? 'Transações'}
          </span>

          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[270px] mt-2" align="start">
        {options.map((option) => (
          <DropdownMenu.Item
            key={option.value}
            className={cn('gap-2', selected === option.value && 'font-bold')}
            onSelect={selected !== option.value ? () => onSelect(option.value) : undefined}
          >
            {option.icon}
            {option.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
