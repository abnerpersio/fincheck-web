import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../app/utils/class-names';

type Props = {
  isBeginning: boolean;
  isEnd: boolean;
  disabled?: boolean;
};

export function SliderNavigation(props: Props) {
  const { isBeginning, isEnd, disabled } = props;

  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        className={cn(
          'w-12 h-12 absolute left-0 top-1/2 -translate-y-1/2',
          'text-gray-800',
          'enabled:bg-gradient-to-r from-gray-100 to-transparent transition-colors disabled:opacity-40',
          'flex items-center justify-center z-10',
        )}
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning || disabled}
      >
        <ChevronLeftIcon className="w-6 h-6 " />
      </button>

      <button
        type="button"
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2',
          'w-12 h-12',
          'enabled:bg-gradient-to-l from-gray-100 to-transparent transition-colors disabled:opacity-40',
          'flex items-center justify-center z-10',
        )}
        onClick={() => swiper.slideNext()}
        disabled={isEnd || disabled}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </>
  );
}
