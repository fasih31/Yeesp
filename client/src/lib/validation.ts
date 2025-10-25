import { z } from "zod";

// Course validation
export const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title is too long"),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000, "Description is too long"),
  category: z.string().min(1, "Please select a category"),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select a difficulty level",
  }),
  price: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Price must be a valid number"),
  duration: z.number().min(1, "Duration must be at least 1 hour").max(1000, "Duration is too long"),
});

export const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  videoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
});

// Project validation
export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title is too long"),
  description: z.string().min(20, "Description must be at least 20 characters").max(5000, "Description is too long"),
  category: z.string().min(1, "Please select a category"),
  budget: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Budget must be a positive number"),
  skills: z.array(z.string()).min(1, "Add at least one required skill"),
  deadline: z.string().optional(),
});

// Bid validation
export const bidSchema = z.object({
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Bid amount must be a positive number"),
  proposal: z.string().min(50, "Proposal must be at least 50 characters").max(2000, "Proposal is too long"),
  timeline: z.string().min(3, "Please provide an estimated timeline"),
});

// Assignment validation
export const assignmentSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  dueDate: z.string().min(1, "Please set a due date"),
  totalPoints: z.number().min(1, "Points must be at least 1").max(1000, "Points cannot exceed 1000"),
});

// Submission validation
export const submissionSchema = z.object({
  content: z.string().min(10, "Submission content must be at least 10 characters"),
});

// Grading validation
export const gradingSchema = z.object({
  grade: z.number().min(0, "Grade cannot be negative").max(100, "Grade cannot exceed 100"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
});

// Support ticket validation
export const supportTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject is too long"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message is too long"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
});

// KYC document validation
export const kycDocumentSchema = z.object({
  documentType: z.enum(["passport", "drivers_license", "national_id", "proof_of_address"], {
    required_error: "Please select a document type",
  }),
  documentNumber: z.string().min(3, "Document number is required"),
});

// Message validation
export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty").max(2000, "Message is too long"),
});

// User registration validation
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password is too long"),
  role: z.enum(["student", "tutor", "freelancer", "recruiter"]),
});

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type CourseFormData = z.infer<typeof courseSchema>;
export type LessonFormData = z.infer<typeof lessonSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type BidFormData = z.infer<typeof bidSchema>;
export type AssignmentFormData = z.infer<typeof assignmentSchema>;
export type SubmissionFormData = z.infer<typeof submissionSchema>;
export type GradingFormData = z.infer<typeof gradingSchema>;
export type SupportTicketFormData = z.infer<typeof supportTicketSchema>;
export type KycDocumentFormData = z.infer<typeof kycDocumentSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
