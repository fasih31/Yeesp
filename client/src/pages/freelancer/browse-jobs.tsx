import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Project, User } from "@shared/schema";

type ProjectWithRecruiter = Project & {
  recruiter: User;
  bidCount: number;
};

export default function FreelancerBrowseJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [timeline, setTimeline] = useState("");
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery<ProjectWithRecruiter[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter(p =>
    p.status === "open" &&
    (searchTerm === "" ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmitBid = async () => {
    if (!selectedProject || !bidAmount || !proposal) return;

    try {
      await apiRequest("/bids", {
        method: "POST",
        body: JSON.stringify({
          projectId: selectedProject,
          freelancerId: "freelancer-id", // TODO: Get from auth
          amount: bidAmount,
          proposal,
          timeline,
        }),
      });

      toast({
        title: "Proposal Submitted!",
        description: "Your proposal has been sent to the client.",
      });

      setSelectedProject(null);
      setBidAmount("");
      setProposal("");
      setTimeline("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit proposal",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse Jobs</h1>
        <p className="text-muted-foreground">Find projects that match your skills</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : filteredProjects && filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      Posted by {project.recruiter?.name || "Unknown"} •
                      {new Date(project.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge>{project.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                {project.skills && project.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${project.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{project.bidCount || 0} proposals</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedProject(project.id)}>
                        Submit Proposal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Your Proposal</DialogTitle>
                        <DialogDescription>{project.title}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bidAmount">Your Bid Amount ($)</Label>
                          <Input
                            id="bidAmount"
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder={`Budget: $${project.budget}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeline">Estimated Timeline</Label>
                          <Input
                            id="timeline"
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            placeholder="e.g., 2-3 weeks"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="proposal">Cover Letter</Label>
                          <Textarea
                            id="proposal"
                            value={proposal}
                            onChange={(e) => setProposal(e.target.value)}
                            placeholder="Explain why you're the best fit for this project..."
                            rows={6}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleSubmitBid}
                          disabled={!bidAmount || !proposal}
                        >
                          Submit Proposal
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" asChild>
                    <Link href={`/project/${project.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? "No projects match your search" : "No projects available"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
