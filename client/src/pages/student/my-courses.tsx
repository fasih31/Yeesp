
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PlayCircle, CheckCircle } from "lucide-react";
import type { Enrollment, Course } from "@shared/schema";

type EnrollmentWithCourse = Enrollment & {
  course: Course;
};

export default function MyCourses() {
  const { data: enrollments } = useQuery<EnrollmentWithCourse[]>({
    queryKey: ["/api/enrollments/my"],
  });

  const inProgress = enrollments?.filter(e => !e.completed && (e.progress ?? 0) > 0);
  const notStarted = enrollments?.filter(e => (e.progress ?? 0) === 0);
  const completed = enrollments?.filter(e => e.completed);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/student">
            <h1 className="text-2xl font-bold">YEESP</h1>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/courses">Browse More Courses</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">My Courses</h1>

        <Tabs defaultValue="in-progress">
          <TabsList>
            <TabsTrigger value="in-progress">
              In Progress ({inProgress?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="not-started">
              Not Started ({notStarted?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completed?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="mt-6">
            <div className="grid gap-6">
              {inProgress && inProgress.length > 0 ? (
                inProgress.map((enrollment) => (
                  <Card key={enrollment.id} className="hover-elevate">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle>{enrollment.course.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {enrollment.course.description}
                          </CardDescription>
                        </div>
                        <Badge>{enrollment.progress}% Complete</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={enrollment.progress || 0} />
                      <div className="flex gap-2">
                        <Button asChild>
                          <Link href={`/student/course-player/${enrollment.courseId}`}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continue Learning
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/course/${enrollment.courseId}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No courses in progress</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="not-started" className="mt-6">
            <div className="grid gap-6">
              {notStarted && notStarted.length > 0 ? (
                notStarted.map((enrollment) => (
                  <Card key={enrollment.id}>
                    <CardHeader>
                      <CardTitle>{enrollment.course.title}</CardTitle>
                      <CardDescription>{enrollment.course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <Link href={`/student/course-player/${enrollment.courseId}`}>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Start Course
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No courses to start</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid gap-6">
              {completed && completed.length > 0 ? (
                completed.map((enrollment) => (
                  <Card key={enrollment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {enrollment.course.title}
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Completed on {new Date(enrollment.completedAt || '').toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/student/course-player/${enrollment.courseId}`}>
                          Review Course
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/certificates/${enrollment.courseId}`}>
                          View Certificate
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No completed courses yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
