export enum BankAccountTypes {
  CASH = 'CASH',
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
}

export type BankAccountType = keyof typeof BankAccountTypes;

export type BankAccount = {
  id: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  type: BankAccountType;
  color: string;
};
