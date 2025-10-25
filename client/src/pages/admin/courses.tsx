
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminCourses() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Course Management</h1>
        <p className="text-muted-foreground">Review and manage courses</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Advanced React Patterns</CardTitle>
                  <p className="text-sm text-muted-foreground">by Dr. Sarah Johnson</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button>Approve</Button>
                <Button variant="outline">Review</Button>
                <Button variant="outline">Reject</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <p className="text-center text-muted-foreground py-8">Loading approved courses...</p>
        </TabsContent>

        <TabsContent value="rejected">
          <p className="text-center text-muted-foreground py-8">No rejected courses</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
