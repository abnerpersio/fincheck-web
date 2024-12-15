import { endpoints } from '../../infra/api';
import { HttpService } from './http-service';

export type GetMeResult = {
  name: string;
  email: string;
};

export class UsersService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  getMeDetails() {
    return this.httpService.get<GetMeResult>(endpoints.me);
  }
}
