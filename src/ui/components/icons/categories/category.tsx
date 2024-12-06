import { ClothesCategoryIcon } from './expense/clothes';
import { EducationCategoryIcon } from './expense/education';
import { ExpenseCategoryIcon } from './expense/expense';
import { FoodCategoryIcon } from './expense/food';
import { FunCategoryIcon } from './expense/fun';
import { GroceryCategoryIcon } from './expense/grocery';
import { HomeCategoryIcon } from './expense/home';
import { TransportCategoryIcon } from './expense/transport';
import { TravelCategoryIcon } from './expense/travel';
import { IncomeCategoryIcon } from './income/income';

const iconsMap = {
  income: {
    default: IncomeCategoryIcon,
  },
  expense: {
    default: ExpenseCategoryIcon,
    food: FoodCategoryIcon,
    fun: FunCategoryIcon,
    grocery: GroceryCategoryIcon,
    home: HomeCategoryIcon,
    education: EducationCategoryIcon,
    clothes: ClothesCategoryIcon,
    transport: TransportCategoryIcon,
    travel: TravelCategoryIcon,
  },
};

type Props = {
  type: 'income' | 'expense';
  category?: keyof (typeof iconsMap.expense & typeof iconsMap.income);
};

export function CategoryIcon(props: Props) {
  const { type, category } = props;

  const categoryName =
    (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ?? 'default';

  const Icon = iconsMap[type][categoryName] ?? iconsMap[type].default;

  return <Icon />;
}
