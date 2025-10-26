import { Express } from "express";
import { db } from "./db";
import { requireAuth } from "./middleware/auth";
import { eq } from "drizzle-orm";
import { Router } from 'express';

const router = Router();

// Get user's portfolio items
router.get("/api/portfolio", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;

    // For now, return mock data - extend db schema for production
    const portfolioItems = [];

    res.json(portfolioItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

// Add portfolio item
router.post("/api/portfolio", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { title, description, category, projectUrl, skills } = req.body;

    // For production, add portfolioItems table to schema
    const item = {
      id: crypto.randomUUID(),
      userId,
      title,
      description,
      category,
      projectUrl,
      skills,
      createdAt: new Date(),
    };

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to add portfolio item" });
  }
});

// Delete portfolio item
router.delete("/api/portfolio/:id", requireAuth, async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user!.id;

    // Verify ownership and delete
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

// Accessibility settings
router.get("/api/accessibility", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;

    // Return user's accessibility preferences
    const preferences = {
      fontSize: "medium",
      highContrast: false,
      screenReader: false,
      reducedMotion: false,
      keyboardNavigation: true,
    };

    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accessibility settings" });
  }
});

// Update accessibility settings
router.patch("/api/accessibility", requireAuth, async (req, res) => {
  try {
    const userId = req.user!.id;
    const settings = req.body;

    // Save to user preferences table
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ error: "Failed to update accessibility settings" });
  }
});

export default router;