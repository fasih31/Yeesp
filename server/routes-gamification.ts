
import { Express } from "express";
import { db } from "./db";
import { requireAuth } from "./middleware/auth";
import {
  users,
  courses,
  lessons,
  enrollments,
  lessonProgress,
  achievements,
  userAchievements,
  studyStreaks,
  learningGoals,
  rewards,
  userRewards,
} from "@shared/schema";
import { eq, and, desc, sql, gte } from "drizzle-orm";

export function registerGamificationRoutes(app: Express) {
  // Get user's study streak
  app.get("/api/streaks/current", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      
      const streak = await db.query.studyStreaks.findFirst({
        where: and(
          eq(studyStreaks.userId, userId),
          eq(studyStreaks.isActive, true)
        ),
      });

      res.json(streak || { currentStreak: 0, longestStreak: 0, lastActivityDate: null });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch streak" });
    }
  });

  // Update study streak
  app.post("/api/streaks/update", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingStreak = await db.query.studyStreaks.findFirst({
        where: eq(studyStreaks.userId, userId),
      });

      if (!existingStreak) {
        await db.insert(studyStreaks).values({
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: today,
          isActive: true,
        });
      } else {
        const lastActivity = new Date(existingStreak.lastActivityDate);
        lastActivity.setHours(0, 0, 0, 0);
        const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

        let newCurrentStreak = existingStreak.currentStreak;
        if (daysDiff === 1) {
          newCurrentStreak += 1;
        } else if (daysDiff > 1) {
          newCurrentStreak = 1;
        }

        await db.update(studyStreaks)
          .set({
            currentStreak: newCurrentStreak,
            longestStreak: Math.max(newCurrentStreak, existingStreak.longestStreak),
            lastActivityDate: today,
            isActive: true,
          })
          .where(eq(studyStreaks.id, existingStreak.id));
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update streak" });
    }
  });

  // Get user's learning goals
  app.get("/api/goals", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      
      const goals = await db.query.learningGoals.findMany({
        where: eq(learningGoals.userId, userId),
        orderBy: [desc(learningGoals.createdAt)],
      });

      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch goals" });
    }
  });

  // Create learning goal
  app.post("/api/goals", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const { title, description, targetValue, currentValue, deadline, type } = req.body;

      const [goal] = await db.insert(learningGoals).values({
        userId,
        title,
        description,
        targetValue,
        currentValue: currentValue || 0,
        deadline: deadline ? new Date(deadline) : undefined,
        type,
        isCompleted: false,
      }).returning();

      res.json(goal);
    } catch (error) {
      res.status(500).json({ error: "Failed to create goal" });
    }
  });

  // Update goal progress
  app.patch("/api/goals/:id/progress", requireAuth, async (req, res) => {
    try {
      const goalId = req.params.id;
      const { currentValue } = req.body;

      const goal = await db.query.learningGoals.findFirst({
        where: and(
          eq(learningGoals.id, goalId),
          eq(learningGoals.userId, req.user!.id)
        ),
      });

      if (!goal) {
        return res.status(404).json({ error: "Goal not found" });
      }

      const isCompleted = currentValue >= goal.targetValue;

      await db.update(learningGoals)
        .set({
          currentValue,
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        })
        .where(eq(learningGoals.id, goalId));

      res.json({ success: true, isCompleted });
    } catch (error) {
      res.status(500).json({ error: "Failed to update goal" });
    }
  });

  // Get user's achievements
  app.get("/api/achievements", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      
      const userAchievementsData = await db.query.userAchievements.findMany({
        where: eq(userAchievements.userId, userId),
        with: {
          achievement: true,
        },
      });

      res.json(userAchievementsData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  // Get available rewards
  app.get("/api/rewards", requireAuth, async (req, res) => {
    try {
      const allRewards = await db.query.rewards.findMany({
        where: eq(rewards.isActive, true),
      });

      res.json(allRewards);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rewards" });
    }
  });

  // Claim reward
  app.post("/api/rewards/:id/claim", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const rewardId = req.params.id;

      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      const reward = await db.query.rewards.findFirst({
        where: eq(rewards.id, rewardId),
      });

      if (!user || !reward) {
        return res.status(404).json({ error: "User or reward not found" });
      }

      if ((user.points || 0) < reward.pointsCost) {
        return res.status(400).json({ error: "Insufficient points" });
      }

      await db.insert(userRewards).values({
        userId,
        rewardId,
        claimedAt: new Date(),
      });

      await db.update(users)
        .set({ points: (user.points || 0) - reward.pointsCost })
        .where(eq(users.id, userId));

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to claim reward" });
    }
  });

  // Get leaderboard
  app.get("/api/leaderboard", requireAuth, async (req, res) => {
    try {
      const topUsers = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        points: users.points,
        rank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${users.points} DESC)`,
      })
        .from(users)
        .where(eq(users.role, "student"))
        .orderBy(desc(users.points))
        .limit(50);

      res.json(topUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });
}
