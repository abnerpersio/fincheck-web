import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cn } from '../../../../../app/utils/class-names';
import { Button } from '../../../../components/button';
import { Modal } from '../../../../components/modal';
import { useFiltersModal } from './hooks/use-filters-modal';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const banks = [
  {
    id: 'uuid-1',
    name: 'Nubank',
  },
  {
    id: 'uuid-3',
    name: 'XP Investimentos',
  },
  {
    id: 'uuid-2',
    name: 'Banco Inter',
  },
];

export function FiltersModal(props: Props) {
  const { visible, onClose } = props;

  const { selectedBankAccountId, handleToggleBankAccount, selectedYear, handleChangeYear } =
    useFiltersModal();

  return (
    <Modal visible={visible} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">Conta</span>

        <div className="space-y-2 mt-2">
          {banks.map((bankAccount) => (
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

      <Button className="w-full mt-10">Aplicar filtros</Button>
    </Modal>
  );
}
