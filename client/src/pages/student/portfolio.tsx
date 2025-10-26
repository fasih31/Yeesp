
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { Award, Plus, ExternalLink, Edit, Trash2, FileText } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  projectUrl?: string;
  skills: string[];
  createdAt: string;
}

export default function StudentPortfolio() {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolioItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
    queryFn: () => apiRequest("/portfolio"),
  });

  const { data: certificates = [] } = useQuery({
    queryKey: ["/api/certificates"],
    queryFn: () => apiRequest("/certificates"),
  });

  const addItemMutation = useMutation({
    mutationFn: (data: Partial<PortfolioItem>) =>
      apiRequest("/portfolio", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      setOpen(false);
      toast({ title: "Portfolio item added successfully" });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/portfolio/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Portfolio item deleted" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skills = (formData.get("skills") as string).split(",").map(s => s.trim());

    addItemMutation.mutate({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      projectUrl: formData.get("projectUrl") as string,
      skills,
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Portfolio</h1>
          <p className="text-muted-foreground">Showcase your work and achievements</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="e.g., Web Development" required />
              </div>
              <div>
                <Label htmlFor="projectUrl">Project URL (optional)</Label>
                <Input id="projectUrl" name="projectUrl" type="url" />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" name="skills" placeholder="React, TypeScript, Node.js" />
              </div>
              <Button type="submit" disabled={addItemMutation.isPending}>
                Add to Portfolio
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Certificates Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-6 w-6" />
          My Certificates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert: any) => (
            <Card key={cert.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  {cert.courseTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Completed: {new Date(cert.issuedAt).toLocaleDateString()}
                </p>
                <p className="text-sm mb-4">Certificate ID: {cert.certificateId}</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/api/certificates/${cert.id}/download`} download>
                    <FileText className="h-4 w-4 mr-2" />
                    Download Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Portfolio Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setEditItem(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItemMutation.mutate(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {item.projectUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
