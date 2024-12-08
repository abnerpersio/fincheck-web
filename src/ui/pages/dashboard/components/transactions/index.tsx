import { ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '../../../../../app/utils/class-names';
import { formatCurrency } from '../../../../../app/utils/currency';
import { CategoryIcon } from '../../../../components/icons/categories/category';
import { FilterIcon } from '../../../../components/icons/filter';
import { TransactionsIcon } from '../../../../components/icons/transactions';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { useDashboard } from '../../hooks/use-dashboard';
import { useTransactionsController } from './hooks/use-transactions-controller';
import { TransactionsFilters } from './transactions-filters';

export function Transactions() {
  const { isCurrencyVisible } = useDashboard();
  const { isLoading } = useTransactionsController();

  return (
    <div className={cn('bg-gray-100 rounded-2xl w-full h-full flex flex-col', 'px-4 py-8 md:p-10')}>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner className="w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <header className="w-full">
            <div className="w-full flex items-center justify-between gap-4">
              <button className="flex items-center gap-2 text-gray-900">
                <TransactionsIcon />

                <span className="text-gray-800 tracking-[-0.5px] font-medium">Transações</span>

                <ChevronDownIcon />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6">
              <TransactionsFilters />
            </div>
          </header>

          <div className="flex-1 mt-4 space-y-2 overflow-y-auto">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex-1 flex items-center gap-3">
                  <CategoryIcon type="EXPENSE" />

                  <div>
                    <strong className="block font-bold tracking-[-0.5px]">Almoço</strong>
                    <span className="text-sm text-gray-600">07/09/2023</span>
                  </div>
                </div>

                <span
                  className={cn(
                    'tracking-[-0.5px] font-medium',
                    'text-red-800',
                    !isCurrencyVisible && 'blur-sm',
                  )}
                >
                  - {formatCurrency(100.99)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
