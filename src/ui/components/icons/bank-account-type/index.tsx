import { BankAccountType } from '../../../../app/entities/bank-account';
import { CashIcon } from './cash';
import { CheckingIcon } from './checking';
import { InvestmentIcon } from './investment';

const iconsMap: Record<BankAccountType, () => JSX.Element> = {
  CHECKING: CheckingIcon,
  INVESTMENT: InvestmentIcon,
  CASH: CashIcon,
};

type Props = {
  type: BankAccountType;
};

export function BankAccountTypeIcon(props: Props) {
  const Icon = iconsMap[props.type] ?? iconsMap.CHECKING;

  return <Icon />;
}
