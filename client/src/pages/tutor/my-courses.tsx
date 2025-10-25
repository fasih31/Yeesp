
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Users, Eye } from "lucide-react";

export default function TutorMyCourses() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Courses</h1>
            <p className="text-lg text-muted-foreground">
              Manage your course catalog
            </p>
          </div>
          <Button asChild>
            <Link href="/tutor/course/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>Web Development Fundamentals</CardTitle>
                    <Badge>Published</Badge>
                  </div>
                  <CardDescription>
                    Learn the basics of HTML, CSS, and JavaScript
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>245 students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>1,230 views</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
                <Button variant="outline" size="sm">View Students</Button>
                <Button variant="outline" size="sm">Analytics</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>Advanced React Patterns</CardTitle>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <CardDescription>
                    Master advanced React concepts and patterns
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                <span>0 students • Not published</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Continue Editing
                </Button>
                <Button variant="outline" size="sm">Publish</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
