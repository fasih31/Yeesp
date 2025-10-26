
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, FileText, MessageSquare, CheckCircle, Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import type { Course, Lesson } from "@shared/schema";

type LessonProgress = {
  lessonId: string;
  progressPercentage: number;
  completed: boolean;
  lastPosition: number;
};

type Note = {
  id: string;
  lessonId: string;
  timestamp: number;
  content: string;
  createdAt: Date;
};

type Bookmark = {
  id: string;
  lessonId: string;
  timestamp: number;
  title: string;
};

export default function CoursePlayer() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [bookmarkTitle, setBookmarkTitle] = useState("");

  const { data: course } = useQuery<Course & { lessons: Lesson[] }>({
    queryKey: [`/api/courses/${id}`],
  });

  const { data: progress } = useQuery<LessonProgress[]>({
    queryKey: [`/api/courses/${id}/progress`],
  });

  const { data: notes } = useQuery<Note[]>({
    queryKey: [`/api/lessons/${course?.lessons[currentLessonIndex]?.id}/notes`],
    enabled: !!course?.lessons[currentLessonIndex],
  });

  const { data: bookmarks } = useQuery<Bookmark[]>({
    queryKey: [`/api/lessons/${course?.lessons[currentLessonIndex]?.id}/bookmarks`],
    enabled: !!course?.lessons[currentLessonIndex],
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (data: { lessonId: string; progressPercentage: number; lastPosition: number; completed: boolean }) => {
      return apiRequest(`/lessons/${data.lessonId}/progress`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async (data: { lessonId: string; timestamp: number; content: string }) => {
      return apiRequest("/notes", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${course?.lessons[currentLessonIndex]?.id}/notes`] });
      setNoteText("");
      toast({ title: "Note saved" });
    },
  });

  const addBookmarkMutation = useMutation({
    mutationFn: async (data: { lessonId: string; timestamp: number; title: string }) => {
      return apiRequest("/bookmarks", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${course?.lessons[currentLessonIndex]?.id}/bookmarks`] });
      setBookmarkTitle("");
      toast({ title: "Bookmark added" });
    },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Update progress every 5 seconds
      if (Math.floor(video.currentTime) % 5 === 0 && course?.lessons[currentLessonIndex]) {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        updateProgressMutation.mutate({
          lessonId: course.lessons[currentLessonIndex].id,
          progressPercentage,
          lastPosition: video.currentTime,
          completed: progressPercentage >= 90,
        });
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Resume from last position
      const lessonProgress = progress?.find(p => p.lessonId === course?.lessons[currentLessonIndex]?.id);
      if (lessonProgress?.lastPosition) {
        video.currentTime = lessonProgress.lastPosition;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentLessonIndex, course, progress]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const addNote = () => {
    if (!noteText.trim() || !course?.lessons[currentLessonIndex]) return;
    
    addNoteMutation.mutate({
      lessonId: course.lessons[currentLessonIndex].id,
      timestamp: currentTime,
      content: noteText,
    });
  };

  const addBookmark = () => {
    if (!bookmarkTitle.trim() || !course?.lessons[currentLessonIndex]) return;
    
    addBookmarkMutation.mutate({
      lessonId: course.lessons[currentLessonIndex].id,
      timestamp: currentTime,
      title: bookmarkTitle,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentLesson = course?.lessons[currentLessonIndex];
  const courseProgress = progress ? (progress.filter(p => p.completed).length / (course?.lessons.length || 1)) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student/my-courses">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Courses
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{course?.title}</h1>
                <p className="text-sm text-muted-foreground">Progress: {Math.round(courseProgress)}%</p>
              </div>
            </div>
            <Progress value={courseProgress} className="w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black group">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    src={currentLesson?.videoUrl}
                  />
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Progress Bar */}
                    <Slider
                      value={[currentTime]}
                      max={duration}
                      step={1}
                      onValueChange={handleSeek}
                      className="mb-4"
                    />
                    
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={togglePlayPause}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        
                        <Slider
                          value={[volume]}
                          max={1}
                          step={0.1}
                          onValueChange={handleVolumeChange}
                          className="w-24"
                        />
                        
                        <span className="text-sm">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowSettings(!showSettings)}
                            className="text-white hover:bg-white/20"
                          >
                            <Settings className="h-5 w-5" />
                          </Button>
                          
                          {showSettings && (
                            <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 space-y-1">
                              <p className="text-xs text-gray-400 px-2 py-1">Playback Speed</p>
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                <button
                                  key={rate}
                                  onClick={() => changePlaybackRate(rate)}
                                  className={`block w-full text-left px-3 py-1 rounded hover:bg-white/20 text-sm ${
                                    playbackRate === rate ? "text-primary" : ""
                                  }`}
                                >
                                  {rate}x {playbackRate === rate && "✓"}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleFullscreen}
                          className="text-white hover:bg-white/20"
                        >
                          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
                <TabsTrigger value="bookmarks" className="flex-1">Bookmarks</TabsTrigger>
                <TabsTrigger value="discussion" className="flex-1">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Lesson Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {currentLesson?.content || course?.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Take notes at current timestamp..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={addNote} disabled={!noteText.trim()}>
                        Add Note at {formatTime(currentTime)}
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      {notes?.map((note) => (
                        <div key={note.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline">{formatTime(note.timestamp)}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bookmarks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Bookmark title..."
                        value={bookmarkTitle}
                        onChange={(e) => setBookmarkTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <Button onClick={addBookmark} disabled={!bookmarkTitle.trim()}>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Add Bookmark at {formatTime(currentTime)}
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      {bookmarks?.map((bookmark) => (
                        <button
                          key={bookmark.id}
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = bookmark.timestamp;
                            }
                          }}
                          className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <BookmarkCheck className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{bookmark.title}</p>
                              <p className="text-sm text-muted-foreground">{formatTime(bookmark.timestamp)}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Join the discussion...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                disabled={currentLessonIndex === 0}
                onClick={() => setCurrentLessonIndex(prev => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </Button>
              <Button
                disabled={!course || currentLessonIndex >= course.lessons.length - 1}
                onClick={() => setCurrentLessonIndex(prev => prev + 1)}
              >
                Next Lesson
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {course?.lessons.map((lesson, i) => {
                    const lessonProgress = progress?.find(p => p.lessonId === lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonIndex(i)}
                        className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                          i === currentLessonIndex ? "bg-muted" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {lessonProgress?.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full border-2" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">{lesson.duration} minutes</p>
                            {lessonProgress && !lessonProgress.completed && (
                              <Progress value={lessonProgress.progressPercentage} className="mt-2 h-1" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
