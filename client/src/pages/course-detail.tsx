
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, BookOpen, Award, Users } from "lucide-react";
import type { Course, User } from "@shared/schema";

type CourseWithInstructor = Course & {
  instructor: User;
  avgRating?: number;
  reviewCount?: number;
  enrollmentCount?: number;
};

export default function CourseDetail() {
  const { id } = useParams();

  const { data: course, isLoading } = useQuery<CourseWithInstructor>({
    queryKey: [`/api/courses/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold">YEESP</h1>
          </Link>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                {course.avgRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{course.avgRating.toFixed(1)}</span>
                    <span>({course.reviewCount || 0} reviews)</span>
                  </div>
                )}
                {course.enrollmentCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrollmentCount} students</span>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} hours</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructor.avatar || undefined} />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">Instructor</div>
                  <div className="font-medium">{course.instructor.name}</div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Master the fundamentals and advanced concepts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Build real-world projects from scratch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Get hands-on experience with industry tools</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Basic understanding of programming concepts</li>
                      <li>• A computer with internet connection</li>
                      <li>• Willingness to learn and practice</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>
                      {course.duration ? `${course.duration} hours of content` : 'Comprehensive course content'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h3 className="font-semibold mb-2">Module 1: Introduction</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Getting Started</li>
                          <li>• Core Concepts</li>
                          <li>• Setting Up Your Environment</li>
                        </ul>
                      </div>
                      <div className="border-b pb-4">
                        <h3 className="font-semibold mb-2">Module 2: Fundamentals</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Key Principles</li>
                          <li>• Practical Examples</li>
                          <li>• Hands-on Exercises</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={course.instructor.avatar || undefined} />
                        <AvatarFallback className="text-2xl">{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{course.instructor.name}</CardTitle>
                        <CardDescription>{course.instructor.headline || 'Expert Instructor'}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {course.instructor.bio || 'Passionate educator with years of industry experience.'}
                    </p>
                    {course.instructor.skills && course.instructor.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {course.instructor.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>
                      See what our students are saying about this course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      No reviews yet. Be the first to review this course!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-4xl font-bold mb-2">${course.price}</div>
                <CardDescription>One-time payment • Lifetime access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/register">Enroll Now</Link>
                </Button>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate upon completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Learn at your own pace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>Downloadable resources</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
