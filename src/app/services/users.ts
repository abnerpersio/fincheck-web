import { endpoints } from '../../infra/api';
import { HttpService } from './http-service';

export type GetMeResult = {
  name: string;
  email: string;
};

export class UsersService extends HttpService {
  getMeDetails() {
    return this.get<GetMeResult>(endpoints.me);
  }
}
