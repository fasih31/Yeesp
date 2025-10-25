import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";

type LessonData = {
  title: string;
  content: string;
  videoUrl: string;
  duration: number;
  order: number;
};

export default function TutorCreateCourse() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    price: "",
    duration: 0,
  });

  const [lessons, setLessons] = useState<LessonData[]>([
    { title: "", content: "", videoUrl: "", duration: 30, order: 1 }
  ]);

  const createCourseMutation = useMutation({
    mutationFn: async (published: boolean) => {
      // Create course
      const course = await apiRequest("/courses", {
        method: "POST",
        body: JSON.stringify({
          ...courseData,
          instructorId: "tutor-id", // TODO: Get from auth context
          published,
        }),
      });

      // Create lessons
      for (const lesson of lessons) {
        if (lesson.title) {
          await apiRequest("/lessons", {
            method: "POST",
            body: JSON.stringify({
              courseId: course.id,
              ...lesson,
            }),
          });
        }
      }

      return course;
    },
    onSuccess: (course) => {
      toast({
        title: "Course Created!",
        description: `${course.title} has been created successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setLocation("/tutor/my-courses");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create course",
        variant: "destructive",
      });
    },
  });

  const addLesson = () => {
    setLessons([...lessons, {
      title: "",
      content: "",
      videoUrl: "",
      duration: 30,
      order: lessons.length + 1,
    }]);
  };

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const updateLesson = (index: number, field: keyof LessonData, value: any) => {
    const updated = [...lessons];
    updated[index] = { ...updated[index], [field]: value };
    setLessons(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Course</h1>
          <p className="text-lg text-muted-foreground">
            Share your knowledge with students worldwide
          </p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    placeholder="e.g., Web Development Fundamentals"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    placeholder="Describe your course..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) => setCourseData({ ...courseData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value: any) => setCourseData({ ...courseData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Estimated Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({ ...courseData, duration: parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 40"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Lessons</CardTitle>
                  <Button size="sm" onClick={addLesson}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Lesson {index + 1}</h3>
                      {lessons.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeLesson(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Lesson Title</Label>
                      <Input
                        value={lesson.title}
                        onChange={(e) => updateLesson(index, "title", e.target.value)}
                        placeholder="Enter lesson title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Video URL</Label>
                      <Input
                        value={lesson.videoUrl}
                        onChange={(e) => updateLesson(index, "videoUrl", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={lesson.duration}
                        onChange={(e) => updateLesson(index, "duration", parseInt(e.target.value) || 0)}
                        placeholder="30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={lesson.content}
                        onChange={(e) => updateLesson(index, "content", e.target.value)}
                        placeholder="Lesson description and notes..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Course Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Leave blank or set to 0 for a free course
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ready to Publish?</CardTitle>
                <CardDescription>
                  Review your course and make it available to students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Course Summary</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Title: {courseData.title || "Not set"}</li>
                    <li>• Lessons: {lessons.filter(l => l.title).length}</li>
                    <li>• Category: {courseData.category || "Not set"}</li>
                    <li>• Level: {courseData.level}</li>
                    <li>• Price: ${courseData.price || "Free"}</li>
                    <li>• Duration: {courseData.duration} hours</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => createCourseMutation.mutate(true)}
                    disabled={!courseData.title || createCourseMutation.isPending}
                  >
                    {createCourseMutation.isPending ? "Publishing..." : "Publish Course"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => createCourseMutation.mutate(false)}
                    disabled={!courseData.title || createCourseMutation.isPending}
                  >
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
