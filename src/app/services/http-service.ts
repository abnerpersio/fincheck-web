import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '../../infra/env';

type Params = {
  baseURL?: string;
};

export abstract class HttpService {
  private readonly axios: AxiosInstance;

  constructor(params?: Params) {
    this.axios = axios.create({
      baseURL: params?.baseURL || env.apiBaseURL,
    });
  }

  protected get<T = Record<string, unknown>>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config);
  }

  protected post<T = Record<string, unknown>>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) {
    return this.axios.post<T>(url, data, config);
  }

  protected delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  protected patch<T = Record<string, unknown>>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) {
    return this.axios.patch<T>(url, data, config);
  }
}
