import { ApiError } from './apiError';
import { NextFunction, Request, Response } from 'express';

export default class ErrorHandler {
  static handle = () => {
    return async (error: ApiError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({
        success: false,
        message: error.message,
        // rawErrors: error.rawErrors ?? [],
        stack: error.stack,
      });
    };
  };
}
