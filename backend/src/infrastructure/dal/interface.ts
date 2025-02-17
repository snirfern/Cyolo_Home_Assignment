export interface IBaseDal<T, R> {
  create(newImage: Partial<R>): Promise<T>;

  findByField(field: string, value: string): Promise<T | null>;
}
