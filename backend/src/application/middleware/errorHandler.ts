import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../domain/errrors/errors';

const errorHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  let { message, statusCode } = err as AppError;

  if (!(err instanceof AppError)) {
    message = 'Internal Server Error';
    statusCode = 500;
  }

  res.status(statusCode).json({
    message
  });

  return next(err);
};

export default errorHandler;
