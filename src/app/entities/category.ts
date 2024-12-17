import { TransactionType } from './transaction';

export type Category = {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
};
