import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, FileSpreadsheet, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { AdminSidebar } from "@/components/navigation/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export default function AdminReports() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [reportType, setReportType] = useState("courses");
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");

  const handleDownload = async (type: string, format: "csv" | "pdf") => {
    try {
      const params = new URLSearchParams({
        type,
        format,
        fromDate: dateRange.from.toISOString(),
        toDate: dateRange.to.toISOString(),
      });

      const response = await fetch(`/api/admin/reports/download?${params}`, {
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-report-${format}-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Report Downloaded",
        description: `${type} report has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const reportCards = [
    {
      title: "Courses Report",
      description: "All courses, enrollments, and completion rates",
      icon: FileText,
      type: "courses",
      stats: { total: 124, active: 98, completed: 26 },
    },
    {
      title: "Students Report",
      description: "Student registrations, activity, and progress",
      icon: FileText,
      type: "students",
      stats: { total: 1250, active: 980, inactive: 270 },
    },
    {
      title: "Tutors Report",
      description: "Tutor profiles, sessions, and earnings",
      icon: FileText,
      type: "tutors",
      stats: { total: 45, active: 38, topRated: 12 },
    },
    {
      title: "Classes Report",
      description: "Live sessions, attendance, and recordings",
      icon: FileText,
      type: "classes",
      stats: { total: 456, completed: 412, upcoming: 44 },
    },
    {
      title: "Billing Report",
      description: "Transactions, revenue, and payment analytics",
      icon: FileText,
      type: "billing",
      stats: { totalRevenue: "$48,250", thisMonth: "$12,450", pending: "$2,100" },
    },
    {
      title: "Freelance Projects",
      description: "Projects, bids, and contract analytics",
      icon: FileText,
      type: "projects",
      stats: { total: 89, active: 34, completed: 55 },
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="h-8 w-8" />
                Reports & Analytics
              </h1>
              <p className="text-muted-foreground">
                View and download comprehensive platform reports
              </p>
            </div>

            {/* Date Range Selector */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Report Settings</CardTitle>
                <CardDescription>Configure date range and export format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-4">
                          <p className="text-sm font-medium mb-2">Select date range</p>
                          <p className="text-xs text-muted-foreground">
                            Data will be filtered between these dates
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Export Format</label>
                    <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV (Excel)</SelectItem>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quick Range</label>
                    <Select
                      onValueChange={(value) => {
                        const today = new Date();
                        const ranges: any = {
                          "7d": 7,
                          "30d": 30,
                          "90d": 90,
                          "365d": 365,
                        };
                        if (ranges[value]) {
                          setDateRange({
                            from: new Date(today.setDate(today.getDate() - ranges[value])),
                            to: new Date(),
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                        <SelectItem value="90d">Last 90 Days</SelectItem>
                        <SelectItem value="365d">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportCards.map((report) => (
                <Card key={report.type} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <report.icon className="h-8 w-8 text-primary" />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(report.type, exportFormat)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <CardTitle className="mt-4">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(report.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Reports Tabs */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>View comprehensive data and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-bold">$48,250</p>
                          <p className="text-xs text-green-600">↑ 23% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Active Users</p>
                          <p className="text-2xl font-bold">1,063</p>
                          <p className="text-xs text-green-600">↑ 12% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Course Completions</p>
                          <p className="text-2xl font-bold">328</p>
                          <p className="text-xs text-green-600">↑ 8% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                          <p className="text-2xl font-bold">45 min</p>
                          <p className="text-xs text-red-600">↓ 3% from last month</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="revenue">
                    <p className="text-sm text-muted-foreground">Revenue analytics and trends will be displayed here.</p>
                  </TabsContent>

                  <TabsContent value="users">
                    <p className="text-sm text-muted-foreground">User demographics and activity will be displayed here.</p>
                  </TabsContent>

                  <TabsContent value="engagement">
                    <p className="text-sm text-muted-foreground">Engagement metrics and patterns will be displayed here.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
