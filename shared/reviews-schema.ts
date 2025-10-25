import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Reviews for courses
export const courseReviews = pgTable("course_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").notNull(),
  studentId: varchar("student_id").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews for tutors
export const tutorReviews = pgTable("tutor_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tutorId: varchar("tutor_id").notNull(),
  studentId: varchar("student_id").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  sessionId: varchar("session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reviews for freelancers
export const freelancerReviews = pgTable("freelancer_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  freelancerId: varchar("freelancer_id").notNull(),
  clientId: varchar("client_id").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  projectId: varchar("project_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
