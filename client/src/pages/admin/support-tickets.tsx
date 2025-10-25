import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { SupportTicket, User } from "@shared/schema";

type TicketWithUser = SupportTicket & {
  user: User;
  replyCount?: number;
};

export default function SupportTickets() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const { data: tickets, isLoading } = useQuery<TicketWithUser[]>({
    queryKey: ["/api/support-tickets"],
    queryFn: async () => {
      const response = await fetch("/api/support-tickets", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch tickets");
      return response.json();
    },
  });

  const updateTicketMutation = useMutation({
    mutationFn: async ({ id, status, assignedTo }: { id: string; status?: string; assignedTo?: string }) => {
      return apiRequest(`/support-tickets/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, assignedTo }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Ticket Updated",
        description: "The ticket status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/support-tickets"] });
    },
  });

  const replyMutation = useMutation({
    mutationFn: async ({ ticketId, content }: { ticketId: string; content: string }) => {
      return apiRequest("/ticket-replies", {
        method: "POST",
        body: JSON.stringify({
          ticketId,
          userId: "admin-id", // TODO: Get from auth
          content,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent to the user.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/support-tickets"] });
      setSelectedTicket(null);
      setReply("");
    },
  });

  const openTickets = tickets?.filter(t => t.status === "open");
  const inProgressTickets = tickets?.filter(t => t.status === "in_progress");
  const resolvedTickets = tickets?.filter(t => t.status === "closed");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Support Tickets</h1>
        <p className="text-muted-foreground">Manage user support requests</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Total resolved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="open" className="space-y-6">
        <TabsList>
          <TabsTrigger value="open">Open ({openTickets?.length || 0})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTickets?.length || 0})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedTickets?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">Loading tickets...</div>
          ) : openTickets && openTickets.length > 0 ? (
            openTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-base">#{ticket.id.slice(0, 8)}</CardTitle>
                        <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                        <Badge variant="outline">{ticket.category}</Badge>
                      </div>
                      <h3 className="font-medium mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ticket.user?.name || 'Unknown User'} • Created {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{ticket.message}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateTicketMutation.mutate({
                        id: ticket.id,
                        status: "in_progress",
                        assignedTo: "current-admin-id" // TODO: Get from auth
                      })}
                      disabled={updateTicketMutation.isPending}
                    >
                      Assign to Me
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTicket(ticket.id)}>
                          Reply
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reply to Ticket</DialogTitle>
                          <DialogDescription>{ticket.subject}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <Label htmlFor="reply">Your Response</Label>
                          <Textarea
                            id="reply"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type your response..."
                            rows={6}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => replyMutation.mutate({
                              ticketId: ticket.id,
                              content: reply,
                            })}
                            disabled={!reply || replyMutation.isPending}
                          >
                            Send Reply
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTicketMutation.mutate({ id: ticket.id, status: "closed" })}
                      disabled={updateTicketMutation.isPending}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No open tickets</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressTickets && inProgressTickets.length > 0 ? (
            inProgressTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-base">#{ticket.id.slice(0, 8)}</CardTitle>
                        <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </div>
                      <h3 className="font-medium mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ticket.user?.name || 'Unknown'} • Assigned to: {ticket.assignedTo || 'Unassigned'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">Reply</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reply to Ticket</DialogTitle>
                          <DialogDescription>{ticket.subject}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2">
                          <Label htmlFor="reply">Your Response</Label>
                          <Textarea
                            id="reply"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type your response..."
                            rows={6}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => replyMutation.mutate({
                              ticketId: ticket.id,
                              content: reply,
                            })}
                            disabled={!reply || replyMutation.isPending}
                          >
                            Send Reply
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateTicketMutation.mutate({ id: ticket.id, status: "closed" })}
                      disabled={updateTicketMutation.isPending}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No tickets in progress</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedTickets && resolvedTickets.length > 0 ? (
            resolvedTickets.map((ticket) => (
              <Card key={ticket.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-base">#{ticket.id.slice(0, 8)}</CardTitle>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <h3 className="font-medium mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ticket.user?.name || 'Unknown'} • Created {new Date(ticket.createdAt).toLocaleDateString()}
                        {ticket.resolvedAt && ` • Resolved ${new Date(ticket.resolvedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No resolved tickets</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
