import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Session, User } from "@shared/schema";

type SessionWithStudent = Session & {
  student: User;
};

export default function TutorSessions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery<SessionWithStudent[]>({
    queryKey: ["/api/sessions/my"],
    queryFn: async () => {
      const response = await fetch("/api/sessions/my", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: async ({ sessionId, status }: { sessionId: string; status: string }) => {
      return apiRequest(`/sessions/${sessionId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Session Updated",
        description: "The session has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/my"] });
    },
  });

  const upcoming = sessions?.filter(s => 
    s.status === "scheduled" || s.status === "confirmed"
  );
  const completed = sessions?.filter(s => s.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Session Management</h1>
          <p className="text-lg text-muted-foreground">
            Manage your tutoring sessions and availability
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming?.length || 0})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed?.length || 0})</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">Loading sessions...</div>
            ) : upcoming && upcoming.length > 0 ? (
              upcoming.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{session.topic || "Tutoring Session"}</CardTitle>
                        <CardDescription>with {session.student?.name || "Student"}</CardDescription>
                      </div>
                      <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                        {session.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(session.scheduledAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(session.scheduledAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <span>{session.duration || 60} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${session.price || 50}</span>
                      </div>
                    </div>
                    {session.notes && (
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">Notes:</p>
                        <p>{session.notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {session.status === "scheduled" && (
                        <Button
                          onClick={() => updateSessionMutation.mutate({ sessionId: session.id, status: "confirmed" })}
                          disabled={updateSessionMutation.isPending}
                        >
                          Confirm Session
                        </Button>
                      )}
                      {session.status === "confirmed" && (
                        <Button>Start Session</Button>
                      )}
                      <Button variant="outline">View Details</Button>
                      <Button
                        variant="outline"
                        onClick={() => updateSessionMutation.mutate({ sessionId: session.id, status: "cancelled" })}
                        disabled={updateSessionMutation.isPending}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No upcoming sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completed && completed.length > 0 ? (
              completed.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <CardTitle>{session.topic || "Tutoring Session"}</CardTitle>
                    <CardDescription>
                      Completed on {new Date(session.scheduledAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">Completed</Badge>
                      <Button variant="outline" size="sm">View Feedback</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Set Your Availability</CardTitle>
                <CardDescription>Students will be able to book sessions during these times</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Availability management feature coming soon. Students can currently request sessions which you can confirm manually.
                </p>
                <Button disabled>Manage Availability (Coming Soon)</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
