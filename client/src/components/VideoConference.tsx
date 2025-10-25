import { useEffect, useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DyteMeeting, provideDyteDesignSystem } from '@dytesdk/react-ui-kit';
import { useDyteClient } from '@dytesdk/react-web-core';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Users } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface VideoConferenceProps {
  sessionId: string;
  userRole: 'tutor' | 'student';
  onEnd?: () => void;
}

export default function VideoConference({ sessionId, userRole, onEnd }: VideoConferenceProps) {
  const [meeting, initMeeting] = useDyteClient();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [attendanceId, setAttendanceId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Join session and record attendance
  const joinMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/sessions/${sessionId}/join`, {
        method: 'POST',
      });
    },
    onSuccess: (data) => {
      setAttendanceId(data.id);
      toast({
        title: 'Joined Session',
        description: 'Attendance recorded automatically',
      });
    },
  });

  // Start video session (tutor only)
  const startVideoMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/sessions/${sessionId}/start-video`, {
        method: 'POST',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Video Session Started',
        description: 'Students can now join',
      });
      // Initialize Dyte meeting here with the room ID
      // In production, you'd call Dyte API with data.videoRoomId
    },
  });

  // End video session
  const endVideoMutation = useMutation({
    mutationFn: async () => {
      // Record leave time
      if (attendanceId) {
        await apiRequest(`/attendance/${attendanceId}/leave`, {
          method: 'POST',
        });
      }
      
      // End session (tutor only)
      if (userRole === 'tutor') {
        return apiRequest(`/sessions/${sessionId}/end-video`, {
          method: 'POST',
        });
      }
    },
    onSuccess: () => {
      toast({
        title: 'Session Ended',
        description: 'Video conference has ended',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/sessions'] });
      onEnd?.();
    },
  });

  useEffect(() => {
    // Auto-join when component mounts
    joinMutation.mutate();

    // Cleanup on unmount
    return () => {
      if (attendanceId) {
        apiRequest(`/attendance/${attendanceId}/leave`, {
          method: 'POST',
        }).catch(console.error);
      }
    };
  }, []);

  const toggleVideo = () => {
    if (meeting) {
      if (isVideoOn) {
        meeting.self.disableVideo();
      } else {
        meeting.self.enableVideo();
      }
      setIsVideoOn(!isVideoOn);
    }
  };

  const toggleAudio = () => {
    if (meeting) {
      if (isAudioOn) {
        meeting.self.disableAudio();
      } else {
        meeting.self.enableAudio();
      }
      setIsAudioOn(!isAudioOn);
    }
  };

  const endCall = () => {
    endVideoMutation.mutate();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Video Area */}
      <div className="flex-1 relative">
        {meeting ? (
          <DyteMeeting meeting={meeting} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>Joining Video Session</CardTitle>
                <CardDescription>
                  Please wait while we connect you to the session...
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userRole === 'tutor' && (
                  <Button 
                    onClick={() => startVideoMutation.mutate()}
                    disabled={startVideoMutation.isPending}
                    className="w-full"
                  >
                    Start Video Session
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4 flex items-center justify-center gap-4">
        <Button
          variant={isVideoOn ? "default" : "destructive"}
          size="lg"
          className="rounded-full w-14 h-14"
          onClick={toggleVideo}
        >
          {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </Button>
        
        <Button
          variant={isAudioOn ? "default" : "destructive"}
          size="lg"
          className="rounded-full w-14 h-14"
          onClick={toggleAudio}
        >
          {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full w-14 h-14"
          onClick={endCall}
          disabled={endVideoMutation.isPending}
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>

      {/* Session Info */}
      <div className="bg-gray-700 px-4 py-2 flex items-center justify-between text-white text-sm">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Session ID: {sessionId.slice(0, 8)}...</span>
        </div>
        <div>
          {userRole === 'tutor' ? '👨‍🏫 Tutor' : '👨‍🎓 Student'}
        </div>
      </div>
    </div>
  );
}

// Load Dyte design system
provideDyteDesignSystem(document.body, {
  theme: 'dark',
});
