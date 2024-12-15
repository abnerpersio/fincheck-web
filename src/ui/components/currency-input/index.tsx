import { NumericFormat } from 'react-number-format';
import { cn } from '../../../app/utils/class-names';

export function CurrencyInput() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0,00"
      className={cn('w-full text-gray-800 text-[32px] font-bold tracking-[-1px]')}
    />
  );
}
