
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

export default function AdminProjects() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const approveMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const res = await fetch(`/api/admin/projects/${projectId}/approve`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to approve project");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Project approved successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setSelectedProject(null);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ projectId, reason }: { projectId: string; reason: string }) => {
      const res = await fetch(`/api/admin/projects/${projectId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error("Failed to reject project");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Project rejected" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setSelectedProject(null);
    },
  });

  if (isLoading) {
    return <div className="container py-8">Loading projects...</div>;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Project Management</h1>
        <p className="text-muted-foreground">Monitor platform projects ({projects?.length || 0} total)</p>
      </div>

      <div className="space-y-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Budget: ${project.budget}</Badge>
                      {project.skills?.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Badge variant={
                    project.status === 'open' ? 'default' :
                    project.status === 'in_progress' ? 'secondary' :
                    project.status === 'completed' ? 'outline' : 'destructive'
                  }>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => approveMutation.mutate(project.id)}
                    disabled={project.status === 'open'}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => rejectMutation.mutate({ projectId: project.id, reason: "Violates platform policies" })}
                  >
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No projects found</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProject && projects?.find(p => p.id === selectedProject) && (
              <>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm">{projects.find(p => p.id === selectedProject)?.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Budget</h4>
                  <p className="text-sm">${projects.find(p => p.id === selectedProject)?.budget}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects.find(p => p.id === selectedProject)?.skills?.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
