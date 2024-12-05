import { ComponentProps } from 'react';
import { cn } from '../../../app/utils/class-names';
import { LoadingSpinner } from '../loading-spinner';

type Props = ComponentProps<'button'> & {
  isLoading?: boolean;
};

export function Button(props: Props) {
  const { children, className, disabled, isLoading, ...restProps } = props;

  return (
    <button
      {...restProps}
      disabled={disabled || isLoading}
      className={cn(
        'w-full flex justify-center items-center px-6 h-12 rounded-2xl transition-all',
        'bg-teal-900 text-white font-medium',
        'hover:bg-teal-800 active:bg-teal-900',
        'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        className,
      )}
    >
      {isLoading && <LoadingSpinner className="w-6 h-6" />}

      {!isLoading && children}
    </button>
  );
}
