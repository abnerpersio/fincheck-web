import { Transition } from '@headlessui/react';
import { cn } from '../../../app/utils/class-names';
import { Logo } from '../icons/logo';
import { LoadingSpinner } from '../loading-spinner';

type Props = {
  isLoading: boolean;
};

export function LaunchScreen(props: Props) {
  const { isLoading } = props;

  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          'fixed top-0 left-0 w-full h-full bg-teal-900 z-50',
          'grid place-items-center',
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-10 text-white" />

          <LoadingSpinner className="text-teal-900 fill-white" />
        </div>
      </div>
    </Transition>
  );
}
