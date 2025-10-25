import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, DollarSign, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Bid, User, Project } from "@shared/schema";

type BidWithFreelancer = Bid & {
  freelancer: User;
  project?: Project;
};

export default function RecruiterProposals() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get all bids for recruiter's projects
  const { data: bids, isLoading } = useQuery<BidWithFreelancer[]>({
    queryKey: ["/api/bids"],
    queryFn: async () => {
      const response = await fetch("/api/bids", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const updateBidMutation = useMutation({
    mutationFn: async ({ bidId, status }: { bidId: string; status: string }) => {
      return apiRequest(`/bids/${bidId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: (_, variables) => {
      toast({
        title: variables.status === "accepted" ? "Proposal Accepted" : "Proposal Declined",
        description: `The proposal has been ${variables.status}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bids"] });
    },
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Proposals</h1>
        <p className="text-muted-foreground">Review freelancer proposals</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading proposals...</div>
      ) : bids && bids.length > 0 ? (
        <div className="space-y-4">
          {bids.map((bid) => (
            <Card key={bid.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {bid.freelancer?.name?.charAt(0) || "F"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle>{bid.freelancer?.name || "Freelancer"}</CardTitle>
                    <CardDescription>{bid.freelancer?.bio || "Professional freelancer"}</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">Rating available soon</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${bid.amount}</p>
                    <p className="text-sm text-muted-foreground">Fixed price</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Proposal:</p>
                  <p className="text-sm text-muted-foreground">
                    {bid.proposal}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{bid.timeline || "Timeline not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Submitted {new Date(bid.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {bid.status === "pending" ? (
                    <>
                      <Button
                        onClick={() => updateBidMutation.mutate({ bidId: bid.id, status: "accepted" })}
                        disabled={updateBidMutation.isPending}
                      >
                        Accept Proposal
                      </Button>
                      <Button variant="outline">Message</Button>
                      <Button
                        variant="outline"
                        onClick={() => updateBidMutation.mutate({ bidId: bid.id, status: "rejected" })}
                        disabled={updateBidMutation.isPending}
                      >
                        Decline
                      </Button>
                    </>
                  ) : (
                    <Badge variant={bid.status === "accepted" ? "default" : "destructive"}>
                      {bid.status}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No proposals received yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
