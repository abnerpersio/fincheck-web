import { useState } from 'react';
import { SwiperClass } from 'swiper/react';

export function useAccountsSlider() {
  const [swiperState, setSwiperState] = useState<{ isBeginning: boolean; isEnd: boolean } | null>(
    null,
  );

  const handleSwipe = (swiper: SwiperClass) => {
    setSwiperState({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  };

  return {
    isBeginning: swiperState?.isBeginning || false,
    isEnd: swiperState?.isEnd || false,
    onSwipe: handleSwipe,
  };
}
