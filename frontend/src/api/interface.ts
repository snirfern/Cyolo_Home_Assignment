export interface BaseApiGateway {
  put<T>(url: string, data: any, params?: Record<string, any>): Promise<T>;
}
