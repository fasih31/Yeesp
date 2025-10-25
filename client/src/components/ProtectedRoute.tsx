import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useAuth } from "@/lib/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, allowedRoles, requireAuth = true }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      // Check if auth is required but user is not logged in
      if (requireAuth && !user) {
        setLocation("/auth/login");
        return;
      }

      // Check if user has required role
      if (user && allowedRoles.length > 0) {
        const hasAccess = 
          allowedRoles.includes(user.role) || 
          (user.approvedRoles && user.approvedRoles.some((role: string) => allowedRoles.includes(role)));

        if (!hasAccess) {
          // Redirect to their own dashboard
          const dashboardMap: Record<string, string> = {
            'student': '/dashboard/student',
            'tutor': '/dashboard/tutor',
            'freelancer': '/dashboard/freelancer',
            'recruiter': '/dashboard/recruiter',
            'admin': '/admin/dashboard',
          };
          setLocation(dashboardMap[user.role] || '/');
        }
      }
    }
  }, [user, isLoading, requireAuth, allowedRoles, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return null; // Will redirect in useEffect
  }

  if (user && allowedRoles.length > 0) {
    const hasAccess = 
      allowedRoles.includes(user.role) || 
      (user.approvedRoles && user.approvedRoles.some((role: string) => allowedRoles.includes(role)));

    if (!hasAccess) {
      return null; // Will redirect in useEffect
    }
  }

  return <>{children}</>;
}
