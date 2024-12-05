import { ComponentProps } from 'react';
import { classNames } from '../../../shared/utils/class-names';

type Props = Omit<ComponentProps<'input'>, 'placeholder'> & {
  label: string;
  name: string;
};

export function Input(props: Props) {
  const { label, name, id, className, ...restProps } = props;
  const inputId = id ?? name;

  return (
    <div className={classNames('relative', className)}>
      <input
        {...restProps}
        id={inputId}
        name={name}
        placeholder=" "
        className={classNames(
          'bg-white text-gray-800 rounded-lg border border-gray-500',
          'px-3 pt-4 h-[52px] w-full',
          'peer placeholder-shown:pt-0',
          'focus:border-gray-800 transition-all',
        )}
      />

      <label
        htmlFor={inputId}
        className={classNames(
          'transition-all absolute left-[13px] pointer-events-none',
          'text-gray-700',
          'text-xs top-2',
          'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
        )}
      >
        {label}
      </label>
    </div>
  );
}
