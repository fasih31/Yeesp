
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const projectSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  budget: z.string().min(1, "Budget is required"),
  deadline: z.string().optional(),
  skills: z.string().min(1, "At least one skill is required"),
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function CreateProject() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      deadline: "",
      skills: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ProjectForm) => {
      const projectData = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()),
      };
      const response = await apiRequest("POST", "/api/projects", projectData);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Project posted!",
        description: "Your project has been published and freelancers can now apply.",
      });
      setLocation("/dashboard/recruiter");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: ProjectForm) => {
    createMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold">YEESP</h1>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/dashboard/recruiter">Back to Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Post a New Project</CardTitle>
            <p className="text-muted-foreground mt-2">
              Describe your project to attract the right freelancers
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Build a responsive e-commerce website"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Write a clear, descriptive title for your project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project in detail, including objectives, requirements, and expected deliverables..."
                          className="min-h-40"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide detailed information to help freelancers understand your needs
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Set your maximum budget for this project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        When do you need this project completed?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skills</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, MongoDB, AWS"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter skills separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Posting..." : "Post Project"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/dashboard/recruiter")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
