import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bell, Mail } from "lucide-react";

export default function ContentUpdates() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Content Updates & Broadcasts</h1>
        <p className="text-muted-foreground">Send announcements and notifications to users</p>
      </div>

      <div className="grid gap-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Create Broadcast Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select>
                <SelectTrigger id="audience">
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="tutors">Tutors Only</SelectItem>
                  <SelectItem value="freelancers">Freelancers Only</SelectItem>
                  <SelectItem value="recruiters">Recruiters Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message-type">Message Type</Label>
              <Select>
                <SelectTrigger id="message-type">
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="update">Platform Update</SelectItem>
                  <SelectItem value="maintenance">Maintenance Notice</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter broadcast title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter your message" 
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label>Delivery Method</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">In-App Notification</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline">Schedule</Button>
              <Button variant="outline">Save Draft</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Broadcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "New Course Categories Added", date: "2024-01-10", audience: "All Users" },
                { title: "Maintenance Scheduled", date: "2024-01-08", audience: "All Users" },
                { title: "Freelancer Commission Update", date: "2024-01-05", audience: "Freelancers" },
              ].map((broadcast, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{broadcast.title}</h3>
                    <p className="text-sm text-muted-foreground">{broadcast.audience} • {broadcast.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
