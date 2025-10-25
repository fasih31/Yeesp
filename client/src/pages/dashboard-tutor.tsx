import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DollarSign, BookOpen, Users, Calendar, Plus, Edit } from "lucide-react";
import type { Course, Session, Payment } from "@shared/schema";

export default function TutorDashboard() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: sessions } = useQuery<Session[]>({
    queryKey: ["/api/sessions/my"],
  });

  const { data: payments } = useQuery<Payment[]>({
    queryKey: ["/api/payments/my"],
  });

  const myCourses = courses?.filter(c => true); // In real app, filter by instructorId
  const upcomingSessions = sessions?.filter(s => 
    s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
  );

  const stats = {
    totalCourses: myCourses?.length || 0,
    publishedCourses: myCourses?.filter(c => c.published).length || 0,
    totalSessions: sessions?.length || 0,
    earningsThisMonth: payments?.reduce((acc, p) => acc + parseFloat(p.netAmount || '0'), 0) || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">
            Tutor Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your courses, sessions, and earnings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-stat-courses">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-courses">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.publishedCourses} published
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-sessions">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-sessions">{stats.totalSessions}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-students">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-students">24</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-earnings">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings (This Month)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-earnings">
                ${stats.earningsThisMonth.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList data-testid="tabs-dashboard">
            <TabsTrigger value="courses" data-testid="tab-courses">My Courses</TabsTrigger>
            <TabsTrigger value="sessions" data-testid="tab-sessions">Sessions</TabsTrigger>
            <TabsTrigger value="students" data-testid="tab-students">Students</TabsTrigger>
            <TabsTrigger value="earnings" data-testid="tab-earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Courses</h2>
              <Button asChild data-testid="button-create-course">
                <Link href="/tutor/course/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Course
                </Link>
              </Button>
            </div>

            {myCourses && myCourses.length > 0 ? (
              <div className="grid gap-4">
                {myCourses.map((course) => (
                  <Card key={course.id} className="hover-elevate" data-testid={`card-course-${course.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle data-testid={`text-course-title-${course.id}`}>
                              {course.title}
                            </CardTitle>
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
                    <CardContent className="flex gap-2">
                      <Button variant="outline" asChild data-testid={`button-edit-${course.id}`}>
                        <Link href={`/tutor/course/${course.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Course
                        </Link>
                      </Button>
                      <Button variant="outline" asChild data-testid={`button-manage-${course.id}`}>
                        <Link href={`/tutor/course/${course.id}`}>
                          Manage Students
                        </Link>
                      </Button>
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
                    <Link href="/tutor/course/create">Create Your First Course</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Upcoming Sessions</h2>
              <Button asChild>
                <Link href="/tutor/availability">Manage Availability</Link>
              </Button>
            </div>

            {upcomingSessions && upcomingSessions.length > 0 ? (
              <div className="grid gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} data-testid={`card-session-${session.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle>{session.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {new Date(session.scheduledAt).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge>{session.duration} min</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      {session.meetingUrl && (
                        <Button asChild>
                          <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                            Start Session
                          </a>
                        </Button>
                      )}
                      <Button variant="outline">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No upcoming sessions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <h2 className="text-2xl font-semibold">Student Management</h2>
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Student management features coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <h2 className="text-2xl font-semibold">Earnings & Payouts</h2>
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments && payments.length > 0 ? (
                    payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="font-medium">{payment.entityType}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${payment.netAmount}</div>
                          <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No payment history yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
