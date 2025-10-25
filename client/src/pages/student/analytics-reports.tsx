
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, Download, TrendingUp, Clock, Target } from 'lucide-react';

export default function AnalyticsReports() {
  const [timeRange, setTimeRange] = useState('30');

  const exportReport = (format: 'csv' | 'pdf') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Learning Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your learning journey
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
          <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127.5h</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +15% from last period
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">87%</div>
                <p className="text-sm text-muted-foreground">Above average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8.5h</div>
                <p className="text-sm text-muted-foreground">Per week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Patterns</CardTitle>
              <CardDescription>Your most productive times and days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded">
                Heatmap: Most active hours and days (requires Chart.js)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Progress Timeline</CardTitle>
              <CardDescription>Track your progress across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded">
                Multi-line chart showing progress over time (requires Chart.js)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Investment Analysis</CardTitle>
              <CardDescription>How you spend your learning time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 flex items-center justify-center bg-muted rounded">
                  Pie chart: Time by course/category (requires Chart.js)
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Peak Learning Hours</h4>
                    <p className="text-2xl font-bold">6-9 PM</p>
                    <p className="text-sm text-muted-foreground">Most productive time</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Best Day</h4>
                    <p className="text-2xl font-bold">Saturday</p>
                    <p className="text-sm text-muted-foreground">Avg 3.2h study time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Development</CardTitle>
              <CardDescription>Track your skill progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['JavaScript', 'React', 'Python', 'Design'].map((skill) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill}</span>
                      <span className="text-muted-foreground">Intermediate</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '65%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weak Areas Identified</CardTitle>
              <CardDescription>Topics that need more attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Async JavaScript</p>
                    <p className="text-sm text-muted-foreground">Quiz accuracy: 62%</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">CSS Grid</p>
                    <p className="text-sm text-muted-foreground">Quiz accuracy: 58%</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Predictions</CardTitle>
              <CardDescription>Based on your learning patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                <h4 className="font-semibold mb-2">Completion Forecast</h4>
                <p className="text-sm">At your current pace, you'll complete:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• React Advanced Course: <strong>14 days</strong></li>
                  <li>• Python Data Science: <strong>28 days</strong></li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                <h4 className="font-semibold mb-2">At-Risk Alert</h4>
                <p className="text-sm">
                  Your study time decreased 23% this week. Consider reviewing your schedule.
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950">
                <h4 className="font-semibold mb-2">Recommended Next Steps</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Complete 2 more quizzes to solidify JavaScript fundamentals</li>
                  <li>• Review weak areas before starting advanced topics</li>
                  <li>• Join study group for collaborative learning</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
