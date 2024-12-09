import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../app/utils/class-names';

type Props = {
  isActive: boolean;
  disabled?: boolean;
  month: string;
  index: number;
};

export function SliderOption(props: Props) {
  const { isActive, month, index, disabled } = props;

  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slideTo(index)}
      disabled={disabled}
      className={cn(
        'w-full rounded-full h-12 enabled:cursor-pointer',
        'text-gray-800 tracking-[-0.5px] font-medium',
        'disabled:opacity-40',
        isActive && 'bg-white',
      )}
    >
      {month}
    </button>
  );
}
