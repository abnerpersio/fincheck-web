import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '../../../../../app/constants/constants';
import { TransactionTypes } from '../../../../../app/entities/transaction';
import { cn } from '../../../../../app/utils/class-names';
import { formatCurrency } from '../../../../../app/utils/currency';
import { formatDate } from '../../../../../app/utils/date';
import { CategoryIcon } from '../../../../components/icons/categories/category';
import { EmptyStateIllustration } from '../../../../components/icons/empty-state';
import { FilterIcon } from '../../../../components/icons/filter';
import { LoadingSpinner } from '../../../../components/loading-spinner';
import { useDashboard } from '../../hooks/use-dashboard';
import { FiltersModal } from './filters-modal';
import { useTransactionsController } from './hooks/use-transactions-controller';
import { useTransactionsFiltersSlider } from './hooks/use-transactions-filters-slider';
import { SliderNavigation } from './slider-navigation';
import { SliderOption } from './slider-option';
import { TransactionTypeDropdown } from './transaction-type-dropdown';

export function Transactions() {
  const { isCurrencyVisible, onOpenEditTransactionModal } = useDashboard();
  const { isBeginning, isEnd, onSwipe } = useTransactionsFiltersSlider();

  const {
    isFiltersModalVisible,
    onOpenFiltersModal,
    onCloseFiltersModal,
    transactions,
    isLoading,
    onChangeMonth,
    onApplyFilters,
    filters,
  } = useTransactionsController();

  const hasTransactions = !!transactions.length;

  return (
    <div className={cn('bg-gray-100 rounded-2xl w-full h-full flex flex-col', 'px-4 py-8 md:p-10')}>
      <FiltersModal
        defaultValues={filters}
        onApplyFilters={onApplyFilters}
        visible={isFiltersModalVisible}
        onClose={onCloseFiltersModal}
      />

      <header className="w-full">
        <div className="w-full flex items-center justify-between gap-4">
          <TransactionTypeDropdown
            disabled={isLoading}
            selected={filters.type}
            onSelect={(type) => onApplyFilters({ type })}
          />

          <button
            type="button"
            onClick={onOpenFiltersModal}
            disabled={isLoading}
            className="disabled:opacity-40 enabled:cursor-pointer"
          >
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <Swiper
              slidesPerView={3}
              centeredSlides
              initialSlide={filters.month}
              onSlideChange={(swiper) => {
                onSwipe(swiper);

                if (swiper.realIndex !== filters.month) {
                  onChangeMonth(swiper.realIndex);
                }
              }}
            >
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
              role="button"
              onClick={() => onOpenEditTransactionModal(transaction)}
              key={transaction.id}
              className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex-1 flex items-center gap-3">
                <CategoryIcon type={transaction.type} category={transaction.category?.icon} />

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
                  transaction.type === TransactionTypes.EXPENSE ? 'text-red-800' : 'text-green-800',
                  !isCurrencyVisible && 'blur-sm',
                )}
              >
                {transaction.type === TransactionTypes.EXPENSE ? '-' : '+'}
                {formatCurrency(transaction.value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
