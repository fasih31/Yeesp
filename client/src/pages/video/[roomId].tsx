import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/hooks/use-user';
import VideoConference from '@/components/VideoConference';
import { useLocation } from 'wouter';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function VideoRoom() {
  const [, params] = useRoute('/video/:roomId');
  const [, setLocation] = useLocation();
  const { user } = useUser();

  if (!params?.roomId) {
    return <div>Invalid room ID</div>;
  }

  // Extract session ID from room ID (format: room_sessionId_timestamp)
  const sessionId = params.roomId.split('_')[1];

  const handleEnd = () => {
    // Redirect based on role
    if (user?.role === 'tutor') {
      setLocation('/dashboard/tutor/sessions');
    } else {
      setLocation('/dashboard/student/my-courses');
    }
  };

  if (!user) {
    return <LoadingSpinner size="lg" />;
  }

  const userRole = user.role === 'tutor' ? 'tutor' : 'student';

  return (
    <VideoConference 
      sessionId={sessionId} 
      userRole={userRole}
      onEnd={handleEnd}
    />
  );
}
