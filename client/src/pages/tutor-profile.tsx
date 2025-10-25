
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, CheckCircle, BookOpen, Award } from "lucide-react";
import type { User } from "@shared/schema";

type TutorWithDetails = User & {
  avgRating?: number;
  reviewCount?: number;
  studentCount?: number;
  courses?: any[];
  reviews?: any[];
};

export default function TutorProfile() {
  const { id } = useParams();

  const { data: tutor, isLoading } = useQuery<TutorWithDetails>({
    queryKey: [`/api/tutors/${id}`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Tutor not found</div>
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
          <Button asChild variant="outline">
            <Link href="/tutors">Back to Tutors</Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={tutor.avatar || undefined} />
                  <AvatarFallback className="text-4xl">{tutor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{tutor.name}</h1>
                    {tutor.verified && (
                      <CheckCircle className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  {tutor.headline && (
                    <p className="text-xl text-muted-foreground mb-4">{tutor.headline}</p>
                  )}
                  {tutor.avgRating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium text-lg">{tutor.avgRating.toFixed(1)}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({tutor.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )}
                  {tutor.skills && tutor.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tutor.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Tabs defaultValue="about" className="mb-8">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {tutor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {tutor.bio || 'Experienced tutor passionate about helping students succeed.'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experience & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>5+ years of teaching experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Helped {tutor.studentCount || 100}+ students achieve their goals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Expert in multiple programming languages and frameworks</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Courses by {tutor.name}</CardTitle>
                    <CardDescription>Browse the courses taught by this tutor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tutor.courses && tutor.courses.length > 0 ? (
                      <div className="space-y-4">
                        {tutor.courses.map((course: any) => (
                          <div key={course.id} className="border-b pb-4 last:border-0">
                            <h3 className="font-semibold mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold">${course.price}</span>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/course/${course.id}`}>View Course</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">
                        No courses available yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>What students say about {tutor.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tutor.reviews && tutor.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {tutor.reviews.map((review: any, idx: number) => (
                          <div key={idx} className="border-b pb-4 last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">
                        No reviews yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>Schedule a one-on-one tutoring session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tutor.hourlyRate && (
                  <div>
                    <div className="text-3xl font-bold mb-1">${tutor.hourlyRate}/hour</div>
                    <p className="text-sm text-muted-foreground">Flexible scheduling available</p>
                  </div>
                )}
                
                <Button className="w-full" size="lg" asChild>
                  <Link href="/register">Book Session</Link>
                </Button>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Flexible rescheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Satisfaction guaranteed</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Session Includes:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Personalized 1-on-1 attention</li>
                    <li>• Custom learning materials</li>
                    <li>• Practice exercises</li>
                    <li>• Post-session notes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
