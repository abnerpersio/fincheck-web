import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/constants/constants';
import { useTransactionsFiltersSlider } from './hooks/use-transactions-filters-slider';
import { SliderNavigation } from './slider-navigation';
import { SliderOption } from './slider-option';

export function TransactionsFilters() {
  const { isBeginning, isEnd, onSwipe } = useTransactionsFiltersSlider();

  return (
    <div className="relative">
      <Swiper slidesPerView={3} centeredSlides onSlideChange={onSwipe}>
        <SliderNavigation isBeginning={isBeginning} isEnd={isEnd} />

        {MONTHS.map((month, index) => (
          <SwiperSlide key={month}>
            {({ isActive }) => <SliderOption isActive={isActive} month={month} index={index} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
