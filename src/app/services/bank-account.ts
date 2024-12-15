import { endpoints } from '../../infra/api';
import { BankAccountType } from '../types/bank-account';
import { HttpService } from './http-service';

export type CreateBankAccountPayload = {
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};

export class BankAccountService extends HttpService {
  create(payload: CreateBankAccountPayload) {
    return this.post(endpoints.bankAccount.create, payload);
  }
}
