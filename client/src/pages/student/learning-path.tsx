
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Lock } from "lucide-react";

export default function LearningPath() {
  const paths = [
    { title: "JavaScript Fundamentals", status: "completed", progress: 100 },
    { title: "React Basics", status: "in-progress", progress: 60 },
    { title: "Advanced React", status: "locked", progress: 0 },
    { title: "Full Stack Development", status: "locked", progress: 0 }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Your Learning Path</h1>
        <p className="text-muted-foreground">Follow your personalized roadmap to success</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {paths.map((path, idx) => (
            <div key={idx} className="relative">
              {idx < paths.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
              )}
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {path.status === "completed" ? (
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      ) : path.status === "in-progress" ? (
                        <Circle className="h-12 w-12 text-primary" />
                      ) : (
                        <Lock className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle>{path.title}</CardTitle>
                      <div className="mt-2">
                        <Badge variant={path.status === "completed" ? "default" : "secondary"}>
                          {path.status}
                        </Badge>
                      </div>
                    </div>
                    {path.status !== "locked" && <Button>Continue</Button>}
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
