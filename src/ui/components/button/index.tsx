import { ComponentProps } from 'react';
import { cn } from '../../../app/utils/class-names';
import { LoadingSpinner } from '../loading-spinner';

type Props = ComponentProps<'button'> & {
  isLoading?: boolean;
  variant?: 'default' | 'danger' | 'ghost';
};

export function Button(props: Props) {
  const { children, className, disabled, isLoading, variant = 'default', ...restProps } = props;

  return (
    <button
      {...restProps}
      disabled={disabled || isLoading}
      className={cn(
        'w-full flex justify-center items-center px-6 h-12 rounded-2xl transition-all',
        'text-white font-medium',
        variant === 'default' && 'bg-teal-900 hover:bg-teal-800 active:bg-teal-900',
        variant === 'danger' && 'bg-red-900 hover:bg-red-800 active:bg-red-900',
        variant === 'ghost' &&
          'border border-gray-800 bg-transparent text-gray-800 hover:bg-gray-800/5 active:bg-gray-800/5',
        'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        className,
      )}
    >
      {isLoading && <LoadingSpinner className="w-6 h-6" />}

      {!isLoading && children}
    </button>
  );
}
