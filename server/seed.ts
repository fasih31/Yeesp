import { storage } from "./storage";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Hash a common password for testing
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create users
  const student1 = await storage.createUser({
    email: "student@yeesp.com",
    name: "Alice Johnson",
    password: hashedPassword,
    role: "student",
    bio: "Aspiring software developer passionate about learning new technologies",
    skills: ["JavaScript", "React", "Python"],
  });

  const tutor1 = await storage.createUser({
    email: "tutor@yeesp.com",
    name: "Dr. Robert Chen",
    password: hashedPassword,
    role: "tutor",
    headline: "Senior Software Engineer & Educator",
    bio: "10+ years of experience in full-stack development and teaching programming",
    skills: ["JavaScript", "TypeScript", "Node.js", "React", "System Design"],
    hourlyRate: "75",
    verified: true,
  });

  const tutor2 = await storage.createUser({
    email: "tutor2@yeesp.com",
    name: "Sarah Martinez",
    password: hashedPassword,
    role: "tutor",
    headline: "UX/UI Design Expert",
    bio: "Passionate about creating beautiful and functional user experiences",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    hourlyRate: "60",
    verified: true,
  });

  const freelancer1 = await storage.createUser({
    email: "freelancer@yeesp.com",
    name: "John Smith",
    password: hashedPassword,
    role: "freelancer",
    headline: "Full-Stack Developer",
    bio: "Building scalable web applications with modern technologies",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    hourlyRate: "80",
  });

  const recruiter1 = await storage.createUser({
    email: "recruiter@yeesp.com",
    name: "Tech Solutions Inc",
    password: hashedPassword,
    role: "recruiter",
    headline: "Leading Tech Consulting Firm",
    bio: "We help businesses transform through technology",
  });

  const admin1 = await storage.createUser({
    email: "admin@yeesp.com",
    name: "Admin User",
    password: hashedPassword,
    role: "admin",
    headline: "Platform Administrator",
    bio: "Managing and moderating the YEESP platform",
    verified: true,
  });

  // Create courses
  const course1 = await storage.createCourse({
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and deploy full-stack applications. Perfect for beginners!",
    instructorId: tutor1.id,
    category: "programming",
    price: "99.99",
    level: "beginner",
    duration: 40,
    published: true,
  });

  const course2 = await storage.createCourse({
    title: "Advanced React Patterns",
    description: "Master advanced React concepts including hooks, context, performance optimization, and state management",
    instructorId: tutor1.id,
    category: "programming",
    price: "149.99",
    level: "advanced",
    duration: 25,
    published: true,
  });

  const course3 = await storage.createCourse({
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design from scratch",
    instructorId: tutor2.id,
    category: "design",
    price: "79.99",
    level: "beginner",
    duration: 20,
    published: true,
  });

  const course4 = await storage.createCourse({
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning with Python",
    instructorId: tutor1.id,
    category: "data-science",
    price: "129.99",
    level: "intermediate",
    duration: 35,
    published: true,
  });

  const course5 = await storage.createCourse({
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, content strategy, and analytics",
    instructorId: tutor2.id,
    category: "marketing",
    price: "89.99",
    level: "beginner",
    duration: 18,
    published: true,
  });

  // Create lessons for course 1
  await storage.createLesson({
    courseId: course1.id,
    title: "Introduction to Web Development",
    content: "Welcome to the course! In this lesson, we'll cover what you'll learn and set up your development environment.",
    order: 1,
    duration: 30,
  });

  await storage.createLesson({
    courseId: course1.id,
    title: "HTML Basics",
    content: "Learn the building blocks of web pages with HTML tags, elements, and structure.",
    order: 2,
    duration: 45,
  });

  await storage.createLesson({
    courseId: course1.id,
    title: "CSS Fundamentals",
    content: "Style your web pages with CSS - selectors, properties, flexbox, and grid.",
    order: 3,
    duration: 60,
  });

  // Create enrollments
  const enrollment1 = await storage.createEnrollment({
    studentId: student1.id,
    courseId: course1.id,
    progress: 65,
  });

  // Create projects
  const project1 = await storage.createProject({
    recruiterId: recruiter1.id,
    title: "E-commerce Website Development",
    description: "Build a modern e-commerce platform with React, Node.js, and Stripe integration. Must include product catalog, shopping cart, and checkout.",
    budget: "5000",
    skills: ["React", "Node.js", "PostgreSQL", "Stripe"],
    status: "open",
  });

  const project2 = await storage.createProject({
    recruiterId: recruiter1.id,
    title: "Mobile App UI/UX Design",
    description: "Design user interface and user experience for a health & fitness mobile application. Deliverables include wireframes, mockups, and interactive prototype.",
    budget: "3000",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    status: "open",
  });

  const project3 = await storage.createProject({
    recruiterId: recruiter1.id,
    title: "Data Analytics Dashboard",
    description: "Create an interactive dashboard to visualize business metrics and KPIs using modern data visualization libraries.",
    budget: "4500",
    skills: ["React", "D3.js", "Python", "SQL"],
    status: "open",
  });

  // Create sessions
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0);

  await storage.createSession({
    tutorId: tutor1.id,
    studentId: student1.id,
    title: "JavaScript Fundamentals Review",
    scheduledAt: tomorrow,
    duration: 60,
    status: "scheduled",
    price: "75",
    meetingUrl: "https://meet.example.com/session-123",
  });

  // Create reviews
  await storage.createReview({
    reviewerId: student1.id,
    revieweeId: tutor1.id,
    entityType: "session",
    entityId: "session-1",
    rating: 5,
    comment: "Excellent tutor! Very knowledgeable and patient. Highly recommended!",
  });

  await storage.createReview({
    reviewerId: student1.id,
    revieweeId: tutor2.id,
    entityType: "session",
    entityId: "session-2",
    rating: 5,
    comment: "Great design insights and practical advice. Really helped improve my portfolio.",
  });

  console.log("✅ Database seeded successfully!");
  console.log("\nTest accounts (password for all: password123):");
  console.log("Admin:      admin@yeesp.com");
  console.log("Student:    student@yeesp.com");
  console.log("Tutor:      tutor@yeesp.com");
  console.log("Freelancer: freelancer@yeesp.com");
  console.log("Recruiter:  recruiter@yeesp.com");
}

seed().catch(console.error);
