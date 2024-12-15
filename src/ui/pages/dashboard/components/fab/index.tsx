import { PlusIcon } from '@radix-ui/react-icons';
import { TransactionTypes } from '../../../../../app/types/transaction';
import { cn } from '../../../../../app/utils/class-names';
import { DropdownMenu } from '../../../../components/dropdown-menu';
import { BankAccountIcon } from '../../../../components/icons/bank-account';
import { CategoryIcon } from '../../../../components/icons/categories/category';
import { useDashboard } from '../../hooks/use-dashboard';

export function Fab() {
  const { onOpenNewAccountModal, onOpenNewTransactionModal } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              'bg-teal-900 text-white w-12 h-12 rounded-full',
              'flex items-center justify-center',
            )}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="top" align="end" className="mb-2">
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => onOpenNewTransactionModal(TransactionTypes.EXPENSE)}
          >
            <CategoryIcon type="EXPENSE" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => onOpenNewTransactionModal(TransactionTypes.INCOME)}
          >
            <CategoryIcon type="INCOME" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={onOpenNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
