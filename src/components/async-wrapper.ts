import { NextFunction, Request, Response } from 'express';

export const asyncWrapper = (fun: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fun(req, res, next)).catch((error) => next(error));
};
