
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Calendar, Briefcase, User } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Project, User as UserType, Bid } from "@shared/schema";

type ProjectWithDetails = Project & {
  recruiter: UserType;
  bids?: (Bid & { freelancer: UserType })[];
};

const bidSchema = z.object({
  bidAmount: z.string().min(1, "Bid amount is required"),
  proposal: z.string().min(50, "Proposal must be at least 50 characters"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
});

type BidForm = z.infer<typeof bidSchema>;

export default function ProjectDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showBidForm, setShowBidForm] = useState(false);

  const { data: project, isLoading } = useQuery<ProjectWithDetails>({
    queryKey: [`/api/projects/${id}`],
  });

  const form = useForm<BidForm>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      bidAmount: "",
      proposal: "",
      deliveryTime: "",
    },
  });

  const bidMutation = useMutation({
    mutationFn: async (data: BidForm) => {
      return await apiRequest(`/api/projects/${id}/bids`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Proposal submitted!",
        description: "The recruiter will review your proposal.",
      });
      setShowBidForm(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}`] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: BidForm) => {
    bidMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold">YEESP</h1>
          </Link>
          <Button asChild variant="outline">
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{project.status}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

              <div className="flex items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">${project.budget}</span>
                </div>
                {project.deadline && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{project.bids?.length || 0} proposals</span>
                </div>
              </div>

              {project.skills && project.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={project.recruiter.avatar || undefined} />
                  <AvatarFallback>{project.recruiter.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">Posted by</div>
                  <div className="font-medium">{project.recruiter.name}</div>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Strong communication skills</li>
                    <li>Proven track record in similar projects</li>
                    <li>Ability to meet deadlines</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {project.bids && project.bids.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Proposals ({project.bids.length})</CardTitle>
                  <CardDescription>Freelancers who have applied to this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.bids.map((bid) => (
                      <div key={bid.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={bid.freelancer.avatar || undefined} />
                              <AvatarFallback>{bid.freelancer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{bid.freelancer.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Bid: ${bid.bidAmount}
                              </div>
                            </div>
                          </div>
                          <Badge variant={bid.status === 'accepted' ? 'default' : 'secondary'}>
                            {bid.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{bid.proposal}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Apply for this Project</CardTitle>
                <CardDescription>Submit your proposal to the recruiter</CardDescription>
              </CardHeader>
              <CardContent>
                {!showBidForm ? (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowBidForm(true)}
                  >
                    Submit Proposal
                  </Button>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bidAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Bid Amount ($)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deliveryTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Time (days)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="14" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="proposal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Proposal</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Explain why you're the best fit for this project..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={bidMutation.isPending}
                        >
                          {bidMutation.isPending ? "Submitting..." : "Submit"}
                        </Button>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setShowBidForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
