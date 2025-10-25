
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function RoleRequests() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [reviewNotes, setReviewNotes] = useState<{ [key: string]: string }>({});

  const { data: requests, isLoading } = useQuery({
    queryKey: ['/api/role-requests/pending'],
  });

  const approveMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const response = await fetch(`/api/role-requests/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNotes: notes }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to approve request');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Role request approved" });
      queryClient.invalidateQueries({ queryKey: ['/api/role-requests/pending'] });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to approve request" });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const response = await fetch(`/api/role-requests/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNotes: notes }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to reject request');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Role request rejected" });
      queryClient.invalidateQueries({ queryKey: ['/api/role-requests/pending'] });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to reject request" });
    },
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Role Requests</h1>
        <p className="text-muted-foreground">Review and approve user role requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>Review requests from users seeking additional roles</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : !requests || requests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No pending role requests
            </p>
          ) : (
            <div className="space-y-6">
              {requests.map((request: any) => (
                <div key={request.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg capitalize">{request.requestedRole} Role</h3>
                      <p className="text-sm text-muted-foreground">
                        User ID: {request.userId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Requested: {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" /> Pending
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-1">Reason:</p>
                    <p className="text-sm bg-muted p-3 rounded">{request.reason}</p>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor={`notes-${request.id}`}>Review Notes (Optional)</Label>
                    <Textarea
                      id={`notes-${request.id}`}
                      value={reviewNotes[request.id] || ''}
                      onChange={(e) => setReviewNotes({ ...reviewNotes, [request.id]: e.target.value })}
                      placeholder="Add notes for the user..."
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => approveMutation.mutate({ 
                        id: request.id, 
                        notes: reviewNotes[request.id] || '' 
                      })}
                      disabled={approveMutation.isPending}
                    >
                      {approveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => rejectMutation.mutate({ 
                        id: request.id, 
                        notes: reviewNotes[request.id] || 'Request does not meet requirements' 
                      })}
                      disabled={rejectMutation.isPending}
                    >
                      {rejectMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
