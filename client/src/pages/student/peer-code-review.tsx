
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Code, MessageSquare, ThumbsUp, GitPullRequest } from 'lucide-react';

export default function PeerCodeReview() {
  const reviewRequests = [
    {
      id: 1,
      student: 'John Doe',
      project: 'React Todo App',
      language: 'JavaScript',
      status: 'pending',
      requestedAt: '2 hours ago',
    },
    {
      id: 2,
      student: 'Jane Smith',
      project: 'Python Data Analysis',
      language: 'Python',
      status: 'in_review',
      requestedAt: '1 day ago',
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Peer Code Review</h1>
        <p className="text-muted-foreground">
          Share your code and get feedback from peers
        </p>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">Review Requests</TabsTrigger>
          <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="give-feedback">Give Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Code Review</CardTitle>
              <CardDescription>
                Submit your code for peer review and improve your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <GitPullRequest className="h-4 w-4 mr-2" />
                New Review Request
              </Button>
            </CardContent>
          </Card>

          {reviewRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{request.student[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{request.project}</CardTitle>
                      <CardDescription>
                        by {request.student} • {request.requestedAt}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline">
                    <Code className="h-3 w-3 mr-1" />
                    {request.language}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">View Code</Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="my-reviews">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                You haven't submitted any code for review yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="give-feedback">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                Help your peers by reviewing their code
              </p>
              <Button>Browse Available Reviews</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
