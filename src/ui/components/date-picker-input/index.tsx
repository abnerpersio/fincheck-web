import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useMemo } from 'react';
import { cn } from '../../../app/utils/class-names';
import { formatDate } from '../../../app/utils/date';
import { DatePicker } from '../date-picker';
import { Popover } from '../popover';

type Props = {
  className?: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: string;
  label?: string;
};

export function DatePickerInput(props: Props) {
  const { className, error, label, value, onChange } = props;

  const selectedDate = useMemo(() => value ?? new Date(), [value]);

  return (
    <div className="w-full">
      <Popover>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'bg-white text-gray-700 rounded-lg border border-gray-500',
              'px-3 pt-4 h-[52px] w-full',
              'focus:border-gray-800 transition-all',
              'text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <span
              className={cn(
                'text-gray-700 text-xs',
                'absolute left-[13px] top-2 pointer-events-none',
              )}
            >
              {label}
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={(date) => onChange(date)} />
        </Popover.Content>
      </Popover>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
