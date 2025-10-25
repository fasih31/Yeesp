import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Assignment, Submission } from "@shared/schema";

type AssignmentWithSubmission = Assignment & {
  submission?: Submission;
};

export default function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [submissionContent, setSubmissionContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all assignments (would be filtered by enrolled courses in real app)
  const { data: assignments, isLoading } = useQuery<AssignmentWithSubmission[]>({
    queryKey: ["/api/assignments"],
    queryFn: async () => {
      // In real app, this would get assignments from user's enrolled courses
      const data = await apiRequest<Assignment[]>("/assignments");
      return data;
    },
  });

  // Submit assignment mutation
  const submitMutation = useMutation({
    mutationFn: async ({ assignmentId, content }: { assignmentId: string; content: string }) => {
      return apiRequest("/submissions", {
        method: "POST",
        body: JSON.stringify({
          assignmentId,
          studentId: "student-id", // Get from auth context
          content,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Assignment Submitted",
        description: "Your assignment has been submitted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/assignments"] });
      setSelectedAssignment(null);
      setSubmissionContent("");
    },
  });

  const pending = assignments?.filter(a => !a.submission);
  const submitted = assignments?.filter(a => a.submission && a.submission.status === 'submitted');
  const graded = assignments?.filter(a => a.submission && a.submission.status === 'graded');

  const formatDueDate = (dueDate: Date) => {
    const now = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due today";
    if (daysLeft === 1) return "Due tomorrow";
    return `Due in ${daysLeft} days`;
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Assignments & Quizzes</h1>
        <p className="text-muted-foreground">Track and submit your assignments</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pending?.length || 0})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submitted?.length || 0})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({graded?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {isLoading ? (
            <Card><CardContent className="py-12 text-center">Loading...</CardContent></Card>
          ) : pending && pending.length > 0 ? (
            pending.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.description}</CardDescription>
                    </div>
                    <Badge variant="destructive">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDueDate(assignment.dueDate)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Total Points: {assignment.totalPoints}
                  </p>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedAssignment(assignment.id)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                        <DialogDescription>{assignment.title}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Enter your submission content or paste link to your work..."
                          value={submissionContent}
                          onChange={(e) => setSubmissionContent(e.target.value)}
                          rows={8}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => submitMutation.mutate({ 
                            assignmentId: assignment.id, 
                            content: submissionContent 
                          })}
                          disabled={!submissionContent || submitMutation.isPending}
                        >
                          {submitMutation.isPending ? "Submitting..." : "Submit"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No pending assignments</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submitted && submitted.length > 0 ? (
            submitted.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Submitted
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Awaiting grading...</p>
                  <p className="text-sm mt-2">
                    <strong>Your Submission:</strong> {assignment.submission?.content}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No submitted assignments</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          {graded && graded.length > 0 ? (
            graded.map((assignment) => (
              <Card key={assignment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>{assignment.description}</CardDescription>
                    </div>
                    <Badge className="bg-green-500">
                      {assignment.submission?.grade}/{assignment.totalPoints}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Your Submission:</p>
                    <p className="text-sm text-muted-foreground">{assignment.submission?.content}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Instructor Feedback:</p>
                    <p className="text-sm text-muted-foreground">{assignment.submission?.feedback || "No feedback provided"}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No graded assignments yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
