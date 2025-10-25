import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Filter } from "lucide-react";

export default function AuditLogs() {
  const logs = [
    { id: 1, timestamp: "2024-01-12 14:30:22", admin: "Admin 1", action: "User Suspended", target: "user@example.com", severity: "high" },
    { id: 2, timestamp: "2024-01-12 13:15:10", admin: "Admin 2", action: "Course Approved", target: "Web Development 101", severity: "medium" },
    { id: 3, timestamp: "2024-01-12 11:45:33", admin: "Admin 1", action: "Payment Processed", target: "Invoice #12345", severity: "medium" },
    { id: 4, timestamp: "2024-01-12 10:20:15", admin: "Admin 3", action: "KYC Approved", target: "John Doe", severity: "low" },
    { id: 5, timestamp: "2024-01-11 16:55:42", admin: "Admin 1", action: "Settings Changed", target: "Platform Fees", severity: "high" },
    { id: 6, timestamp: "2024-01-11 15:30:18", admin: "Admin 2", action: "Broadcast Sent", target: "All Users", severity: "low" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Audit Logs</h1>
          <p className="text-muted-foreground">Track all critical admin actions</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs by admin, action, or target..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{log.timestamp}</span>
                    <Badge variant={getSeverityColor(log.severity)}>{log.severity}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{log.admin}</span>
                    <span className="text-muted-foreground">•</span>
                    <span>{log.action}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{log.target}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
