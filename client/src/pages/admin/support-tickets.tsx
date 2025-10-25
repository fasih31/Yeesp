import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Clock, CheckCircle } from "lucide-react";

export default function SupportTickets() {
  const openTickets = [
    { id: "TICK-001", user: "John Doe", subject: "Cannot access course materials", priority: "high", created: "2024-01-12", category: "Technical" },
    { id: "TICK-002", user: "Sarah Wilson", subject: "Payment not reflected", priority: "urgent", created: "2024-01-12", category: "Billing" },
    { id: "TICK-003", user: "Mike Chen", subject: "Tutor cancellation policy", priority: "medium", created: "2024-01-11", category: "General" },
  ];

  const inProgressTickets = [
    { id: "TICK-004", user: "Jane Smith", subject: "Certificate download issue", priority: "medium", created: "2024-01-10", assignedTo: "Admin 1" },
  ];

  const resolvedTickets = [
    { id: "TICK-005", user: "Alex Brown", subject: "Account login problem", priority: "high", created: "2024-01-08", resolved: "2024-01-09" },
  ];

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
            <div className="text-2xl font-bold">{openTickets.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTickets.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Average response: 2.4h</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="open" className="space-y-6">
        <TabsList>
          <TabsTrigger value="open">Open ({openTickets.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTickets.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4">
          {openTickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-base">{ticket.id}</CardTitle>
                      <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </div>
                    <h3 className="font-medium mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ticket.user} • Created {ticket.created}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm">Assign to Me</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Mark Resolved</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressTickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-base">{ticket.id}</CardTitle>
                      <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </div>
                    <h3 className="font-medium mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ticket.user} • Assigned to {ticket.assignedTo}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm">Reply</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Mark Resolved</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedTickets.map((ticket) => (
            <Card key={ticket.id} className="opacity-75">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-base">{ticket.id}</CardTitle>
                      <Badge variant="outline">Resolved</Badge>
                    </div>
                    <h3 className="font-medium mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ticket.user} • Created {ticket.created} • Resolved {ticket.resolved}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
