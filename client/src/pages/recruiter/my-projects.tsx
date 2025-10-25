import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, DollarSign, Clock } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import type { Project } from "@shared/schema";

type ProjectWithBids = Project & {
  bidCount: number;
  bids?: any[];
};

export default function RecruiterMyProjects() {
  const { data: projects, isLoading } = useQuery<ProjectWithBids[]>({
    queryKey: ["/api/projects/my"],
    queryFn: async () => {
      return api.projects.getMy();
    },
  });

  const active = projects?.filter(p => p.status === "open");
  const completed = projects?.filter(p => p.status === "completed");
  const drafts = projects?.filter(p => p.status === "draft");

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage your posted projects</p>
        </div>
        <Button asChild>
          <Link href="/recruiter/post-project">Post New Project</Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({active?.length || 0})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed?.length || 0})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({drafts?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">Loading projects...</div>
          ) : active && active.length > 0 ? (
            active.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>
                        Posted {new Date(project.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{project.bidCount || 0} proposals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span>${project.budget} budget</span>
                    </div>
                    {project.deadline && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link href={`/recruiter/project/${project.id}/proposals`}>
                        View Proposals ({project.bidCount || 0})
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/recruiter/project/${project.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No active projects</p>
                <Button asChild>
                  <Link href="/recruiter/post-project">Post Your First Project</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completed && completed.length > 0 ? (
            completed.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    Completed {project.completedAt ? new Date(project.completedAt).toLocaleDateString() : 'N/A'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">Completed</Badge>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No completed projects</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {drafts && drafts.length > 0 ? (
            drafts.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>Last edited {new Date(project.updatedAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link href={`/recruiter/project/${project.id}/edit`}>Continue Editing</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No draft projects</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
