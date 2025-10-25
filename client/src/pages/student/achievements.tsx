
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Star, Target, Flame, Zap, BookOpen, Clock, Users, Brain, Sparkles } from "lucide-react";

export default function Achievements() {
  const achievementCategories = {
    learning: [
      { icon: BookOpen, title: "First Steps", description: "Complete your first lesson", progress: 100, unlocked: true, points: 10 },
      { icon: Trophy, title: "Course Crusher", description: "Complete 3 courses", progress: 66, unlocked: false, points: 50, current: 2, total: 3 },
      { icon: Brain, title: "Knowledge Seeker", description: "Complete 10 courses", progress: 20, unlocked: false, points: 100, current: 2, total: 10 },
      { icon: Sparkles, title: "Master Learner", description: "Complete 25 courses", progress: 8, unlocked: false, points: 250, current: 2, total: 25 },
    ],
    engagement: [
      { icon: Flame, title: "Week Warrior", description: "Maintain 7-day study streak", progress: 100, unlocked: true, points: 25 },
      { icon: Flame, title: "Consistency King", description: "Maintain 30-day study streak", progress: 46, unlocked: false, points: 100, current: 14, total: 30 },
      { icon: Flame, title: "Unstoppable", description: "Maintain 100-day study streak", progress: 14, unlocked: false, points: 500, current: 14, total: 100 },
      { icon: Clock, title: "Time Investor", description: "Study for 100 total hours", progress: 63, unlocked: false, points: 150, current: 63, total: 100 },
    ],
    performance: [
      { icon: Star, title: "Perfect Score", description: "Get 100% on a quiz", progress: 100, unlocked: true, points: 20 },
      { icon: Star, title: "Quiz Master", description: "Get perfect scores on 10 quizzes", progress: 10, unlocked: false, points: 100, current: 1, total: 10 },
      { icon: Trophy, title: "Top Performer", description: "Rank in top 10% of learners", progress: 100, unlocked: true, points: 200 },
      { icon: Zap, title: "Speed Learner", description: "Complete a course in under 1 week", progress: 0, unlocked: false, points: 75, current: 0, total: 1 },
    ],
    social: [
      { icon: Users, title: "Helpful Hand", description: "Help 5 students in discussion", progress: 0, unlocked: false, points: 30, current: 0, total: 5 },
      { icon: Target, title: "Team Player", description: "Join a study group", progress: 0, unlocked: false, points: 15, current: 0, total: 1 },
      { icon: Award, title: "Mentor", description: "Receive 10 thank you messages", progress: 0, unlocked: false, points: 50, current: 0, total: 10 },
    ],
  };

  const totalPoints = 455; // Sum of unlocked achievements
  const totalAchievements = Object.values(achievementCategories).flat().length;
  const unlockedCount = Object.values(achievementCategories).flat().filter(a => a.unlocked).length;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Achievements & Badges</h1>
        <p className="text-muted-foreground">Celebrate your learning milestones</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <Trophy className="h-6 w-6" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{totalPoints}</div>
            <p className="text-sm text-muted-foreground mt-1">Keep earning to unlock rewards!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{unlockedCount}/{totalAchievements}</div>
            <Progress value={(unlockedCount / totalAchievements) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{Math.round((unlockedCount / totalAchievements) * 100)}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              {totalAchievements - unlockedCount} more to unlock
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Categories */}
      <Tabs defaultValue="learning" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        {Object.entries(achievementCategories).map(([category, achievements]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={idx} 
                    className={`transition-all ${
                      achievement.unlocked 
                        ? "border-primary shadow-lg" 
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className={`h-16 w-16 rounded-full flex items-center justify-center ${
                              achievement.unlocked
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={achievement.unlocked ? "default" : "secondary"}
                            className="gap-1"
                          >
                            {achievement.unlocked ? (
                              <>
                                <Star className="h-3 w-3 fill-current" />
                                Unlocked
                              </>
                            ) : (
                              "Locked"
                            )}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            {achievement.points} pts
                          </Badge>
                        </div>

                        {!achievement.unlocked && (
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                {achievement.current !== undefined ? (
                                  `${achievement.current}/${achievement.total}`
                                ) : (
                                  `${achievement.progress}%`
                                )}
                              </span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                        )}

                        {achievement.unlocked && (
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                            ✓ Achievement unlocked! +{achievement.points} points
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Next Achievement Preview */}
      <Card className="mt-8 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Almost There!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <Flame className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">30-Day Streak</p>
              <p className="text-sm text-muted-foreground mb-2">
                Maintain your learning streak for 30 consecutive days
              </p>
              <div className="flex items-center gap-2">
                <Progress value={46} className="flex-1 h-2" />
                <span className="text-sm font-medium">14/30 days</span>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <Trophy className="h-3 w-3" />
              100 pts
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
