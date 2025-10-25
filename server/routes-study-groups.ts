
import type { Express } from "express";
import { storage } from "./storage";
import { requireAuth, requireRole } from "./middleware/auth";

export function registerStudyGroupRoutes(app: Express) {
  // Get all study groups
  app.get("/api/study-groups", async (req, res) => {
    try {
      const groups = await storage.getStudyGroups();
      res.json(groups);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get study groups for a course
  app.get("/api/study-groups/course/:courseId", async (req, res) => {
    try {
      const groups = await storage.getStudyGroupsByCourse(req.params.courseId);
      res.json(groups);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create study group
  app.post("/api/study-groups", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const group = await storage.createStudyGroup({
        ...req.body,
        creatorId: userId,
      });

      // Automatically add creator as member
      await storage.joinStudyGroup(group.id, userId, "moderator");

      res.json(group);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Join study group
  app.post("/api/study-groups/:id/join", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const membership = await storage.joinStudyGroup(req.params.id, userId);
      res.json(membership);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Leave study group
  app.post("/api/study-groups/:id/leave", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      await storage.leaveStudyGroup(req.params.id, userId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get my study groups
  app.get("/api/study-groups/my", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const groups = await storage.getMyStudyGroups(userId);
      res.json(groups);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
