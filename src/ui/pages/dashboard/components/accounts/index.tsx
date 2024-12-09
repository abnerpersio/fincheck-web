import { PlusIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useMediaQuery } from '../../../../../app/hooks/use-media-query';
import { cn } from '../../../../../app/utils/class-names';
import { formatCurrency } from '../../../../../app/utils/currency';
import { EyeIcon } from '../../../../components/icons/eye';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { useDashboard } from '../../hooks/use-dashboard';
import { AccountCard } from './account-card';
import { useAccountsController } from './hooks/use-accounts-controller';
import { useAccountsSlider } from './hooks/use-accounts-slider';
import { SliderNavigation } from './slider-navigation';

export function Accounts() {
  const { isBeginning, isEnd, onSwipe } = useAccountsSlider();
  const { isCurrencyVisible, onToggleCurrencyVisibility } = useDashboard();
  const { accounts, isLoading } = useAccountsController();

  const isMedium = useMediaQuery(500);
  const hasAccounts = !!accounts.length;

  return (
    <div className={cn('bg-teal-900 rounded-2xl w-full h-full flex flex-col', 'px-4 py-8 md:p-10')}>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="text-white">
            <span className="tracking-[-0.5px] block">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong className={cn('text-2xl tracking-[-1px]', !isCurrencyVisible && 'blur-md')}>
                {formatCurrency(100)}
              </strong>

              <button
                className="flex items-center justify-center w-8 h-8 cursor-pointer"
                type="button"
                onClick={onToggleCurrencyVisibility}
              >
                <EyeIcon open={!isCurrencyVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {!hasAccounts && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
                </div>

                <button
                  className={cn(
                    'mt-4 h-52 w-full border-2 border-dashed border-teal-600 rounded-2xl text-white',
                    'flex flex-col items-center justify-center gap-4',
                  )}
                >
                  <div
                    className={cn(
                      'w-11 h-11 rounded-full border-2 border-dashed border-white',
                      'flex items-center justify-center',
                    )}
                  >
                    <PlusIcon className="w-6 h-6" />
                  </div>

                  <span className="font-medium tracking-[-0.5px] block max-w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {hasAccounts && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={isMedium ? 2.15 : 1}
                  onSlideChange={onSwipe}
                >
                  <div slot="container-start" className="flex justify-between items-center mb-4">
                    <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

                    <SliderNavigation isBeginning={isBeginning} isEnd={isEnd} />
                  </div>

                  <SwiperSlide>
                    <AccountCard color="#7950F2" name="Nubank" balance={100.23} type="CHECKING" />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard color="#f89943" name="Inter" balance={2000.99} type="CHECKING" />
                  </SwiperSlide>

                  <SwiperSlide>
                    <AccountCard color="#000" name="XP" balance={10000.23} type="INVESTMENT" />
                  </SwiperSlide>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
