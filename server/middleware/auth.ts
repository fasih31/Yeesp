import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

// Extend Express Request type
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: string;
      approvedRoles?: string[];
    }
  }
}

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

    const user = (req as any).user;
    const userPrimaryRole = user?.role;
    const userApprovedRoles = user?.approvedRoles || [];

    if (!userPrimaryRole) {
      return next(new AppError(403, 'User role not found'));
    }

    // Check if user has primary role or any approved additional roles
    const hasAccess = allowedRoles.includes(userPrimaryRole) || 
                     allowedRoles.some(role => userApprovedRoles.includes(role));

    if (!hasAccess) {
      return next(new AppError(403, `Access denied. Required roles: ${allowedRoles.join(', ')}. Your role: ${userPrimaryRole}. To access this area, please request additional role access from admin.`));
    }

    next();
  };
}

export function requireExactRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as any).isAuthenticated || !(req as any).isAuthenticated()) {
      return next(new AppError(401, 'You must be logged in to access this resource'));
    }

    const user = (req as any).user;
    const userPrimaryRole = user?.role;
    const userApprovedRoles = user?.approvedRoles || [];

    const hasRole = userPrimaryRole === role || userApprovedRoles.includes(role);

    if (!hasRole) {
      return next(new AppError(403, `Access denied. You need '${role}' role to access this resource. Please request role access from admin.`));
    }

    next();
  };
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  next();
}
