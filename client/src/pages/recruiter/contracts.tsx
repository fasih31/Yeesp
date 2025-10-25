import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download } from "lucide-react";
import type { Contract, User, Project } from "@shared/schema";

type ContractWithDetails = Contract & {
  freelancer: User;
  project: Project;
};

export default function RecruiterContracts() {
  const { data: contracts, isLoading } = useQuery<ContractWithDetails[]>({
    queryKey: ["/api/contracts"],
    queryFn: async () => {
      const response = await fetch("/api/contracts", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const active = contracts?.filter(c => c.status === "active");
  const completed = contracts?.filter(c => c.status === "completed");
  const pending = contracts?.filter(c => c.status === "pending");

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Contracts</h1>
        <p className="text-muted-foreground">Manage your freelancer contracts</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({active?.length || 0})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed?.length || 0})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">Loading contracts...</div>
          ) : active && active.length > 0 ? (
            active.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{contract.project?.title || "Contract"}</CardTitle>
                      <CardDescription>with {contract.freelancer?.name || "Freelancer"}</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Value</p>
                      <p className="font-medium">${contract.amount}</p>
                    </div>
                  </div>
                  {contract.terms && (
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Terms:</p>
                      <p className="line-clamp-3">{contract.terms}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/contract/${contract.id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Contract
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/contract/${contract.id}/milestones`}>
                        View Milestones
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No active contracts</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completed && completed.length > 0 ? (
            completed.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <CardTitle>{contract.project?.title || "Contract"}</CardTitle>
                  <CardDescription>
                    Completed {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "N/A"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Completed</Badge>
                    <span className="text-sm text-muted-foreground">
                      Total paid: ${contract.amount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No completed contracts</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pending && pending.length > 0 ? (
            pending.map((contract) => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{contract.project?.title || "Contract"}</CardTitle>
                      <CardDescription>with {contract.freelancer?.name || "Freelancer"}</CardDescription>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Awaiting freelancer signature
                  </p>
                  <Button variant="outline" size="sm">Resend Contract</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending contracts</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
