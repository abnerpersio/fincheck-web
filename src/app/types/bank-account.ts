export enum BankAccountTypes {
  CASH = 'CASH',
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
}

export type BankAccountType = keyof typeof BankAccountTypes;
