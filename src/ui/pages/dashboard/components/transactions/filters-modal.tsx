import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { TransactionsFilters } from '../../../../../app/services/transactions';
import { cn } from '../../../../../app/utils/class-names';
import { Button } from '../../../../components/button';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { Modal } from '../../../../components/modal';
import { useFiltersModalController } from './hooks/use-filters-modal-controller';

type Props = {
  visible: boolean;
  onClose: () => void;
  defaultValues: TransactionsFilters;
  onApplyFilters: (filters: Partial<TransactionsFilters>) => void;
};

export function FiltersModal(props: Props) {
  const { defaultValues, onApplyFilters, visible, onClose } = props;

  const {
    accounts,
    isLoadingAccounts,
    selectedBankAccountId,
    handleToggleBankAccount,
    selectedYear,
    handleChangeYear,
  } = useFiltersModalController({ defaultValues });

  const handleApplyFilters = () => {
    onApplyFilters?.({
      bankAccountId: selectedBankAccountId || undefined,
      year: selectedYear,
    });
    onClose();
  };

  return (
    <Modal visible={visible} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">Conta</span>

        <div className="space-y-2 mt-2">
          {isLoadingAccounts && <LoadingSpinner className="w-6 h-6" />}

          {!isLoadingAccounts &&
            accounts.map((bankAccount) => (
              <button
                key={bankAccount.id}
                onClick={() => handleToggleBankAccount(bankAccount.id)}
                className={cn(
                  'p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors text-gray-800',
                  bankAccount.id === selectedBankAccountId && '!bg-gray-200',
                )}
              >
                {bankAccount.name}
              </button>
            ))}
        </div>
      </div>

      <div className="mt-10">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">Ano</span>

        <div className="mt-2 w-full max-w-52 flex items-center justify-between gap-1">
          <button
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center text-gray-800"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <span className="flex-1 text-center text-sm font-medium tracking-[-0.5px]">
            {selectedYear}
          </span>

          <button
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center text-gray-800"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10" type="button" onClick={handleApplyFilters}>
        Aplicar filtros
      </Button>
    </Modal>
  );
}
