
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Assignments() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Assignments & Quizzes</h1>
        <p className="text-muted-foreground">Track and submit your assignments</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Web Development Final Project</CardTitle>
                  <CardDescription>Build a complete web application</CardDescription>
                </div>
                <Badge variant="destructive">
                  <Clock className="h-3 w-3 mr-1" />
                  Due in 3 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create a full-stack web application using React and Node.js with the following features...
              </p>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Upload your files</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit Assignment</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>React Hooks Quiz</CardTitle>
                  <CardDescription>Multiple choice assessment</CardDescription>
                </div>
                <Badge variant="secondary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Submitted
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Awaiting grading...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>JavaScript Basics Assignment</CardTitle>
                  <CardDescription>Functions and Arrays</CardDescription>
                </div>
                <Badge className="bg-green-500">95/100</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-2">Instructor Feedback:</p>
              <p className="text-sm text-muted-foreground">
                Excellent work! Your code is clean and well-structured. Minor improvement needed in error handling.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
