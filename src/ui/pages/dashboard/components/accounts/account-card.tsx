import { BankAccountType } from '../../../../../app/types/bank-account';
import { cn } from '../../../../../app/utils/class-names';
import { formatCurrency } from '../../../../../app/utils/currency';
import { BankAccountTypeIcon } from '../../../../components/icons/bank-account-type';
import { useDashboard } from '../../hooks/use-dashboard';

type Props = {
  color: string;
  name: string;
  balance: number;
  type: BankAccountType;
};

export function AccountCard(props: Props) {
  const { color, name, balance, type } = props;
  const { isCurrencyVisible } = useDashboard();

  return (
    <div
      className={cn(
        'h-[200px] p-4 bg-white rounded-2xl',
        'flex flex-col justify-between border-b-4 border-teal-950',
      )}
      style={{ borderColor: color }}
    >
      <div className="flex flex-col gap-4">
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px]">{name}</span>
      </div>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] block',
            !isCurrencyVisible && 'blur-sm',
          )}
        >
          {formatCurrency(balance)}
        </span>

        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
