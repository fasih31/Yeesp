
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter } from "lucide-react";

export default function BookTutor() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { data: tutors } = useQuery({
    queryKey: ["/api/users/tutors"],
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Book a Tutor</h1>
        <p className="text-muted-foreground">Find and schedule sessions with expert tutors</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Tutors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name or skill..." className="pl-9" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">$0 - $50/hr</SelectItem>
                      <SelectItem value="mid">$50 - $100/hr</SelectItem>
                      <SelectItem value="high">$100+/hr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {tutors?.map((tutor: any) => (
              <Card key={tutor.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={tutor.avatarUrl} />
                      <AvatarFallback>{tutor.fullName?.charAt(0) || 'T'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle>{tutor.fullName}</CardTitle>
                      <CardDescription>{tutor.bio}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{tutor.rating || '5.0'}</span>
                        </div>
                        <Badge variant="secondary">{tutor.hourlyRate ? `$${tutor.hourlyRate}/hr` : 'Rate TBD'}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">Book Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
