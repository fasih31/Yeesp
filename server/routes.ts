import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertEnrollmentSchema, insertSessionSchema, insertProjectSchema, insertBidSchema, insertReviewSchema } from "@shared/schema";
import Stripe from "stripe";
import bcrypt from "bcryptjs";

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    })
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // ===== AUTH ROUTES =====
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if user exists
      const existing = await storage.getUserByEmail(data.email);
      if (existing) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await storage.createUser({
        ...data,
        password: hashedPassword,
      });

      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== USER ROUTES =====
  
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== COURSE ROUTES =====
  
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      
      // Fetch instructors for each course
      const coursesWithInstructors = await Promise.all(
        courses.map(async (course) => {
          const instructor = await storage.getUser(course.instructorId);
          return { ...course, instructor };
        })
      );
      
      res.json(coursesWithInstructors);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      
      const instructor = await storage.getUser(course.instructorId);
      const lessons = await storage.getLessonsByCourse(course.id);
      
      res.json({ ...course, instructor, lessons });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const data = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(data);
      res.json(course);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.updateCourse(req.params.id, req.body);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    try {
      await storage.deleteCourse(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== ENROLLMENT ROUTES =====
  
  app.get("/api/enrollments/my", async (req, res) => {
    try {
      // In production, get userId from session
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const enrollments = await storage.getEnrollmentsByStudent(userId);
      
      // Fetch course details for each enrollment
      const enrollmentsWithCourses = await Promise.all(
        enrollments.map(async (enrollment) => {
          const course = await storage.getCourse(enrollment.courseId);
          return { ...enrollment, course };
        })
      );
      
      res.json(enrollmentsWithCourses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/enrollments", async (req, res) => {
    try {
      const data = insertEnrollmentSchema.parse(req.body);
      
      // Check if already enrolled
      const existing = await storage.getEnrollment(data.studentId, data.courseId);
      if (existing) {
        return res.status(400).json({ error: "Already enrolled in this course" });
      }

      const enrollment = await storage.createEnrollment(data);
      res.json(enrollment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/enrollments/:id", async (req, res) => {
    try {
      const enrollment = await storage.updateEnrollment(req.params.id, req.body);
      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      // If course completed (100%), generate certificate
      if (enrollment.completed && !req.body.certificateGenerated) {
        await storage.createCertificate({
          studentId: enrollment.studentId,
          courseId: enrollment.courseId,
          certificateUrl: `/certificates/${enrollment.id}.pdf`,
        });
      }

      res.json(enrollment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== TUTOR ROUTES =====
  
  app.get("/api/tutors", async (req, res) => {
    try {
      const tutors = await storage.getUsersByRole("tutor");
      
      // Add rating stats for each tutor
      const tutorsWithStats = await Promise.all(
        tutors.map(async (tutor) => {
          const reviews = await storage.getReviewsByReviewee(tutor.id);
          const avgRating = reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : undefined;
          
          return {
            ...tutor,
            avgRating,
            reviewCount: reviews.length,
          };
        })
      );
      
      res.json(tutorsWithStats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== SESSION ROUTES =====
  
  app.get("/api/sessions/my", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const role = req.query.role as string;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const sessions = role === "tutor"
        ? await storage.getSessionsByTutor(userId)
        : await storage.getSessionsByStudent(userId);
      
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      const data = insertSessionSchema.parse(req.body);
      const session = await storage.createSession(data);
      res.json(session);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.updateSession(req.params.id, req.body);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      res.json(session);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PROJECT ROUTES =====
  
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      
      // Fetch recruiter and bid count for each project
      const projectsWithDetails = await Promise.all(
        projects.map(async (project) => {
          const recruiter = await storage.getUser(project.recruiterId);
          const bids = await storage.getBidsByProject(project.id);
          return { ...project, recruiter, bidCount: bids.length };
        })
      );
      
      res.json(projectsWithDetails);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      const recruiter = await storage.getUser(project.recruiterId);
      const bids = await storage.getBidsByProject(project.id);
      
      res.json({ ...project, recruiter, bids });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== BID ROUTES =====
  
  app.post("/api/bids", async (req, res) => {
    try {
      const data = insertBidSchema.parse(req.body);
      const bid = await storage.createBid(data);
      res.json(bid);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/bids/:id", async (req, res) => {
    try {
      const bid = await storage.updateBid(req.params.id, req.body);
      if (!bid) {
        return res.status(404).json({ error: "Bid not found" });
      }
      res.json(bid);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== REVIEW ROUTES =====
  
  app.post("/api/reviews", async (req, res) => {
    try {
      const data = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(data);
      res.json(review);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // ===== CERTIFICATE ROUTES =====
  
  app.get("/api/certificates/my", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const certificates = await storage.getCertificatesByStudent(userId);
      res.json(certificates);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== PAYMENT ROUTES (STRIPE) =====
  
  app.post("/api/payments/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Payment processing is not configured. Please add STRIPE_SECRET_KEY to environment variables." });
      }

      const { amount, currency = "usd", entityType, entityId, userId } = req.body;

      // Calculate platform fee (7%)
      const platformFeeAmount = Math.round(amount * 0.07);
      const netAmount = amount - platformFeeAmount;

      // Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata: {
          entityType,
          entityId,
          userId,
        },
      });

      // Create payment record
      await storage.createPayment({
        userId,
        amount: amount.toString(),
        platformFee: (platformFeeAmount / 100).toString(),
        netAmount: (netAmount / 100).toString(),
        entityType,
        entityId,
        stripePaymentId: paymentIntent.id,
        status: "pending",
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/payments/confirm", async (req, res) => {
    try {
      const { paymentIntentId } = req.body;

      // Retrieve payment from database
      const payments = await storage.getPaymentsByUser(req.body.userId);
      const payment = payments.find(p => p.stripePaymentId === paymentIntentId);

      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      // Update payment status
      await storage.updatePayment(payment.id, { status: "completed" });

      // Handle post-payment actions based on entity type
      if (payment.entityType === "course") {
        // Create enrollment
        await storage.createEnrollment({
          studentId: payment.userId,
          courseId: payment.entityId,
        });
      }

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ===== NOTIFICATION ROUTES =====
  
  app.get("/api/notifications/my", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const notifications = await storage.getNotificationsByUser(userId);
      res.json(notifications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/notifications/mark-read", async (req, res) => {
    try {
      const { userId } = req.body;
      await storage.markNotificationsAsRead(userId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
