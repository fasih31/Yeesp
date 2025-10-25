import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Video, Calendar, FileText, HelpCircle, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type LessonType = 'video' | 'live_session' | 'assignment' | 'quiz' | 'reading';

export type LessonData = {
  id?: string;
  title: string;
  content: string;
  type: LessonType;
  videoUrl?: string;
  duration: number;
  order: number;
  dueDate?: string;
  maxScore?: number;
  attachments?: string[];
  questions?: QuizQuestion[];
};

export type QuizQuestion = {
  id?: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string;
  points: number;
  explanation?: string;
};

type Props = {
  lesson: LessonData;
  index: number;
  onUpdate: (index: number, field: keyof LessonData, value: any) => void;
  onRemove: (index: number) => void;
};

const lessonTypeIcons: Record<LessonType, any> = {
  video: Video,
  live_session: Calendar,
  assignment: FileText,
  quiz: HelpCircle,
  reading: BookOpen,
};

const lessonTypeLabels: Record<LessonType, string> = {
  video: 'Video Lecture',
  live_session: 'Live Online Class',
  assignment: 'Assignment',
  quiz: 'Quiz',
  reading: 'Reading Material',
};

export default function LessonBuilder({ lesson, index, onUpdate, onRemove }: Props) {
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const Icon = lessonTypeIcons[lesson.type];

  const addQuestion = () => {
    const questions = lesson.questions || [];
    onUpdate(index, 'questions', [
      ...questions,
      {
        question: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        points: 1,
      },
    ]);
    setShowQuizBuilder(true);
  };

  const updateQuestion = (qIndex: number, field: keyof QuizQuestion, value: any) => {
    const questions = [...(lesson.questions || [])];
    questions[qIndex] = { ...questions[qIndex], [field]: value };
    onUpdate(index, 'questions', questions);
  };

  const removeQuestion = (qIndex: number) => {
    const questions = (lesson.questions || []).filter((_, i) => i !== qIndex);
    onUpdate(index, 'questions', questions);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Lesson {index + 1}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {lessonTypeLabels[lesson.type]}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Lesson Type</Label>
            <Select
              value={lesson.type}
              onValueChange={(value: LessonType) => onUpdate(index, "type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video Lecture
                  </div>
                </SelectItem>
                <SelectItem value="live_session">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Live Online Class
                  </div>
                </SelectItem>
                <SelectItem value="assignment">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Assignment
                  </div>
                </SelectItem>
                <SelectItem value="quiz">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Quiz
                  </div>
                </SelectItem>
                <SelectItem value="reading">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Reading Material
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              value={lesson.duration}
              onChange={(e) => onUpdate(index, "duration", parseInt(e.target.value))}
              placeholder="30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Lesson Title</Label>
          <Input
            value={lesson.title}
            onChange={(e) => onUpdate(index, "title", e.target.value)}
            placeholder="e.g., Introduction to React Hooks"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={lesson.content}
            onChange={(e) => onUpdate(index, "content", e.target.value)}
            placeholder="Describe what students will learn..."
            rows={3}
          />
        </div>

        {lesson.type === 'video' && (
          <div className="space-y-2">
            <Label>Video URL</Label>
            <Input
              value={lesson.videoUrl || ''}
              onChange={(e) => onUpdate(index, "videoUrl", e.target.value)}
              placeholder="https://youtube.com/... or direct video link"
            />
          </div>
        )}

        {lesson.type === 'live_session' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-900">
              <Calendar className="h-4 w-4 inline mr-2" />
              Live sessions will be scheduled separately from the tutoring sessions page
            </p>
          </div>
        )}

        {(lesson.type === 'assignment' || lesson.type === 'quiz') && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date (optional)</Label>
              <Input
                type="date"
                value={lesson.dueDate || ''}
                onChange={(e) => onUpdate(index, "dueDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Score</Label>
              <Input
                type="number"
                value={lesson.maxScore || 100}
                onChange={(e) => onUpdate(index, "maxScore", parseInt(e.target.value))}
                placeholder="100"
              />
            </div>
          </div>
        )}

        {lesson.type === 'quiz' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Quiz Questions ({lesson.questions?.length || 0})</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addQuestion}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {lesson.questions && lesson.questions.length > 0 && (
              <div className="space-y-3">
                {lesson.questions.map((question, qIndex) => (
                  <Card key={qIndex} className="bg-gray-50">
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <Label>Question {qIndex + 1}</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(qIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Input
                        value={question.question}
                        onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                        placeholder="Enter your question..."
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <Select
                          value={question.type}
                          onValueChange={(value: any) => updateQuestion(qIndex, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                            <SelectItem value="true_false">True/False</SelectItem>
                            <SelectItem value="short_answer">Short Answer</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value))}
                          placeholder="Points"
                        />
                      </div>

                      {question.type === 'multiple_choice' && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          {question.options?.map((option, oIndex) => (
                            <Input
                              key={oIndex}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(question.options || [])];
                                newOptions[oIndex] = e.target.value;
                                updateQuestion(qIndex, 'options', newOptions);
                              }}
                              placeholder={`Option ${oIndex + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Input
                          value={question.correctAnswer}
                          onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                          placeholder="Enter the correct answer"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Explanation (optional)</Label>
                        <Textarea
                          value={question.explanation || ''}
                          onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                          placeholder="Explain why this is the correct answer..."
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
