import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Plus, DollarSign } from "lucide-react";
import type { Project, Bid, User } from "@shared/schema";

type ProjectWithBids = Project & {
  bids: (Bid & { freelancer: User })[];
};

export default function RecruiterDashboard() {
  const { data: projects } = useQuery<ProjectWithBids[]>({
    queryKey: ["/api/projects/my"],
  });

  const stats = {
    totalProjects: projects?.length || 0,
    activeProjects: projects?.filter(p => p.status === 'open').length || 0,
    totalBids: projects?.reduce((acc, p) => acc + (p.bids?.length || 0), 0) || 0,
    totalSpent: projects?.reduce((acc, p) => acc + parseFloat(p.budget), 0) || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">
            Recruiter Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Post projects and hire talented freelancers
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-stat-projects">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-projects">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeProjects} active
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-bids">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-bids">{stats.totalBids}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-hired">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-hired">0</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-spent">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-spent">
                ${stats.totalSpent.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList data-testid="tabs-dashboard">
            <TabsTrigger value="active" data-testid="tab-active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">Completed</TabsTrigger>
            <TabsTrigger value="all" data-testid="tab-all">All Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Projects</h2>
              <Button asChild data-testid="button-create-project">
                <Link href="/recruiter/project/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Post Project
                </Link>
              </Button>
            </div>

            {projects && projects.filter(p => p.status === 'open').length > 0 ? (
              <div className="grid gap-4">
                {projects.filter(p => p.status === 'open').map((project) => (
                  <Card key={project.id} className="hover-elevate" data-testid={`card-project-${project.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle data-testid={`text-project-title-${project.id}`}>
                            {project.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {project.description}
                          </CardDescription>
                        </div>
                        <Badge>{project.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.skills?.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">${project.budget}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.bids?.length || 0} proposals
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/project/${project.id}`}>
                            View Proposals
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No active projects
                  </p>
                  <Button asChild>
                    <Link href="/recruiter/project/create">Post Your First Project</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <h2 className="text-2xl font-semibold">Completed Projects</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No completed projects yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <h2 className="text-2xl font-semibold">All Projects</h2>

            {projects && projects.length > 0 ? (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="hover-elevate">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription className="mt-2">
                            Posted {new Date(project.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge>{project.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" asChild>
                        <Link href={`/project/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No projects yet
                  </p>
                  <Button asChild>
                    <Link href="/recruiter/project/create">Post a Project</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
