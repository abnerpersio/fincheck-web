import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '../../../app/utils/class-names';

type Props = Omit<ComponentProps<'input'>, 'placeholder'> & {
  label: string;
  name: string;
  error?: string | null;
};

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, name, id, className, error, ...restProps } = props;

  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...restProps}
        ref={ref}
        id={inputId}
        name={name}
        placeholder=" "
        className={cn(
          'bg-white text-gray-800 rounded-lg border border-gray-500',
          'px-3 pt-4 h-[52px] w-full',
          'peer placeholder-shown:pt-0',
          'focus:border-gray-800 transition-all',
          error && '!border-red-900',
          className,
        )}
      />

      <label
        htmlFor={inputId}
        className={cn(
          'transition-all absolute left-[13px] pointer-events-none',
          'text-gray-700',
          'text-xs top-2',
          'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
        )}
      >
        {label}
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
});
