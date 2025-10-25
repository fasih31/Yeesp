
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Target } from "lucide-react";

export default function Achievements() {
  const achievements = [
    { icon: Trophy, title: "First Course", description: "Completed your first course", unlocked: true },
    { icon: Star, title: "Perfect Score", description: "Got 100% on a quiz", unlocked: true },
    { icon: Target, title: "Goal Setter", description: "Set your first learning goal", unlocked: true },
    { icon: Award, title: "Week Warrior", description: "7-day study streak", unlocked: false }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Achievements & Badges</h1>
        <p className="text-muted-foreground">Celebrate your learning milestones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, idx) => {
          const Icon = achievement.icon;
          return (
            <Card key={idx} className={achievement.unlocked ? "" : "opacity-50"}>
              <CardHeader>
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-center">{achievement.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
