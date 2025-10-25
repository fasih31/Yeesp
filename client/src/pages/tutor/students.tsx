import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, MessageSquare, Users } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

export default function TutorStudents() {
  const [searchQuery, setSearchQuery] = useState("");

  // Get all enrollments for tutor's courses
  const { data: enrollments, isLoading } = useQuery({
    queryKey: ['/api/enrollments'],
  });

  // Group students by unique student IDs
  const students = enrollments?.reduce((acc: any[], enrollment: any) => {
    const existing = acc.find(s => s.id === enrollment.student.id);
    if (existing) {
      existing.courses.push(enrollment.course);
      existing.enrollmentCount++;
    } else {
      acc.push({
        ...enrollment.student,
        courses: [enrollment.course],
        enrollmentCount: 1,
        progress: enrollment.progress,
      });
    }
    return acc;
  }, []);

  const filteredStudents = students?.filter((student: any) => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Students</h1>
          <p className="text-lg text-muted-foreground">
            View and manage your student roster
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredStudents && filteredStudents.length > 0 ? (
          <div className="grid gap-4">
            {filteredStudents.map((student: any) => (
              <Card key={student.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {student.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold mb-1">{student.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{student.email}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Enrolled in {student.enrollmentCount} course{student.enrollmentCount > 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>Progress: {student.progress}%</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {student.courses.slice(0, 3).map((course: any) => (
                            <Badge key={course.id} variant="secondary">
                              {course.category}
                            </Badge>
                          ))}
                          {student.courses.length > 3 && (
                            <Badge variant="outline">
                              +{student.courses.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${student.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/messages?userId=${student.id}`}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="No students found"
            description={searchQuery ? "No students match your search" : "You don't have any students yet"}
          />
        )}
      </div>
    </div>
  );
}
