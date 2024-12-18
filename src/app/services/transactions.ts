import { endpoints } from '../../infra/api';
import { Transaction, TransactionType } from '../entities/transaction';
import { HttpService } from './http-service';

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
};

export type CreateTransactionPayload = {
  description: string;
  value: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  bankAccountId: string;
};

export type UpdateTransactionPayload = CreateTransactionPayload & {};

export class TransactionsService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  list(filters: TransactionsFilters) {
    return this.httpService.get<Transaction[]>(endpoints.transaction.list, { params: filters });
  }

  create(payload: CreateTransactionPayload) {
    return this.httpService.post(endpoints.transaction.create, payload);
  }

  update(transactionId: string, payload: UpdateTransactionPayload) {
    const url = endpoints.transaction.update.replace(':id', transactionId);
    return this.httpService.put(url, payload);
  }

  delete(accountId: string) {
    const url = endpoints.transaction.delete.replace(':id', accountId);
    return this.httpService.delete(url);
  }
}
