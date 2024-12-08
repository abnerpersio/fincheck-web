import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../app/utils/class-names';

type Props = {
  isBeginning: boolean;
  isEnd: boolean;
};

export function SliderNavigation(props: Props) {
  const { isBeginning, isEnd } = props;

  const swiper = useSwiper();

  return (
    <div className="text-white">
      <button
        type="button"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        className={cn(
          'py-3 pl-2.5 pr-3.5 rounded-full',
          'enabled:hover:bg-black/10 transition-colors disabled:opacity-40',
        )}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className={cn(
          'py-3 pl-2.5 pr-3.5 rounded-full',
          'enabled:hover:bg-black/10 transition-colors disabled:opacity-40',
        )}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
