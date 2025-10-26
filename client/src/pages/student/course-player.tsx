
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookmarkPlus, FileText, MessageSquare, ChevronLeft, ChevronRight, CheckCircle, Circle, Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Course, Lesson } from "@shared/schema";

interface Note {
  id: string;
  lessonId: string;
  timestamp: number;
  content: string;
  createdAt: Date;
}

interface Bookmark {
  id: string;
  lessonId: string;
  timestamp: number;
  title: string;
  createdAt: Date;
}

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [noteContent, setNoteContent] = useState("");
  const [noteTimestamp, setNoteTimestamp] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { data: course, isLoading } = useQuery<Course & { lessons: Lesson[] }>({
    queryKey: [`/api/courses/${id}`],
  });

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: [`/api/courses/${id}/notes`],
    enabled: !!id,
  });

  const { data: bookmarks = [] } = useQuery<Bookmark[]>({
    queryKey: [`/api/courses/${id}/bookmarks`],
    enabled: !!id,
  });

  const addNoteMutation = useMutation({
    mutationFn: async (note: { content: string; timestamp: number; lessonId: string }) => {
      return apiRequest(`/courses/${id}/notes`, {
        method: "POST",
        body: JSON.stringify(note),
      });
    },
    onSuccess: () => {
      toast({ title: "Note saved!" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/notes`] });
      setNoteContent("");
    },
  });

  const addBookmarkMutation = useMutation({
    mutationFn: async (bookmark: { timestamp: number; lessonId: string; title: string }) => {
      return apiRequest(`/courses/${id}/bookmarks`, {
        method: "POST",
        body: JSON.stringify(bookmark),
      });
    },
    onSuccess: () => {
      toast({ title: "Bookmark added!" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}/bookmarks`] });
    },
  });

  const markCompleteMutation = useMutation({
    mutationFn: async (lessonId: string) => {
      return apiRequest(`/lessons/${lessonId}/complete`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast({ title: "Lesson marked complete!" });
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}`] });
    },
  });

  if (isLoading) {
    return <div className="container py-8">Loading course...</div>;
  }

  if (!course) {
    return <div className="container py-8">Course not found</div>;
  }

  const currentLesson = course.lessons?.[currentLessonIndex];
  const progress = course.lessons ? ((currentLessonIndex + 1) / course.lessons.length) * 100 : 0;

  const handleSaveNote = () => {
    if (!currentLesson || !noteContent.trim()) return;
    addNoteMutation.mutate({
      content: noteContent,
      timestamp: currentTime,
      lessonId: currentLesson.id,
    });
  };

  const handleAddBookmark = () => {
    if (!currentLesson) return;
    addBookmarkMutation.mutate({
      timestamp: currentTime,
      lessonId: currentLesson.id,
      title: `Bookmark at ${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`,
    });
  };

  const handleMarkComplete = () => {
    if (!currentLesson) return;
    markCompleteMutation.mutate(currentLesson.id);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">{currentLesson?.title}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/student/my-courses")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      <div className="mb-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          Lesson {currentLessonIndex + 1} of {course.lessons?.length || 0}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-black relative group">
                {currentLesson?.videoUrl ? (
                  <>
                    <video
                      className="w-full h-full"
                      src={currentLesson.videoUrl}
                      onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                      onLoadedMetadata={(e) => setDuration((e.target as HTMLVideoElement).duration)}
                    />
                    {/* Custom Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                          </Button>
                          <div className="flex-1">
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              value={currentTime}
                              onChange={(e) => setCurrentTime(Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                          <select
                            value={playbackSpeed}
                            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                            className="bg-transparent text-white text-sm"
                          >
                            <option value="0.5">0.5x</option>
                            <option value="0.75">0.75x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                          </select>
                          <Button size="sm" variant="ghost">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <FileText className="h-16 w-16 mb-4" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lesson Content Tabs */}
          <Tabs defaultValue="content">
            <TabsList className="w-full">
              <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">Notes ({notes.length})</TabsTrigger>
              <TabsTrigger value="bookmarks" className="flex-1">Bookmarks ({bookmarks.length})</TabsTrigger>
              <TabsTrigger value="transcript" className="flex-1">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>{currentLesson?.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={handleAddBookmark} variant="outline" size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      Bookmark
                    </Button>
                    <Button onClick={handleMarkComplete} variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: currentLesson?.content || "" }} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>My Notes</CardTitle>
                  <CardDescription>Take notes at any point during the lesson</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your note here..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={handleSaveNote} disabled={!noteContent.trim()}>
                      <FileText className="h-4 w-4 mr-2" />
                      Save Note at {formatTime(currentTime)}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {notes.map((note) => (
                      <Card key={note.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{formatTime(note.timestamp)}</Badge>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookmarks">
              <Card>
                <CardHeader>
                  <CardTitle>Bookmarks</CardTitle>
                  <CardDescription>Jump to important moments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {bookmarks.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => setCurrentTime(bookmark.timestamp)}
                    >
                      <div>
                        <p className="font-medium">{bookmark.title}</p>
                        <p className="text-sm text-muted-foreground">{formatTime(bookmark.timestamp)}</p>
                      </div>
                      <Play className="h-4 w-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript">
              <Card>
                <CardHeader>
                  <CardTitle>Video Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Transcript generation coming soon. This will include searchable, timestamped captions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
              disabled={currentLessonIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={() => setCurrentLessonIndex(Math.min((course.lessons?.length || 1) - 1, currentLessonIndex + 1))}
              disabled={currentLessonIndex === (course.lessons?.length || 1) - 1}
              className="flex-1"
            >
              Next Lesson
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar - Course Outline */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {course.lessons?.map((lesson, index) => (
                  <AccordionItem key={lesson.id} value={lesson.id}>
                    <AccordionTrigger
                      className={`px-4 hover:bg-accent ${index === currentLessonIndex ? 'bg-accent' : ''}`}
                      onClick={() => setCurrentLessonIndex(index)}
                    >
                      <div className="flex items-center gap-2 text-left">
                        {index <= currentLessonIndex ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                        <span className="text-sm">{lesson.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground">
                        Duration: {lesson.duration} minutes
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
