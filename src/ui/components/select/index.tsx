import { ChevronDownIcon, ChevronUpIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import * as RdxSelect from '@radix-ui/react-select';
import { forwardRef, useState } from 'react';
import { cn } from '../../../app/utils/class-names';

type Props = {
  className?: string;
  error?: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
};

export const Select = forwardRef<unknown, Props>((props, ref) => {
  const { options, className, label, error } = props;

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'absolute top-1/2 -translate-y-1/2 left-3',
            'z-10 transition-all pointer-events-none',
            'text-gray-700',
            selectedValue && 'text-xs left-[13px] top-2 translate-y-0',
          )}
        >
          {label}
        </label>

        <RdxSelect.Root onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'bg-white text-gray-800 rounded-lg border border-gray-500',
              'px-3 pt-4 h-[52px] w-full',
              'focus:border-gray-800 transition-all',
              'text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content
              className={cn(
                'z-[99] overflow-hidden bg-white',
                'rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]',
              )}
            >
              <RdxSelect.ScrollUpButton
                className={cn(
                  'flex h-[25px] cursor-default items-center justify-center',
                  'bg-white text-gray-800',
                )}
              >
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    className={cn(
                      'p-2 text-gray-800 text-sm',
                      'data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 rounded-lg',
                      'transition-colors',
                    )}
                    key={option.value}
                    value={option.value}
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton
                className={cn(
                  'flex h-[25px] cursor-default items-center justify-center',
                  'bg-white text-gray-800',
                )}
              >
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
});
