import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '../../infra/env';
import { localStorageKeys } from '../constants/local-storage';

type Params = {
  baseURL?: string;
};

export class HttpService {
  private readonly axios: AxiosInstance;

  constructor(params?: Params) {
    this.axios = axios.create({
      baseURL: params?.baseURL || env.apiBaseURL,
    });

    this.axios.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(localStorageKeys.accessToken);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }

  get<T = Record<string, unknown>>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config);
  }

  post<T = Record<string, unknown>>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) {
    return this.axios.post<T>(url, data, config);
  }

  patch<T = Record<string, unknown>>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) {
    return this.axios.patch<T>(url, data, config);
  }

  put<T = Record<string, unknown>>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ) {
    return this.axios.put<T>(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }
}
