import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../app/utils/class-names';

type Props = {
  isActive: boolean;
  month: string;
  index: number;
};

export function SliderOption(props: Props) {
  const { isActive, month, index } = props;

  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'w-full rounded-full h-12',
        'text-gray-800 tracking-[-0.5px] font-medium',
        'hover:',
        isActive && 'bg-white',
      )}
    >
      {month}
    </button>
  );
}
