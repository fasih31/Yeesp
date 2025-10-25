import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with multi-role support
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'student', 'tutor', 'freelancer', 'recruiter', 'admin'
  avatar: text("avatar"),
  bio: text("bio"),
  headline: text("headline"),
  skills: text("skills").array(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Courses table
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructorId: varchar("instructor_id").notNull().references(() => users.id),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  thumbnail: text("thumbnail"),
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  duration: integer("duration"), // in hours
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Course lessons
export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  videoUrl: text("video_url"),
  order: integer("order").notNull(),
  duration: integer("duration"), // in minutes
});

// Course enrollments
export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => users.id),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  progress: integer("progress").default(0), // 0-100
  completed: boolean("completed").default(false),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
});

// Tutoring sessions
export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tutorId: varchar("tutor_id").notNull().references(() => users.id),
  studentId: varchar("student_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: text("status").notNull().default('scheduled'), // 'scheduled', 'in_progress', 'completed', 'cancelled'
  meetingUrl: text("meeting_url"),
  videoRoomId: text("video_room_id"),
  recordingUrl: text("recording_url"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Session attendance tracking
export const attendance = pgTable("attendance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => sessions.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  leftAt: timestamp("left_at"),
  duration: integer("duration"),
  status: text("status").notNull().default('present'),
  notes: text("notes"),
});

// Freelance projects
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  recruiterId: varchar("recruiter_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budget: decimal("budget", { precision: 10, scale: 2 }).notNull(),
  skills: text("skills").array(),
  deadline: timestamp("deadline"),
  status: text("status").notNull().default('open'), // 'open', 'in_progress', 'completed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Project bids/applications
export const bids = pgTable("bids", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  freelancerId: varchar("freelancer_id").notNull().references(() => users.id),
  proposal: text("proposal").notNull(),
  bidAmount: decimal("bid_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'accepted', 'rejected'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews/Ratings
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  reviewerId: varchar("reviewer_id").notNull().references(() => users.id),
  revieweeId: varchar("reviewee_id").notNull().references(() => users.id),
  entityType: text("entity_type").notNull(), // 'course', 'session', 'project'
  entityId: varchar("entity_id").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Payments
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).notNull(),
  netAmount: decimal("net_amount", { precision: 10, scale: 2 }).notNull(),
  entityType: text("entity_type").notNull(), // 'course', 'session', 'project'
  entityId: varchar("entity_id").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  status: text("status").notNull().default('pending'), // 'pending', 'completed', 'failed', 'refunded'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Certificates
export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => users.id),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  certificateUrl: text("certificate_url"),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
});

// Notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(), // 'course', 'assignment', 'message', 'payment', 'system'
  title: text("title").notNull(),
  message: text("message").notNull(),
  link: text("link"),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Assignments
export const assignments = pgTable("assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  tutorId: varchar("tutor_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dueDate: timestamp("due_date").notNull(),
  totalPoints: integer("total_points").notNull(),
  attachments: text("attachments").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Assignment Submissions
export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assignmentId: varchar("assignment_id").notNull().references(() => assignments.id),
  studentId: varchar("student_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  attachments: text("attachments").array(),
  grade: integer("grade"),
  feedback: text("feedback"),
  status: text("status").notNull().default('pending'), // 'pending', 'graded', 'late'
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  gradedAt: timestamp("graded_at"),
});

// Messages/Chat
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  attachments: text("attachments").array(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Support Tickets
export const supportTickets = pgTable("support_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'technical', 'billing', 'general'
  priority: text("priority").notNull().default('medium'), // 'low', 'medium', 'high', 'urgent'
  status: text("status").notNull().default('open'), // 'open', 'in_progress', 'resolved', 'closed'
  assignedTo: varchar("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Ticket Replies
export const ticketReplies = pgTable("ticket_replies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketId: varchar("ticket_id").notNull().references(() => supportTickets.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  message: text("message").notNull(),
  attachments: text("attachments").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contracts & Milestones
export const contracts = pgTable("contracts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  freelancerId: varchar("freelancer_id").notNull().references(() => users.id),
  recruiterId: varchar("recruiter_id").notNull().references(() => users.id),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default('active'), // 'active', 'completed', 'cancelled', 'disputed'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const milestones = pgTable("milestones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contractId: varchar("contract_id").notNull().references(() => contracts.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'submitted', 'approved', 'rejected', 'paid'
  completedAt: timestamp("completed_at"),
  approvedAt: timestamp("approved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// KYC Documents
export const kycDocuments = pgTable("kyc_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  documentType: text("document_type").notNull(), // 'id_card', 'passport', 'selfie', 'address_proof'
  documentUrl: text("document_url").notNull(),
  status: text("status").notNull().default('pending'), // 'pending', 'approved', 'rejected'
  rejectionReason: text("rejection_reason"),
  verifiedBy: varchar("verified_by").references(() => users.id),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  verifiedAt: timestamp("verified_at"),
});

// Disputes
export const disputes = pgTable("disputes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  raisedBy: varchar("raised_by").notNull().references(() => users.id),
  entityType: text("entity_type").notNull(), // 'project', 'session', 'payment'
  entityId: varchar("entity_id").notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default('open'), // 'open', 'investigating', 'resolved', 'closed'
  resolution: text("resolution"),
  resolvedBy: varchar("resolved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Wallets/Escrow
export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  balance: decimal("balance", { precision: 10, scale: 2 }).notNull().default('0'),
  escrowBalance: decimal("escrow_balance", { precision: 10, scale: 2 }).notNull().default('0'),
  currency: text("currency").notNull().default('USD'),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const walletTransactions = pgTable("wallet_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletId: varchar("wallet_id").notNull().references(() => wallets.id),
  type: text("type").notNull(), // 'deposit', 'withdrawal', 'escrow_hold', 'escrow_release', 'earning', 'payout'
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  referenceId: varchar("reference_id"), // Reference to payment, project, etc.
  status: text("status").notNull().default('completed'), // 'pending', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ===== INSERT SCHEMAS AND TYPES =====

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertSessionSchema = createInsertSchema(sessions).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertBidSchema = createInsertSchema(bids).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  issuedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({
  id: true,
  createdAt: true,
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  submittedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTicketReplySchema = createInsertSchema(ticketReplies).omit({
  id: true,
  createdAt: true,
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
  createdAt: true,
});

export const insertKycDocumentSchema = createInsertSchema(kycDocuments).omit({
  id: true,
  submittedAt: true,
});

export const insertDisputeSchema = createInsertSchema(disputes).omit({
  id: true,
  createdAt: true,
});

export const insertWalletSchema = createInsertSchema(wallets).omit({
  id: true,
  updatedAt: true,
});

export const insertWalletTransactionSchema = createInsertSchema(walletTransactions).omit({
  id: true,
  createdAt: true,
});

// ===== SELECT TYPES =====

export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Bid = typeof bids.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Assignment = typeof assignments.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type SupportTicket = typeof supportTickets.$inferSelect;
export type TicketReply = typeof ticketReplies.$inferSelect;
export type Contract = typeof contracts.$inferSelect;
export type Milestone = typeof milestones.$inferSelect;
export type KycDocument = typeof kycDocuments.$inferSelect;
export type Dispute = typeof disputes.$inferSelect;
export type Wallet = typeof wallets.$inferSelect;
export type WalletTransaction = typeof walletTransactions.$inferSelect;

// ===== INSERT TYPES =====

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertBid = z.infer<typeof insertBidSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type InsertTicketReply = z.infer<typeof insertTicketReplySchema>;
export type InsertContract = z.infer<typeof insertContractSchema>;
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type InsertKycDocument = z.infer<typeof insertKycDocumentSchema>;
export type InsertDispute = z.infer<typeof insertDisputeSchema>;
export type InsertWallet = z.infer<typeof insertWalletSchema>;
export type InsertWalletTransaction = z.infer<typeof insertWalletTransactionSchema>;
