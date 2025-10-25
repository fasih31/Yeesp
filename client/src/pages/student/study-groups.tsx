
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus } from "lucide-react";

export default function StudyGroups() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Study Groups</h1>
          <p className="text-muted-foreground">Learn together with peers</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Create Group</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>React Study Group</CardTitle>
                  <CardDescription>Web Development Fundamentals</CardDescription>
                </div>
                <Badge>8 members</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4].map((j) => (
                  <Avatar key={j} className="h-8 w-8">
                    <AvatarFallback>U{j}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Join Group</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
