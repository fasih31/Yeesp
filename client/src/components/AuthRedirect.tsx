import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';

export function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      // Redirect to appropriate dashboard based on role
      const dashboardMap: Record<string, string> = {
        student: '/dashboard/student',
        tutor: '/dashboard/tutor',
        freelancer: '/dashboard/freelancer',
        recruiter: '/dashboard/recruiter',
        admin: '/dashboard/admin',
      };

      const dashboard = dashboardMap[user.role] || '/dashboard/student';
      setLocation(dashboard);
    } else {
      // Not authenticated - redirect to login
      setLocation('/auth/login');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
