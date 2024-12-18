export type Transaction = {
  id: string;
  description: string;
  value: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  bankAccountId: string;
  category: {
    id: string;
    name: string;
    icon: string;
  } | null;
};

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type TransactionType = keyof typeof TransactionTypes;
