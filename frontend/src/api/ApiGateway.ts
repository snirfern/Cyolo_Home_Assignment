import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseApiGateway } from './interface';

class ApiGateway implements BaseApiGateway {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async put<T>(
    url: string,
    data: any,
    params: Record<string, any> = {},
    headers?: Record<string, any>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      params,
      headers: {
        ...this.axiosInstance.defaults.headers.common,
        ...headers,
      },
    };

    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }
}

export default ApiGateway;
