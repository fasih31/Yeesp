import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, AlertCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { courseSchema } from "@/lib/validation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "wouter";

type LessonData = {
  id?: string;
  title: string;
  content: string;
  videoUrl: string;
  duration: number;
  order: number;
};

export default function EditCourse() {
  const [match, params] = useRoute("/tutor/course/:id/edit");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    price: "",
    duration: "",
  });

  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch course data
  const { data: course, isLoading } = useQuery({
    queryKey: ['/api/courses', params?.id],
    queryFn: async () => {
      const data = await apiRequest(`/courses/${params?.id}`);
      return data;
    },
    enabled: !!params?.id,
  });

  // Fetch course lessons
  const { data: courseLessons } = useQuery({
    queryKey: ['/api/lessons', params?.id],
    queryFn: async () => {
      const data = await apiRequest(`/courses/${params?.id}/lessons`);
      return data;
    },
    enabled: !!params?.id,
  });

  // Populate form when course data loads
  useEffect(() => {
    if (course) {
      setCourseData({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "beginner",
        price: course.price?.toString() || "",
        duration: course.duration?.toString() || "",
      });
    }
  }, [course]);

  // Populate lessons when data loads
  useEffect(() => {
    if (courseLessons && courseLessons.length > 0) {
      setLessons(courseLessons.map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title || "",
        content: lesson.content || "",
        videoUrl: lesson.videoUrl || "",
        duration: lesson.duration || 30,
        order: lesson.order || 1,
      })));
    }
  }, [courseLessons]);

  const validateForm = () => {
    try {
      courseSchema.parse({
        ...courseData,
        duration: courseData.duration ? Number(courseData.duration) : 0,
      });
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const updateCourseMutation = useMutation({
    mutationFn: async (published: boolean) => {
      // Update course
      const updatedCourse = await apiRequest(`/courses/${params?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...courseData,
          price: parseFloat(courseData.price),
          duration: parseInt(courseData.duration),
          published,
        }),
      });

      // Update lessons
      for (const lesson of lessons) {
        if (lesson.id) {
          // Update existing lesson
          await apiRequest(`/lessons/${lesson.id}`, {
            method: "PUT",
            body: JSON.stringify({
              ...lesson,
              courseId: params?.id,
            }),
          });
        } else {
          // Create new lesson
          await apiRequest("/lessons", {
            method: "POST",
            body: JSON.stringify({
              ...lesson,
              courseId: params?.id,
            }),
          });
        }
      }

      return updatedCourse;
    },
    onSuccess: () => {
      toast({
        title: "Course Updated",
        description: "Your course has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      setLocation("/tutor/my-courses");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update course",
        variant: "destructive",
      });
    },
  });

  const handleUpdate = (published: boolean) => {
    if (validateForm()) {
      updateCourseMutation.mutate(published);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive",
      });
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!match || !params?.id) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tutor/my-courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Edit Course</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleUpdate(false)}
              disabled={updateCourseMutation.isPending}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleUpdate(true)}
              disabled={updateCourseMutation.isPending}
            >
              {updateCourseMutation.isPending ? "Updating..." : "Update & Publish"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="lessons">Lessons ({lessons.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update the core details of your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Course Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                    placeholder="e.g., Complete Web Development Bootcamp"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                    placeholder="Describe what students will learn..."
                    rows={5}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">
                      Level <span className="text-destructive">*</span>
                    </Label>
                    <Select value={courseData.level} onValueChange={(value: any) => setCourseData({ ...courseData, level: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price (USD) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={courseData.price}
                      onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                      placeholder="49.99"
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                      placeholder="10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-4">
            {lessons.map((lesson, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Lesson {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLesson(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Lesson Title</Label>
                    <Input
                      value={lesson.title}
                      onChange={(e) => updateLesson(index, "title", e.target.value)}
                      placeholder="e.g., Introduction to React Hooks"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={lesson.content}
                      onChange={(e) => updateLesson(index, "content", e.target.value)}
                      placeholder="Lesson content and description..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Video URL (optional)</Label>
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
                        onChange={(e) => updateLesson(index, "duration", parseInt(e.target.value))}
                        placeholder="30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button onClick={addLesson} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Lesson
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
