export type Transaction = {
  id: string;
  description: string;
  value: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  bankAccountId: string;
};

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type TransactionType = keyof typeof TransactionTypes;
