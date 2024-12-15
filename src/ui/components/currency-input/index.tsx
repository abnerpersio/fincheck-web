import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';
import { cn } from '../../../app/utils/class-names';

type Props = {
  error?: string;
  value?: number;
  label: string;
  onChange?: (value?: number) => void;
};

export function CurrencyInput(props: Props) {
  const { error, value, label, onChange } = props;

  return (
    <div>
      <span className="text-gray-600 tracking-[-0.5px] text-xs">{label}</span>

      <div className="flex items-center gap-2">
        <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          value={value}
          onValueChange={(value) => onChange?.(value.floatValue)}
          className={cn(
            'w-full text-gray-800 text-[32px] font-bold tracking-[-1px]',
            error && 'text-red-900',
          )}
        />
      </div>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
