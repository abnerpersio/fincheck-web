import { endpoints } from '../../../infra/api';
import { HttpService } from '../http-service';

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

export class AuthService extends HttpService {
  signup(payload: SignupPayload) {
    return this.post<SignupResult>(endpoints.signup, payload);
  }

  sigin(payload: SigninPayload) {
    return this.post<SigninResult>(endpoints.signin, payload);
  }
}
