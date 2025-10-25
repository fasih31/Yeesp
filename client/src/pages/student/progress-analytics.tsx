
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Award, BookOpen, Flame, Target, Trophy, Star, Zap, Calendar } from "lucide-react";
import { Link } from "wouter";
import type { Enrollment } from "@shared/schema";

export default function ProgressAnalytics() {
  const { data: enrollments } = useQuery<Enrollment[]>({
    queryKey: ["/api/enrollments/my"],
  });

  // Calculate statistics
  const currentStreak = 14; // This would come from backend
  const longestStreak = 28;
  const totalStudyHours = 156.5;
  const weeklyHours = 12.5;
  const achievementsCount = 8;
  const coursesCompleted = enrollments?.filter(e => e.completed).length || 0;
  const coursesInProgress = enrollments?.filter(e => !e.completed && e.progress > 0).length || 0;
  const dailyGoalProgress = 65; // Percentage of daily goal completed

  // Mock data for weekly activity
  const weeklyActivity = [
    { day: "Mon", hours: 2.5, goal: 2 },
    { day: "Tue", hours: 1.8, goal: 2 },
    { day: "Wed", hours: 3.2, goal: 2 },
    { day: "Thu", hours: 2.0, goal: 2 },
    { day: "Fri", hours: 1.5, goal: 2 },
    { day: "Sat", hours: 0.5, goal: 2 },
    { day: "Sun", hours: 1.0, goal: 2 },
  ];

  const recentAchievements = [
    { title: "Week Warrior", icon: Flame, color: "text-orange-500", date: "Today" },
    { title: "Fast Learner", icon: Zap, color: "text-yellow-500", date: "Yesterday" },
    { title: "Quiz Master", icon: Star, color: "text-purple-500", date: "2 days ago" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your progress and celebrate achievements</p>
      </div>

      {/* Streak & Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
                Learning Streak
              </CardTitle>
              <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">
                <Trophy className="h-3 w-3 mr-1" />
                Top 10%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {currentStreak}
              </div>
              <p className="text-sm text-muted-foreground">Days in a row</p>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="text-center">
                <p className="font-semibold text-2xl">{longestStreak}</p>
                <p className="text-muted-foreground">Longest</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="font-semibold text-2xl">{totalStudyHours}h</p>
                <p className="text-muted-foreground">Total Time</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Keep it going! Study today to maintain your streak</p>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i < currentStreak % 7 ? "bg-orange-500" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Goal Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-500" />
              Today's Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - dailyGoalProgress / 100)}`}
                    className="text-blue-500 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {dailyGoalProgress}%
                  </span>
                  <span className="text-xs text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Study 2 hours</span>
                <span className="font-medium">1.3h / 2h</span>
              </div>
              <Progress value={65} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Complete 1 lesson</span>
                <span className="font-medium">0 / 1</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <Button className="w-full" asChild>
              <Link href="/student/my-courses">
                Continue Learning
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyHours}h</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              +2.5h from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievementsCount}</div>
            <Button variant="link" className="p-0 h-auto text-xs" asChild>
              <Link href="/student/achievements">View all</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {coursesInProgress} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#156</div>
            <Button variant="link" className="p-0 h-auto text-xs" asChild>
              <Link href="/student/leaderboard">View leaderboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium w-12">{day.day}</span>
                    <span className="text-muted-foreground">{day.hours}h / {day.goal}h</span>
                  </div>
                  <div className="relative">
                    <Progress value={(day.hours / day.goal) * 100} className="h-3" />
                    {day.hours >= day.goal && (
                      <Star className="absolute -top-1 -right-1 h-5 w-5 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                🎯 You've hit your daily goal <strong>5/7 days</strong> this week!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/student/achievements">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAchievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className={`h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ${achievement.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
              );
            })}
            
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Next Achievement</p>
                  <p className="text-sm text-muted-foreground">30-Day Streak</p>
                </div>
              </div>
              <Progress value={(currentStreak / 30) * 100} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground text-center">
                {30 - currentStreak} more days to unlock!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {enrollments && enrollments.length > 0 ? (
            enrollments.slice(0, 5).map((enrollment) => (
              <div key={enrollment.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">Course {enrollment.courseId}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{enrollment.progress}% complete</span>
                      {enrollment.completed && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Award className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/student/course-player/${enrollment.courseId}`}>
                      Continue
                    </Link>
                  </Button>
                </div>
                <Progress value={enrollment.progress || 0} className="h-2" />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No courses enrolled yet</p>
              <Button asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
