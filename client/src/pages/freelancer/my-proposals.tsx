import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import type { Bid, Project } from "@shared/schema";

type BidWithProject = Bid & {
  project: Project;
};

export default function FreelancerMyProposals() {
  const { data: bids, isLoading } = useQuery<BidWithProject[]>({
    queryKey: ["/api/bids/my"],
    queryFn: async () => {
      return api.bids.getMy();
    },
  });

  const pending = bids?.filter(b => b.status === "pending");
  const accepted = bids?.filter(b => b.status === "accepted");
  const rejected = bids?.filter(b => b.status === "rejected");

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Proposals</h1>
        <p className="text-muted-foreground">Track your submitted proposals</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending?.length || 0})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({accepted?.length || 0})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">Loading proposals...</div>
          ) : pending && pending.length > 0 ? (
            pending.map((bid) => (
              <Card key={bid.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{bid.project?.title || "Project"}</CardTitle>
                      <CardDescription>
                        Submitted {new Date(bid.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Under Review</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your proposal: ${bid.amount} • {bid.timeline}
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    {bid.proposal}
                  </div>
                  <Button variant="outline" size="sm">View Proposal</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending proposals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {accepted && accepted.length > 0 ? (
            accepted.map((bid) => (
              <Card key={bid.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{bid.project?.title || "Project"}</CardTitle>
                      <CardDescription>
                        Accepted {bid.acceptedAt ? new Date(bid.acceptedAt).toLocaleDateString() : 'N/A'}
                      </CardDescription>
                    </div>
                    <Badge>Accepted</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contract amount: ${bid.amount}
                  </p>
                  <Button>View Contract</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No accepted proposals yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejected && rejected.length > 0 ? (
            rejected.map((bid) => (
              <Card key={bid.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{bid.project?.title || "Project"}</CardTitle>
                      <CardDescription>
                        Rejected {bid.rejectedAt ? new Date(bid.rejectedAt).toLocaleDateString() : 'N/A'}
                      </CardDescription>
                    </div>
                    <Badge variant="destructive">Rejected</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No rejected proposals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
