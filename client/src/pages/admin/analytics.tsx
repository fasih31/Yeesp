import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, Briefcase, DollarSign, TrendingUp, Award } from "lucide-react";
import type { User, Course, Project, Payment, Enrollment } from "@shared/schema";

export default function AdminAnalytics() {
  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: payments } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments"],
  });

  // Calculate statistics
  const totalUsers = users?.length || 0;
  const totalStudents = users?.filter(u => u.role === "student").length || 0;
  const totalTutors = users?.filter(u => u.role === "tutor").length || 0;
  const totalFreelancers = users?.filter(u => u.role === "freelancer").length || 0;
  const totalRecruiters = users?.filter(u => u.role === "recruiter").length || 0;

  const totalCourses = courses?.length || 0;
  const publishedCourses = courses?.filter(c => c.published).length || 0;
  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter(p => p.status === "open").length || 0;

  const totalRevenue = payments?.reduce((sum, p) => sum + parseFloat(String(p.amount)), 0) || 0;
  const totalEnrollments = enrollments?.length || 0;
  const completedCourses = enrollments?.filter(e => e.progress === 100).length || 0;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Platform performance metrics and insights</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses & Projects</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Platform members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publishedCourses}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalCourses - publishedCourses} drafts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalProjects} total projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All-time earnings
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollments Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{totalEnrollments}</p>
                        <p className="text-sm text-muted-foreground">Total Enrollments</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">{completedCourses}</p>
                        <p className="text-sm text-muted-foreground">Courses Completed</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Completion Rate</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${totalEnrollments > 0 ? (completedCourses / totalEnrollments * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {totalEnrollments > 0 ? ((completedCourses / totalEnrollments) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">New registrations</p>
                      <p className="text-muted-foreground">
                        {users?.filter(u => {
                          const created = new Date(u.createdAt);
                          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                          return created > weekAgo;
                        }).length || 0} this week
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium">Courses published</p>
                      <p className="text-muted-foreground">{publishedCourses} live courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <div className="flex-1">
                      <p className="font-medium">Active projects</p>
                      <p className="text-muted-foreground">{activeProjects} hiring now</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalStudents / totalUsers) * 100 || 0).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tutors</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTutors}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalTutors / totalUsers) * 100 || 0).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Freelancers</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFreelancers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalFreelancers / totalUsers) * 100 || 0).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recruiters</CardTitle>
                <Users className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRecruiters}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalRecruiters / totalUsers) * 100 || 0).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { role: "Students", count: totalStudents, color: "bg-blue-500" },
                  { role: "Tutors", count: totalTutors, color: "bg-green-500" },
                  { role: "Freelancers", count: totalFreelancers, color: "bg-purple-500" },
                  { role: "Recruiters", count: totalRecruiters, color: "bg-orange-500" },
                ].map(({ role, count, color }) => (
                  <div key={role}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{role}</span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${color} h-2 rounded-full`}
                        style={{ width: `${(count / totalUsers) * 100 || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Courses</span>
                  <span className="font-semibold">{totalCourses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Published</span>
                  <span className="font-semibold">{publishedCourses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Drafts</span>
                  <span className="font-semibold">{totalCourses - publishedCourses}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Projects</span>
                  <span className="font-semibold">{totalProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open</span>
                  <span className="font-semibold">{activeProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold">
                    {projects?.filter(p => p.status === "completed").length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Enrollments</span>
                  <span className="font-semibold">{totalEnrollments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg per Course</span>
                  <span className="font-semibold">
                    {publishedCourses > 0 ? (totalEnrollments / publishedCourses).toFixed(1) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold">
                    {totalEnrollments > 0 ? ((completedCourses / totalEnrollments) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">All-time earnings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{payments?.length || 0}</div>
                <p className="text-sm text-muted-foreground mt-2">Payment records</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${payments && payments.length > 0 ? (totalRevenue / payments.length).toFixed(2) : "0.00"}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Per transaction</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    status: "Completed",
                    count: payments?.filter(p => p.status === "completed").length || 0,
                    color: "bg-green-500"
                  },
                  {
                    status: "Pending",
                    count: payments?.filter(p => p.status === "pending").length || 0,
                    color: "bg-yellow-500"
                  },
                  {
                    status: "Failed",
                    count: payments?.filter(p => p.status === "failed").length || 0,
                    color: "bg-red-500"
                  },
                ].map(({ status, count, color }) => (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{status}</span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${color} h-2 rounded-full`}
                        style={{
                          width: `${payments && payments.length > 0 ? (count / payments.length) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
