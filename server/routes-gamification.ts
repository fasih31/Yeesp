import { Router } from "express";
import { requireAuth } from "./middleware/auth";
import { db } from "./db";
import { users, userRewards, rewards, achievements, userAchievements } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

const router = Router();

// Get user points and level
router.get("/profile/:userId", requireAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        name: true,
        email: true,
        points: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Get available rewards
router.get("/rewards", requireAuth, async (req, res) => {
  try {
    const allRewards = await db.select().from(rewards);
    res.json(allRewards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rewards" });
  }
});

// Claim a reward
router.post("/rewards/:rewardId/claim", requireAuth, async (req, res) => {
  try {
    const { rewardId } = req.params;
    const userId = req.user!.id;

    const reward = await db.query.rewards.findFirst({
      where: eq(rewards.id, rewardId),
    });

    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
router.get("/leaderboard", requireAuth, async (req, res) => {
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

export default router;