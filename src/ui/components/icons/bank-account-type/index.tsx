import { CashIcon } from './cash';
import { CheckingIcon } from './checking';
import { InvestmentIcon } from './investment';

const iconsMap = {
  CHECKING: CheckingIcon,
  INVESTMENT: InvestmentIcon,
  CASH: CashIcon,
};

type Props = {
  type: keyof typeof iconsMap;
};

export function BankAccountTypeIcon(props: Props) {
  const Icon = iconsMap[props.type];

  return <Icon />;
}
