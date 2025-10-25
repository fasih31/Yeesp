import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, TrendingUp, Clock, Calendar, Search } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function TutorAttendance() {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get attendance statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/tutors', user?.id, 'attendance-stats'],
    enabled: !!user?.id,
  });

  // Get detailed attendance for all sessions
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['/api/sessions', 'tutor', user?.id],
    enabled: !!user?.id,
  });

  const filteredSessions = sessions?.filter((session: any) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.student?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'success' | 'destructive' | 'secondary'> = {
      present: 'success',
      absent: 'destructive',
      late: 'secondary',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard/tutor">
            <h1 className="text-2xl font-bold">YEESP</h1>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/tutor/sessions">Back to Sessions</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Attendance Tracking</h1>
          <p className="text-muted-foreground">
            Monitor student attendance and participation
          </p>
        </div>

        {/* Statistics Cards */}
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <LoadingSpinner size="sm" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalSessions}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  All time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalAttendees}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all sessions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.avgAttendanceRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Average across all sessions
                </p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by session title or student name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Session Attendance</CardTitle>
            <CardDescription>
              Detailed attendance records for all your tutoring sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sessionsLoading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredSessions && filteredSessions.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session Title</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session: any) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.title}</TableCell>
                        <TableCell>{session.student?.name || 'N/A'}</TableCell>
                        <TableCell>
                          {format(new Date(session.scheduledAt), 'MMM d, yyyy h:mm a')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            session.status === 'completed' ? 'success' :
                            session.status === 'in_progress' ? 'default' :
                            session.status === 'cancelled' ? 'destructive' :
                            'secondary'
                          }>
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {session.duration ? `${session.duration}m` : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link href={`/api/sessions/${session.id}/attendance`}>
                              View Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No sessions found"
                description="No sessions match your search criteria"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
