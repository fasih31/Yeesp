import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface UserActivityChartProps {
  data: Array<{
    day: string;
    students: number;
    tutors: number;
    freelancers: number;
  }>;
}

export function UserActivityChart({ data }: UserActivityChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>
          Active users by role over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#0ea5e9" name="Students" />
            <Bar dataKey="tutors" fill="#8b5cf6" name="Tutors" />
            <Bar dataKey="freelancers" fill="#10b981" name="Freelancers" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
