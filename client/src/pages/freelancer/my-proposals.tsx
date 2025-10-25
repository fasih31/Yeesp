
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FreelancerMyProposals() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Proposals</h1>
        <p className="text-muted-foreground">Track your submitted proposals</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>E-commerce Website Development</CardTitle>
                  <CardDescription>Submitted 2 days ago</CardDescription>
                </div>
                <Badge variant="secondary">Under Review</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your proposal: $4,500 • 8 weeks delivery
              </p>
              <Button variant="outline" size="sm">View Proposal</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted">
          <p className="text-center text-muted-foreground py-8">No accepted proposals yet</p>
        </TabsContent>

        <TabsContent value="rejected">
          <p className="text-center text-muted-foreground py-8">No rejected proposals</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
