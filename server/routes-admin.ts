import { Router } from "express";
import { db } from "./db";
import { users, courses, projects, kycDocuments, disputes, payments, sessions } from "@shared/schema";
import { eq, count, sql } from "drizzle-orm";
import { requireAuth, requireRole } from "./middleware/auth";
import bcrypt from "bcryptjs";

const router = Router();

// Get admin statistics
router.get("/stats", requireAuth, requireRole('admin'), async (req, res) => {
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

// Get all admin users
router.get("/admins", requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const adminUsers = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.role, 'admin'));

    res.json(adminUsers);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Failed to fetch administrators" });
  }
});

// Create new admin
router.post("/admins", requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const [newAdmin] = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: hashedPassword,
        role: 'admin',
        bio: 'Platform Administrator',
        expertise: 'Platform Management',
        hourlyRate: 0,
      })
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        createdAt: users.createdAt,
      });

    res.json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Failed to create administrator" });
  }
});

// Remove admin
router.delete("/admins/:id", requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const adminId = req.params.id;
    const currentUserId = (req as any).user?.id;

    // Prevent self-deletion
    if (adminId === currentUserId) {
      return res.status(400).json({ error: "You cannot remove your own admin account" });
    }

    // Check if user exists and is admin
    const [userToRemove] = await db
      .select()
      .from(users)
      .where(eq(users.id, adminId))
      .limit(1);

    if (!userToRemove) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToRemove.role !== 'admin') {
      return res.status(400).json({ error: "User is not an administrator" });
    }

    // Count remaining admins
    const [adminCount] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, 'admin'));

    // Prevent removing the last admin
    if (adminCount.count <= 1) {
      return res.status(400).json({ error: "Cannot remove the last administrator" });
    }

    // Delete the admin user
    await db.delete(users).where(eq(users.id, adminId));

    res.json({ success: true, message: "Administrator removed successfully" });
  } catch (error) {
    console.error("Error removing admin:", error);
    res.status(500).json({ error: "Failed to remove administrator" });
  }
});

export default router;
