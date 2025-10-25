
import type { Express } from "express";
import { storage } from "./storage";
import { requireAuth, requireRole } from "./middleware/auth";

export function registerBlogRoutes(app: Express) {
  // Get all published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create blog post (admin only)
  app.post("/api/blog", requireAuth, requireRole('admin', 'tutor'), async (req, res) => {
    try {
      const userId = (req.user as any)?.id;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const post = await storage.createBlogPost({
        ...req.body,
        authorId: userId,
      });

      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update blog post
  app.patch("/api/blog/:id", requireAuth, requireRole('admin', 'tutor'), async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete blog post
  app.delete("/api/blog/:id", requireAuth, requireRole('admin'), async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}
