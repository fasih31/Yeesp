import { Router } from "express";
import { db } from "./db";
import { users, courses, projects, kycDocuments, disputes, payments, sessions } from "@shared/schema";
import { eq, count, sql } from "drizzle-orm";

const router = Router();

// Get admin statistics
router.get("/stats", async (req, res) => {
  try {
    // Count totals
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [totalCourses] = await db.select({ count: count() }).from(courses);
    const [totalProjects] = await db.select({ count: count() }).from(projects);
    
    const [pendingKYC] = await db
      .select({ count: count() })
      .from(kycDocuments)
      .where(eq(kycDocuments.status, 'pending'));
    
    const [openDisputes] = await db
      .select({ count: count() })
      .from(disputes)
      .where(eq(disputes.status, 'open'));
    
    // Calculate total revenue
    const [revenueResult] = await db
      .select({ total: sql<string>`COALESCE(SUM(${payments.platformFee}), 0)` })
      .from(payments)
      .where(eq(payments.status, 'completed'));
    
    // Get active sessions count
    const [activeSessions] = await db
      .select({ count: count() })
      .from(sessions)
      .where(eq(sessions.status, 'in_progress'));
    
    // Get recent activities (simplified - you can enhance this)
    const recentActivities = [
      { id: '1', description: 'New user registered', createdAt: new Date() },
      { id: '2', description: 'Course published', createdAt: new Date() },
    ];

    res.json({
      totalUsers: totalUsers.count,
      totalCourses: totalCourses.count,
      totalProjects: totalProjects.count,
      pendingKYC: pendingKYC.count,
      openDisputes: openDisputes.count,
      revenue: parseFloat(revenueResult.total),
      activeSessions: activeSessions.count,
      recentActivities,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

export default router;
