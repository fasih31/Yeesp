
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, CheckCircle, XCircle, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RoleRequest() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState("");
  const [reason, setReason] = useState("");

  const { data: requests, isLoading } = useQuery({
    queryKey: ['/api/role-requests/my'],
  });

  const requestMutation = useMutation({
    mutationFn: async (data: { requestedRole: string; reason: string }) => {
      const response = await fetch('/api/role-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit request');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Role request submitted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/role-requests/my'] });
      setSelectedRole("");
      setReason("");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !reason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a role and provide a reason",
      });
      return;
    }
    requestMutation.mutate({ requestedRole: selectedRole, reason });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Request Additional Role Access</h1>
        <p className="text-muted-foreground">
          Request access to additional platform features by applying for new roles
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submit New Role Request</CardTitle>
          <CardDescription>
            Explain why you need access to additional roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="role">Select Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutor">Tutor - Teach courses and sessions</SelectItem>
                  <SelectItem value="freelancer">Freelancer - Work on projects</SelectItem>
                  <SelectItem value="recruiter">Recruiter - Post projects and hire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Request</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why you need access to this role..."
                rows={5}
              />
            </div>

            <Button type="submit" disabled={requestMutation.isPending}>
              {requestMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <UserPlus className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Role Requests</CardTitle>
          <CardDescription>Track the status of your role requests</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : !requests || requests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No role requests yet
            </p>
          ) : (
            <div className="space-y-4">
              {requests.map((request: any) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold capitalize">{request.requestedRole}</h3>
                      <p className="text-sm text-muted-foreground">
                        Requested on {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-sm mb-2">{request.reason}</p>
                  {request.reviewNotes && (
                    <div className="mt-2 p-2 bg-muted rounded">
                      <p className="text-sm font-semibold">Admin Response:</p>
                      <p className="text-sm">{request.reviewNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
