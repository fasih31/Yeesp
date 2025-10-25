import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Submission, Assignment } from "@shared/schema";

type SubmissionWithAssignment = Submission & {
  assignment: Assignment;
};

export default function TutorAssignments() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  // Fetch all submissions for tutor's courses
  const { data: submissions, isLoading } = useQuery<SubmissionWithAssignment[]>({
    queryKey: ["/api/submissions"],
    queryFn: async () => {
      // TODO: Filter by tutor's courses
      return [];
    },
  });

  const gradeMutation = useMutation({
    mutationFn: async ({ submissionId, grade, feedback }: { submissionId: string; grade: number; feedback: string }) => {
      return apiRequest(`/submissions/${submissionId}/grade`, {
        method: "PATCH",
        body: JSON.stringify({ grade, feedback }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Graded Successfully",
        description: "The assignment has been graded.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });
      setSelectedSubmission(null);
      setGrade("");
      setFeedback("");
    },
  });

  const pending = submissions?.filter(s => s.status === "submitted");
  const graded = submissions?.filter(s => s.status === "graded");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Assignment Reviews</h1>
          <p className="text-lg text-muted-foreground">
            Review and grade student submissions
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Review ({pending?.length || 0})</TabsTrigger>
            <TabsTrigger value="graded">Graded ({graded?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">Loading submissions...</div>
            ) : pending && pending.length > 0 ? (
              pending.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{submission.assignment?.title || "Assignment"}</CardTitle>
                        <CardDescription>
                          Submitted {new Date(submission.submittedAt || '').toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Submission:</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.content}
                      </p>
                      {submission.attachmentUrl && (
                        <a
                          href={submission.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline mt-2 inline-block"
                        >
                          View Attachment
                        </a>
                      )}
                    </div>
                    {selectedSubmission === submission.id ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="grade">Grade (out of {submission.assignment?.totalPoints || 100})</Label>
                          <Input
                            id="grade"
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            placeholder="85"
                            max={submission.assignment?.totalPoints || 100}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="feedback">Feedback</Label>
                          <Textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Provide detailed feedback..."
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => gradeMutation.mutate({
                              submissionId: submission.id,
                              grade: parseInt(grade),
                              feedback,
                            })}
                            disabled={!grade || !feedback || gradeMutation.isPending}
                          >
                            {gradeMutation.isPending ? "Submitting..." : "Submit Grade"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(null);
                              setGrade("");
                              setFeedback("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setSelectedSubmission(submission.id)}>
                        Grade Assignment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending submissions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="graded" className="space-y-4">
            {graded && graded.length > 0 ? (
              graded.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <CardTitle>{submission.assignment?.title || "Assignment"}</CardTitle>
                    <CardDescription>
                      Graded on {new Date(submission.gradedAt || '').toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <Badge>Grade: {submission.grade}/{submission.assignment?.totalPoints || 100}</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Feedback:</p>
                        <p className="text-sm text-muted-foreground">{submission.feedback}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No graded assignments</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
