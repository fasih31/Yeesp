
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle } from "lucide-react";

export default function QuizExam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const questions = [
    {
      question: "What is React?",
      options: ["A JavaScript library", "A database", "A CSS framework", "A backend language"],
      correct: 0
    },
    {
      question: "What does JSX stand for?",
      options: ["Java Syntax Extension", "JavaScript XML", "JSON Extended", "None of the above"],
      correct: 1
    }
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">JavaScript Fundamentals Quiz</h1>
          <p className="text-muted-foreground">20 questions • 30 minutes</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">25:30</span>
            </div>
          </div>
          <Progress value={(currentQuestion / questions.length) * 100} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {questions[currentQuestion].options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" disabled={currentQuestion === 0}>Previous</Button>
              <Button className="flex-1">Next Question</Button>
              <Button variant="outline">Flag for Review</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
