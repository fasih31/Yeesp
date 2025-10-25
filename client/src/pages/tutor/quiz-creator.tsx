
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save } from "lucide-react";

export default function QuizCreator() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Quiz Creator</h1>
            <p className="text-lg text-muted-foreground">
              Create quizzes and exams for your students
            </p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Quiz
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input id="quiz-title" placeholder="Enter quiz title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz-description">Description</Label>
                  <Textarea id="quiz-description" placeholder="Brief description of the quiz" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select>
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics 101</SelectItem>
                        <SelectItem value="physics">Physics Fundamentals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="30" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Questions</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <Label>Question {i}</Label>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea placeholder="Enter your question here" />

                  <div className="space-y-2">
                    <Label className="text-sm">Answer Options</Label>
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <Input placeholder={`Option ${option}`} />
                        <Button variant="outline" size="sm">Correct</Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`points-${i}`}>Points</Label>
                    <Input id={`points-${i}`} type="number" placeholder="10" className="w-24" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
