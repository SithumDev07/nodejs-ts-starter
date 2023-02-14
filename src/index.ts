import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from './config';

import dotenv from 'dotenv';
import { ApiError } from './errors/apiError';
import { asyncWrapper } from './components/async-wrapper';
import { NotFoundError } from './errors/notFoundError';
import { StatusCodes } from 'http-status-codes';
import ErrorHandler from './errors/error-handler';

const configuration: any = dotenv.config().parsed;

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ErrorHandler.handle());

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Hello TS',
  });
});

app.post('/post', async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body);
  return res.status(200).send({
    message: 'Hey from POST Request',
  });
});

app.get(
  '/protected',
  asyncWrapper(async (req: Request, res: Response) => {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }),
);

// Not found routes
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(req.path));
});

const PORT = config.port || 4000;

try {
  app.listen(PORT, (): void => {
    console.log(`Server Connected Successfully on PORT -> ${PORT}`);
  });
} catch (err: any) {
  console.error(`Error occured: ${err.message}`);
}

process.on('uncaughtException', (error: Error) => {
  console.log(error.name, error.message);
  console.log('Uncaught Exception, Shutting Down...');
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
  console.log(reason.name, reason.message);
  console.log('UNHANDLED REJECTION, Shutting Down...');
  process.exit(1);
  throw reason;
});
