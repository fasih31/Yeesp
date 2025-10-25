import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, DollarSign } from "lucide-react";
import type { Contract, Project, Milestone } from "@shared/schema";

type ContractWithDetails = Contract & {
  project: Project;
  milestones?: Milestone[];
};

export default function FreelancerActiveProjects() {
  const { data: contracts, isLoading } = useQuery<ContractWithDetails[]>({
    queryKey: ["/api/contracts"],
    queryFn: async () => {
      const response = await fetch("/api/contracts", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const activeContracts = contracts?.filter(c => c.status === "active");

  const calculateProgress = (contract: ContractWithDetails) => {
    if (!contract.milestones || contract.milestones.length === 0) return 0;
    const completed = contract.milestones.filter(m => m.status === "completed").length;
    return (completed / contract.milestones.length) * 100;
  };

  const getDaysRemaining = (endDate: Date | string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Active Projects</h1>
        <p className="text-muted-foreground">Manage your ongoing work</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : activeContracts && activeContracts.length > 0 ? (
        <div className="space-y-4">
          {activeContracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{contract.project?.title || "Project"}</CardTitle>
                    <CardDescription>Contract #{contract.id.slice(0, 8)}</CardDescription>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span>Progress</span>
                    <span>{calculateProgress(contract).toFixed(0)}%</span>
                  </div>
                  <Progress value={calculateProgress(contract)} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${contract.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {contract.endDate
                        ? `Due in ${getDaysRemaining(contract.endDate)} days`
                        : "No deadline"}
                    </span>
                  </div>
                </div>
                {contract.terms && (
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Terms:</p>
                    <p className="line-clamp-2">{contract.terms}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={`/freelancer/contract/${contract.id}`}>
                      View Contract Details
                    </Link>
                  </Button>
                  <Button variant="outline">Message Client</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No active projects</p>
            <Button asChild>
              <Link href="/freelancer/browse-jobs">Browse Available Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
