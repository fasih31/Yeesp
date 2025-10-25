import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, AlertCircle, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { projectSchema } from "@/lib/validation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function EditProject() {
  const [match, params] = useRoute("/recruiter/project/:id/edit");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    status: "open" as "open" | "in_progress" | "completed" | "cancelled",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch project data
  const { data: project, isLoading } = useQuery({
    queryKey: ['/api/projects', params?.id],
    queryFn: async () => {
      const data = await apiRequest(`/projects/${params?.id}`);
      return data;
    },
    enabled: !!params?.id,
  });

  // Populate form when project data loads
  useEffect(() => {
    if (project) {
      setProjectData({
        title: project.title || "",
        description: project.description || "",
        budget: project.budget?.toString() || "",
        deadline: project.deadline ? new Date(project.deadline).toISOString().split('T')[0] : "",
        status: project.status || "open",
      });
      setSkills(project.skills || []);
    }
  }, [project]);

  const validateForm = () => {
    try {
      projectSchema.parse({
        ...projectData,
        budget: projectData.budget ? Number(projectData.budget) : 0,
      });
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const updateProjectMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(`/projects/${params?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...projectData,
          budget: parseFloat(projectData.budget),
          deadline: projectData.deadline ? new Date(projectData.deadline) : null,
          skills,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Project Updated",
        description: "Your project has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setLocation("/recruiter/my-projects");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const handleUpdate = () => {
    if (validateForm()) {
      updateProjectMutation.mutate();
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!match || !params?.id) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/recruiter/my-projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Edit Project</h1>
          </div>
          <Button
            onClick={handleUpdate}
            disabled={updateProjectMutation.isPending}
          >
            {updateProjectMutation.isPending ? "Updating..." : "Update Project"}
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Update the details of your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Project Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                placeholder="e.g., Build a Mobile App for E-commerce"
              />
              {errors.title && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                placeholder="Describe the project requirements, goals, and expectations..."
                rows={8}
              />
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">
                  Budget (USD) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  value={projectData.budget}
                  onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                  placeholder="5000"
                />
                {errors.budget && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.budget}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={projectData.deadline}
                  onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Project Status</Label>
              <Select value={projectData.status} onValueChange={(value: any) => setProjectData({ ...projectData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="e.g., React, Node.js, Python"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
