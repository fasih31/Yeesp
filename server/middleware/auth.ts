import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
    return next(new AppError(401, 'You must be logged in to access this resource'));
  }
  next();
}

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
      return next(new AppError(401, 'You must be logged in to access this resource'));
    }

    const userRole = (req as any).user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return next(new AppError(403, 'You do not have permission to access this resource'));
    }

    next();
  };
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  next();
}
