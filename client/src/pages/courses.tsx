import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Course, User } from "@shared/schema";

type CourseWithInstructor = Course & {
  instructor: User;
  avgRating?: number;
  reviewCount?: number;
};

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const { data: courses, isLoading } = useQuery<CourseWithInstructor[]>({
    queryKey: ["/api/courses", category, searchQuery],
  });

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || course.category === category;
    return matchesSearch && matchesCategory && course.published;
  });

  // Pagination logic
  const totalPages = Math.ceil((filteredCourses?.length || 0) / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const paginatedCourses = filteredCourses?.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/">
            <h1 className="text-2xl font-bold" data-testid="text-logo">YEESP</h1>
          </Link>
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-courses"
              />
            </div>
          </div>
          <Button variant="outline" asChild data-testid="button-login">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Promotional Banner */}
        <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary animate-gradient p-[2px]">
          <div className="bg-background rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <Badge className="mb-4 animate-fade-in">Limited Time Offer</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
                  Get 50% Off All Courses!
                </h2>
                <p className="text-lg text-muted-foreground mb-6 animate-fade-in">
                  Start learning today with our biggest sale of the year. Offer ends soon!
                </p>
                <div className="flex gap-4 animate-bounce-in">
                  <Button size="lg" className="shadow-xl">
                    Browse Deals
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-8xl animate-float">🎓</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text" data-testid="text-courses-title">
            Explore Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover thousands of courses across various categories
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48" data-testid="select-category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : paginatedCourses && paginatedCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCourses.map((course) => (
              <Card key={course.id} className="hover-elevate flex flex-col" data-testid={`card-course-${course.id}`}>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  <span className="text-6xl opacity-20">{course.category.charAt(0).toUpperCase()}</span>
                </div>

                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${course.id}`}>
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs" data-testid={`badge-level-${course.id}`}>
                      {course.level}
                    </Badge>
                  </div>

                  <CardTitle className="line-clamp-2" data-testid={`text-course-title-${course.id}`}>
                    {course.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-2" data-testid={`text-course-description-${course.id}`}>
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium" data-testid={`text-instructor-${course.id}`}>
                        {course.instructor.name}
                      </div>
                    </div>
                  </div>

                  {course.avgRating && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium" data-testid={`text-rating-${course.id}`}>
                          {course.avgRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        ({course.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold" data-testid={`text-price-${course.id}`}>
                      ${course.price}
                    </div>
                    {course.duration && (
                      <div className="text-sm text-muted-foreground">
                        {course.duration}h total
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" asChild data-testid={`button-enroll-${course.id}`}>
                    <Link href={`/course/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground" data-testid="text-no-courses">
              No courses found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}