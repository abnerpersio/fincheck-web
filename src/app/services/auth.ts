import { endpoints } from '../../infra/api';
import { HttpService } from './http-service';

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type SignupResult = {
  token: string;
};

export type SigninResult = {
  token: string;
};

export class AuthService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  signup(payload: SignupPayload) {
    return this.httpService.post<SignupResult>(endpoints.signup, payload);
  }

  sigin(payload: SigninPayload) {
    return this.httpService.post<SigninResult>(endpoints.signin, payload);
  }
}
