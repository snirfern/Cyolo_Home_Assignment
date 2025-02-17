import { HttpStatusCode } from './interface';

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InvalidFile extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
