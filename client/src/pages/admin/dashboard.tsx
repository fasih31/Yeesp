import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, Briefcase, AlertCircle, DollarSign, MessageSquare, TrendingUp, Settings } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  // Fetch all statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
  });

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-500", link: "/admin/users" },
    { title: "Total Courses", value: stats?.totalCourses || 0, icon: BookOpen, color: "text-green-500", link: "/admin/courses" },
    { title: "Total Projects", value: stats?.totalProjects || 0, icon: Briefcase, color: "text-purple-500", link: "/admin/projects" },
    { title: "Pending KYC", value: stats?.pendingKYC || 0, icon: AlertCircle, color: "text-orange-500", link: "/admin/kyc" },
    { title: "Open Disputes", value: stats?.openDisputes || 0, icon: MessageSquare, color: "text-red-500", link: "/admin/disputes" },
    { title: "Platform Revenue", value: `$${stats?.revenue || 0}`, icon: DollarSign, color: "text-emerald-500", link: "/admin/revenue" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Complete platform management and control center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href={stat.link}>View details →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks and platform management</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/admin/users">
                    <Users className="h-6 w-6" />
                    <span>Manage Users</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/admin/courses">
                    <BookOpen className="h-6 w-6" />
                    <span>Manage Courses</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/admin/projects">
                    <Briefcase className="h-6 w-6" />
                    <span>Manage Projects</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/admin/kyc">
                    <AlertCircle className="h-6 w-6" />
                    <span>Review KYC</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/admin/disputes">
                    <MessageSquare className="h-6 w-6" />
                    <span>Resolve Disputes</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link href="/admin/support">
                    <MessageSquare className="h-6 w-6" />
                    <span>Support Tickets</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.recentActivities?.slice(0, 5).map((activity: any) => (
                      <div key={activity.id} className="flex items-start gap-3 text-sm">
                        <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{new Date(activity.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    )) || (
                      <p className="text-sm text-muted-foreground">No recent activities</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Platform status and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <span className="text-sm font-medium text-green-500">● Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Status</span>
                      <span className="text-sm font-medium text-green-500">● Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Storage</span>
                      <span className="text-sm font-medium text-green-500">● Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Sessions</span>
                      <span className="text-sm font-medium">{stats?.activeSessions || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all platform users - students, tutors, freelancers, recruiters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Control user accounts, verify identities, manage roles, and monitor user activity.</p>
                <Button asChild>
                  <Link href="/admin/users">Go to User Management →</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Moderate and manage all platform content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Review, approve, or remove courses and projects. Monitor content quality.</p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/admin/courses">Manage Courses</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/admin/projects">Manage Projects</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Support & Moderation</CardTitle>
                <CardDescription>Handle support tickets, disputes, and KYC verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Respond to user support requests, resolve payment disputes, and verify user identities.</p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/admin/support">Support Tickets</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/admin/disputes">Disputes</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/admin/kyc">KYC Verification</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform parameters and system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Manage platform fees, payment settings, email templates, and system configuration.</p>
                <Button asChild>
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Go to Settings →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
