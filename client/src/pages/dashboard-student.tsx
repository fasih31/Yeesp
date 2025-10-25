import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Award, TrendingUp, Calendar } from "lucide-react";
import type { Enrollment, Course, Session, Certificate } from "@shared/schema";

export default function StudentDashboard() {
  const { data: enrollments } = useQuery<(Enrollment & { course: Course })[]>({
    queryKey: ["/api/enrollments/my"],
  });

  const { data: sessions } = useQuery<Session[]>({
    queryKey: ["/api/sessions/my"],
  });

  const { data: certificates } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates/my"],
  });

  const stats = {
    enrolled: enrollments?.length || 0,
    completed: enrollments?.filter((e) => e.completed).length || 0,
    hoursLearned: Math.floor((enrollments?.reduce((acc, e) => acc + (e.progress || 0), 0) || 0) / 10),
    certificates: certificates?.length || 0,
  };

  const upcomingSessions = sessions?.filter((s) => 
    s.status === 'scheduled' && new Date(s.scheduledAt) > new Date()
  ).slice(0, 3);

  const inProgressCourses = enrollments?.filter((e) => !e.completed && e.progress > 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-dashboard-title">
            Student Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your learning progress and achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="card-stat-enrolled">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-enrolled">{stats.enrolled}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-completed">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-completed">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-hours">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-hours">{stats.hoursLearned}</div>
            </CardContent>
          </Card>

          <Card data-testid="card-stat-certificates">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-testid="text-stat-certificates">{stats.certificates}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList data-testid="tabs-dashboard">
            <TabsTrigger value="courses" data-testid="tab-courses">My Courses</TabsTrigger>
            <TabsTrigger value="sessions" data-testid="tab-sessions">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="certificates" data-testid="tab-certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Courses in Progress</h2>
              <Button asChild data-testid="button-browse-courses">
                <Link href="/courses">Browse More Courses</Link>
              </Button>
            </div>

            {inProgressCourses && inProgressCourses.length > 0 ? (
              <div className="grid gap-4">
                {inProgressCourses.map((enrollment) => (
                  <Card key={enrollment.id} className="hover-elevate" data-testid={`card-course-${enrollment.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle data-testid={`text-course-title-${enrollment.id}`}>
                            {enrollment.course.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {enrollment.course.description}
                          </CardDescription>
                        </div>
                        <Badge data-testid={`badge-progress-${enrollment.id}`}>
                          {enrollment.progress}% Complete
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={enrollment.progress || 0} data-testid={`progress-bar-${enrollment.id}`} />
                      <Button className="w-full" asChild data-testid={`button-continue-${enrollment.id}`}>
                        <Link href={`/learn/${enrollment.courseId}`}>
                          Continue Learning
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4" data-testid="text-no-courses">
                    You haven't enrolled in any courses yet
                  </p>
                  <Button asChild data-testid="button-explore-courses">
                    <Link href="/courses">Explore Courses</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Upcoming Tutoring Sessions</h2>
              <Button asChild data-testid="button-find-tutors">
                <Link href="/tutors">Find Tutors</Link>
              </Button>
            </div>

            {upcomingSessions && upcomingSessions.length > 0 ? (
              <div className="grid gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} data-testid={`card-session-${session.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle data-testid={`text-session-title-${session.id}`}>
                            {session.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(session.scheduledAt).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" data-testid={`badge-duration-${session.id}`}>
                          {session.duration} min
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {session.meetingUrl && (
                        <Button asChild data-testid={`button-join-${session.id}`}>
                          <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer">
                            Join Session
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4" data-testid="text-no-sessions">
                    No upcoming sessions
                  </p>
                  <Button asChild data-testid="button-book-session">
                    <Link href="/tutors">Book a Session</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Certificates</h2>

            {certificates && certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="hover-elevate" data-testid={`card-certificate-${cert.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-center h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4">
                        <Award className="h-16 w-16 text-primary" />
                      </div>
                      <CardTitle className="text-center" data-testid={`text-certificate-${cert.id}`}>
                        Course Completion Certificate
                      </CardTitle>
                      <CardDescription className="text-center">
                        Issued on {new Date(cert.issuedAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {cert.certificateUrl && (
                        <Button variant="outline" className="w-full" asChild data-testid={`button-download-${cert.id}`}>
                          <a href={cert.certificateUrl} download>
                            Download Certificate
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground" data-testid="text-no-certificates">
                    Complete courses to earn certificates
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
