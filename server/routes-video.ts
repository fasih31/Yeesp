import type { Express } from "express";
import { z } from "zod";
import * as videoStorage from "./storage-video";

export function registerVideoRoutes(app: Express) {
  // Start video session
  app.post("/api/sessions/:id/start-video", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const sessionId = req.params.id;
      
      // Generate Dyte room (simplified - in production, call Dyte API)
      const videoRoomId = `room_${sessionId}_${Date.now()}`;
      const meetingUrl = `/video/${videoRoomId}`;

      const session = await videoStorage.updateSessionVideo(sessionId, {
        videoRoomId,
        meetingUrl,
        status: 'in_progress',
        startedAt: new Date(),
      });

      res.json(session);
    } catch (error) {
      next(error);
    }
  });

  // End video session
  app.post("/api/sessions/:id/end-video", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const sessionId = req.params.id;
      
      const session = await videoStorage.updateSessionVideo(sessionId, {
        status: 'completed',
        endedAt: new Date(),
      });

      // Mark absent students
      await videoStorage.markAbsentStudents(sessionId);

      res.json(session);
    } catch (error) {
      next(error);
    }
  });

  // Record attendance when user joins video
  app.post("/api/sessions/:id/join", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const sessionId = req.params.id;
      const userId = req.user!.id;

      const record = await videoStorage.recordAttendance(sessionId, userId);
      
      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  // Update attendance when user leaves video
  app.post("/api/attendance/:id/leave", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const attendanceId = req.params.id;
      const leftAt = new Date();

      const record = await videoStorage.updateAttendanceOnLeave(attendanceId, leftAt);
      
      res.json(record);
    } catch (error) {
      next(error);
    }
  });

  // Get session with attendance
  app.get("/api/sessions/:id/attendance", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const sessionId = req.params.id;
      const session = await videoStorage.getSessionWithAttendance(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json(session);
    } catch (error) {
      next(error);
    }
  });

  // Get user's attendance history
  app.get("/api/users/:id/attendance", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = req.params.id;
      
      // Only allow users to see their own attendance or tutors to see their students
      if (req.user!.id !== userId && req.user!.role !== 'admin') {
        return res.status(403).json({ error: "Forbidden" });
      }

      const attendance = await videoStorage.getUserAttendance(userId);
      
      res.json(attendance);
    } catch (error) {
      next(error);
    }
  });

  // Get tutor's attendance statistics
  app.get("/api/tutors/:id/attendance-stats", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const tutorId = req.params.id;
      
      // Only allow tutors to see their own stats or admins
      if (req.user!.id !== tutorId && req.user!.role !== 'admin') {
        return res.status(403).json({ error: "Forbidden" });
      }

      const stats = await videoStorage.getTutorAttendanceStats(tutorId);
      
      res.json(stats);
    } catch (error) {
      next(error);
    }
  });

  // Update attendance notes (tutor only)
  app.patch("/api/attendance/:id/notes", async (req, res, next) => {
    try {
      if (!req.isAuthenticated() || req.user!.role !== 'tutor') {
        return res.status(403).json({ error: "Forbidden" });
      }

      const attendanceId = req.params.id;
      const { notes, status } = req.body;

      const record = await videoStorage.updateAttendanceOnLeave(attendanceId, new Date());
      
      res.json(record);
    } catch (error) {
      next(error);
    }
  });
}
