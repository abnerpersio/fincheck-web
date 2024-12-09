import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/constants/constants';
import { cn } from '../../../../../app/utils/class-names';
import { formatCurrency } from '../../../../../app/utils/currency';
import { formatDate } from '../../../../../app/utils/date';
import { CategoryIcon } from '../../../../components/icons/categories/category';
import { EmptyStateIllustration } from '../../../../components/icons/empty-state';
import { FilterIcon } from '../../../../components/icons/filter';
import { TransactionsIcon } from '../../../../components/icons/transactions';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { useDashboard } from '../../hooks/use-dashboard';
import { useTransactionsController } from './hooks/use-transactions-controller';
import { useTransactionsFiltersSlider } from './hooks/use-transactions-filters-slider';
import { SliderNavigation } from './slider-navigation';
import { SliderOption } from './slider-option';

export function Transactions() {
  const { isCurrencyVisible } = useDashboard();
  const { transactions, isLoading } = useTransactionsController();
  const { isBeginning, isEnd, onSwipe } = useTransactionsFiltersSlider();

  const hasTransactions = !!transactions.length;

  return (
    <div className={cn('bg-gray-100 rounded-2xl w-full h-full flex flex-col', 'px-4 py-8 md:p-10')}>
      <header className="w-full">
        <div className="w-full flex items-center justify-between gap-4">
          <button
            disabled={isLoading}
            className={cn(
              'enabled:cursor-pointer flex items-center gap-2 text-gray-900',
              'disabled:opacity-40',
            )}
          >
            <TransactionsIcon />

            <span className="text-gray-800 tracking-[-0.5px] font-medium">Transações</span>

            <ChevronDownIcon />
          </button>

          <button disabled={isLoading} className="disabled:opacity-40 enabled:cursor-pointer">
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <Swiper slidesPerView={3} centeredSlides onSlideChange={onSwipe} enabled={!isLoading}>
              <SliderNavigation isBeginning={isBeginning} isEnd={isEnd} disabled={isLoading} />

              {MONTHS.map((month, index) => (
                <SwiperSlide key={month}>
                  {({ isActive }) => (
                    <SliderOption
                      isActive={isActive}
                      month={month}
                      index={index}
                      disabled={isLoading}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner className="w-10 h-10" />
        </div>
      )}

      {!isLoading && !hasTransactions && (
        <div className="flex-1 mt-4 flex flex-col items-center justify-center gap-4">
          <EmptyStateIllustration />

          <span>Não encontramos nenhuma transação!</span>
        </div>
      )}

      {!isLoading && hasTransactions && (
        <div className="flex-1 mt-4 space-y-2 overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex-1 flex items-center gap-3">
                <CategoryIcon type={transaction.type} />

                <div>
                  <strong className="block font-bold tracking-[-0.5px]">
                    {transaction.description}
                  </strong>
                  <span className="text-sm text-gray-600">{formatDate(transaction.date)}</span>
                </div>
              </div>

              <span
                className={cn(
                  'tracking-[-0.5px] font-medium',
                  'text-red-800',
                  !isCurrencyVisible && 'blur-sm',
                )}
              >
                {formatCurrency(transaction.value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
