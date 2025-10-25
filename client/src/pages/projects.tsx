import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Briefcase, Calendar, DollarSign } from "lucide-react";
import type { Project, User } from "@shared/schema";

type ProjectWithRecruiter = Project & {
  recruiter: User;
  bidCount?: number;
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery<ProjectWithRecruiter[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch && project.status === 'open';
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] via-[#F0F7FF] to-[#E8F0FF] dark:from-[#1A2238] dark:via-[#0f1724] dark:to-[#1A2238]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 mt-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-projects-heading">
            Freelance Projects
          </h2>
          <p className="text-xl text-muted-foreground">
            Find projects that match your skills
          </p>
        </div>

        {/* Projects List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover-elevate" data-testid={`card-project-${project.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="mb-2" data-testid={`text-project-title-${project.id}`}>
                        {project.title}
                      </CardTitle>
                      <CardDescription data-testid={`text-project-description-${project.id}`}>
                        {project.description}
                      </CardDescription>
                    </div>
                    <Badge className="flex-shrink-0" data-testid={`badge-status-${project.id}`}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs" data-testid={`badge-skill-${project.id}-${idx}`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-foreground" data-testid={`text-budget-${project.id}`}>
                        ${project.budget}
                      </span>
                      <span>Budget</span>
                    </div>
                    
                    {project.deadline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span data-testid={`text-deadline-${project.id}`}>
                          Due {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {project.bidCount !== undefined && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span data-testid={`text-bids-${project.id}`}>
                          {project.bidCount} proposals
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Posted by <span className="font-medium text-foreground">{project.recruiter.name}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild data-testid={`button-apply-${project.id}`}>
                    <Link href={`/project/${project.id}`}>
                      View & Apply
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground" data-testid="text-no-projects">
              No projects found. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
