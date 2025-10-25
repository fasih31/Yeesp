import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, CheckCircle } from "lucide-react";
import type { User } from "@shared/schema";

type TutorWithStats = User & {
  avgRating?: number;
  reviewCount?: number;
  studentCount?: number;
};

export default function Tutors() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tutors, isLoading } = useQuery<TutorWithStats[]>({
    queryKey: ["/api/tutors"],
  });

  const filteredTutors = tutors?.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.skills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-[#E8F0FF] via-[#F0F7FF] to-[#E8F0FF] dark:from-[#1A2238] dark:via-[#0f1724] dark:to-[#1A2238] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B3A67_1px,transparent_1px),linear-gradient(to_bottom,#2B3A67_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3A86FF_1px,transparent_1px),linear-gradient(to_bottom,#3A86FF_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00AEEF]/20 dark:bg-[#3A86FF]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00C896]/20 dark:bg-[#5EF38C]/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-tutors-heading">
              Find Expert Tutors
            </h2>
            <p className="text-xl text-muted-foreground">
              Book one-on-one sessions with verified tutors
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tutors by name, skills, or expertise..."
                className="pl-10 pr-4 py-3 h-14 text-lg rounded-full focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-tutors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 -mt-24 relative z-10">
        {/* Tutors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredTutors && filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <Card key={tutor.id} className="hover-elevate flex flex-col" data-testid={`card-tutor-${tutor.id}`}>
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={tutor.avatar || undefined} />
                      <AvatarFallback className="text-2xl">{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="truncate" data-testid={`text-tutor-name-${tutor.id}`}>
                          {tutor.name}
                        </CardTitle>
                        {tutor.verified && (
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" data-testid={`icon-verified-${tutor.id}`} />
                        )}
                      </div>
                      {tutor.headline && (
                        <CardDescription className="line-clamp-2" data-testid={`text-headline-${tutor.id}`}>
                          {tutor.headline}
                        </CardDescription>
                      )}
                    </div>
                  </div>

                  {tutor.avgRating && (
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium" data-testid={`text-rating-${tutor.id}`}>
                          {tutor.avgRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        ({tutor.reviewCount || 0} reviews)
                      </span>
                    </div>
                  )}

                  {tutor.skills && tutor.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tutor.skills.slice(0, 4).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs" data-testid={`badge-skill-${tutor.id}-${idx}`}>
                          {skill}
                        </Badge>
                      ))}
                      {tutor.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{tutor.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex-1">
                  {tutor.bio && (
                    <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-bio-${tutor.id}`}>
                      {tutor.bio}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="flex items-center justify-between gap-4">
                  {tutor.hourlyRate && (
                    <div className="text-2xl font-bold" data-testid={`text-rate-${tutor.id}`}>
                      ${tutor.hourlyRate}/h
                    </div>
                  )}
                  <Button asChild data-testid={`button-book-${tutor.id}`}>
                    <Link href={`/tutor/${tutor.id}`}>
                      Book Session
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground" data-testid="text-no-tutors">
              No tutors found. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}