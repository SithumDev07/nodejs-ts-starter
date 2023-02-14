import { ApiError } from './apiError';

export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(404, `The requested path: ${path} not found`);
  }
}
