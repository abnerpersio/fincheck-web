import { endpoints } from '../../infra/api';
import { BankAccountType } from '../types/bank-account';
import { HttpService } from './http-service';

export type ListBankAccountsResult = {
  id: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  type: BankAccountType;
  color: string;
}[];

export type CreateBankAccountPayload = {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};

export class BankAccountsService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  list() {
    return this.httpService.get<ListBankAccountsResult>(endpoints.bankAccount.list);
  }

  create(payload: CreateBankAccountPayload) {
    return this.httpService.post(endpoints.bankAccount.create, payload);
  }
}
