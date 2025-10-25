
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Calendar, MessageSquare, Video, BookOpen } from "lucide-react";

export default function StudyGroups() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const studyGroups = [
    {
      id: 1,
      name: "React Mastery Group",
      course: "Web Development Fundamentals",
      members: 8,
      maxMembers: 12,
      nextSession: "Tomorrow, 3:00 PM",
      description: "Weekly sessions to master React concepts together",
      isJoined: false,
    },
    {
      id: 2,
      name: "Python Data Science",
      course: "Data Science with Python",
      members: 15,
      maxMembers: 20,
      nextSession: "Friday, 6:00 PM",
      description: "Collaborative learning for data science enthusiasts",
      isJoined: true,
    },
    {
      id: 3,
      name: "JavaScript Beginners",
      course: "JavaScript Fundamentals",
      members: 6,
      maxMembers: 10,
      nextSession: "Saturday, 10:00 AM",
      description: "Help each other learn JS basics",
      isJoined: false,
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Study Groups</h1>
          <p className="text-muted-foreground">Learn together with peers</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Study Group</DialogTitle>
              <DialogDescription>
                Start a collaborative learning group for your course
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name</Label>
                <Input id="group-name" placeholder="e.g., React Advanced Learners" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React Fundamentals</SelectItem>
                    <SelectItem value="python">Python for Beginners</SelectItem>
                    <SelectItem value="javascript">JavaScript Mastery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-members">Maximum Members</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 members</SelectItem>
                    <SelectItem value="10">10 members</SelectItem>
                    <SelectItem value="15">15 members</SelectItem>
                    <SelectItem value="20">20 members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What will your group focus on?"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-schedule">Meeting Schedule</Label>
                <Input
                  id="meeting-schedule"
                  placeholder="e.g., Every Tuesday at 7 PM"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyGroups.map((group) => (
              <Card key={group.id} className="hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                    </div>
                    <Badge variant={group.isJoined ? "default" : "secondary"}>
                      {group.members}/{group.maxMembers} members
                    </Badge>
                  </div>
                  <CardDescription>{group.course}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{group.description}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Next session: {group.nextSession}</span>
                  </div>

                  {group.isJoined ? (
                    <div className="grid grid-cols-3 gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4 mr-1" />
                        Join Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Resources
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full">Join Group</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyGroups
              .filter((g) => g.isJoined)
              .map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.course}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Next: {group.nextSession}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                We'll recommend groups based on your courses and interests
              </p>
              <Button variant="outline">Refresh Recommendations</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
