import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Users, Eye } from "lucide-react";
import type { Course } from "@shared/schema";

export default function TutorMyCourses() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    },
  });

  // In real app, filter by current tutor's ID
  const myCourses = courses; // TODO: filter by instructorId

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
            <Link href="/tutor/create-course">
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : myCourses && myCourses.length > 0 ? (
          <div className="grid gap-6">
            {myCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>{course.title}</CardTitle>
                        <Badge variant={course.published ? "default" : "secondary"}>
                          {course.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {course.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${course.price}</div>
                      <div className="text-sm text-muted-foreground">{course.level}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{course.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{course.duration} hours</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/tutor/course/${course.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Course
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">View Students</Button>
                    <Button variant="outline" size="sm">Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't created any courses yet
              </p>
              <Button asChild>
                <Link href="/tutor/create-course">Create Your First Course</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
