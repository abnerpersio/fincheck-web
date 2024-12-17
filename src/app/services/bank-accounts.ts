import { endpoints } from '../../infra/api';
import { BankAccount, BankAccountType } from '../entities/bank-account';
import { HttpService } from './http-service';

export type ListBankAccountsResult = BankAccount[];

export type CreateBankAccountPayload = {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};

export type UpdateBankAccountPayload = CreateBankAccountPayload & {};

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

  update(accountId: string, payload: UpdateBankAccountPayload) {
    const url = endpoints.bankAccount.update.replace(':id', accountId);
    return this.httpService.put(url, payload);
  }
}
