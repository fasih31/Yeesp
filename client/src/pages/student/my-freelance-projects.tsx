
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";

export default function MyFreelanceProjects() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Freelance Projects</h1>
          <p className="text-lg text-muted-foreground">
            Track your applications and active projects
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Build E-commerce Website</CardTitle>
                    <CardDescription>TechCorp Inc.</CardDescription>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>$2,500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Due in 15 days</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>View Details</Button>
                  <Button variant="outline">Submit Deliverable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applied" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Development</CardTitle>
                <CardDescription>Applied 2 days ago</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Under Review</Badge>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Website Redesign</CardTitle>
                    <CardDescription>Completed on Jan 15, 2024</CardDescription>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
