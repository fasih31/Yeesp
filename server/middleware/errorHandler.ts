import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request data',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required',
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'You do not have permission to perform this action',
    });
  }

  console.error('Unhandled Error:', err);

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'An unexpected error occurred. Please try again later.',
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
};

export const validationError = (message: string) => {
  throw new AppError(400, message);
};

export const unauthorizedError = (message = 'Unauthorized') => {
  throw new AppError(401, message);
};

export const forbiddenError = (message = 'Forbidden') => {
  throw new AppError(403, message);
};

export const notFoundError = (message = 'Resource not found') => {
  throw new AppError(404, message);
};

export const conflictError = (message: string) => {
  throw new AppError(409, message);
};

export const serverError = (message = 'Internal server error') => {
  throw new AppError(500, message);
};
