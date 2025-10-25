import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, DollarSign, CheckCircle, Clock } from "lucide-react";
import type { Bid, Project, User } from "@shared/schema";

type BidWithProject = Bid & {
  project: Project & { recruiter: User };
};

export default function FreelancerDashboard() {
  const { data: bids } = useQuery<BidWithProject[]>({
    queryKey: ["/api/bids/my"],
  });

  const stats = {
    totalBids: bids?.length || 0,
    accepted: bids?.filter(b => b.status === 'accepted').length || 0,
    pending: bids?.filter(b => b.status === 'pending').length || 0,
    totalEarnings: bids
      ?.filter(b => b.status === 'accepted')
      .reduce((acc, b) => acc + parseFloat(b.bidAmount), 0) || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">
            Freelancer Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your projects and proposals
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-stat-bids">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-bids">{stats.totalBids}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-pending">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-pending">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-accepted">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-accepted">{stats.accepted}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-earnings">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-earnings">
                ${stats.totalEarnings.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList data-testid="tabs-dashboard">
            <TabsTrigger value="active" data-testid="tab-active">Active Proposals</TabsTrigger>
            <TabsTrigger value="won" data-testid="tab-won">Won Projects</TabsTrigger>
            <TabsTrigger value="browse" data-testid="tab-browse">Browse Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Active Proposals</h2>

            {bids && bids.filter(b => b.status === 'pending').length > 0 ? (
              <div className="grid gap-4">
                {bids.filter(b => b.status === 'pending').map((bid) => (
                  <Card key={bid.id} className="hover-elevate" data-testid={`card-bid-${bid.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle data-testid={`text-project-title-${bid.id}`}>
                            {bid.project.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Proposed: ${bid.bidAmount}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{bid.proposal}</p>
                      <div className="text-sm text-muted-foreground">
                        Submitted {new Date(bid.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No active proposals
                  </p>
                  <Button asChild>
                    <Link href="/projects">Browse Projects</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="won" className="space-y-6">
            <h2 className="text-2xl font-semibold">Won Projects</h2>

            {bids && bids.filter(b => b.status === 'accepted').length > 0 ? (
              <div className="grid gap-4">
                {bids.filter(b => b.status === 'accepted').map((bid) => (
                  <Card key={bid.id} className="hover-elevate" data-testid={`card-won-${bid.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle>{bid.project.title}</CardTitle>
                          <CardDescription className="mt-2">
                            Contract Amount: ${bid.bidAmount}
                          </CardDescription>
                        </div>
                        <Badge>Accepted</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <Link href={`/project/${bid.projectId}`}>
                          View Project Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No won projects yet. Keep applying!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            <div className="text-center py-12">
              <Button asChild size="lg">
                <Link href="/projects">
                  Browse All Projects
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
