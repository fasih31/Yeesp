
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, DollarSign, Clock } from "lucide-react";
import { Link } from "wouter";

export default function RecruiterMyProjects() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage your posted projects</p>
        </div>
        <Button asChild>
          <Link href="/recruiter/post-project">Post New Project</Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>E-commerce Website Development</CardTitle>
                  <CardDescription>Posted 5 days ago</CardDescription>
                </div>
                <Badge>Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>12 proposals</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span>$5,000 budget</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>2-3 months</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>View Proposals</Button>
                <Button variant="outline">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <p className="text-center text-muted-foreground py-8">No completed projects</p>
        </TabsContent>

        <TabsContent value="drafts">
          <p className="text-center text-muted-foreground py-8">No draft projects</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
