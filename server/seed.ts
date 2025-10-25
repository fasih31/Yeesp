
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { db } from "./db";
import * as schema from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding comprehensive test data...\n");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // ===== CREATE USERS =====
  console.log("👥 Creating users...");
  
  const admin = await storage.createUser({
    email: "admin@yeesp.com",
    name: "System Admin",
    password: hashedPassword,
    role: "admin",
    headline: "Platform Administrator",
    bio: "Managing and moderating the YEESP platform",
    verified: true,
  });

  const students = await Promise.all([
    storage.createUser({
      email: "alice@yeesp.com",
      name: "Alice Johnson",
      password: hashedPassword,
      role: "student",
      bio: "Aspiring software developer passionate about learning",
      skills: ["JavaScript", "React", "Python"],
    }),
    storage.createUser({
      email: "bob@yeesp.com",
      name: "Bob Smith",
      password: hashedPassword,
      role: "student",
      bio: "Computer Science student seeking practical skills",
      skills: ["Java", "SQL", "Data Structures"],
    }),
    storage.createUser({
      email: "carol@yeesp.com",
      name: "Carol Davis",
      password: hashedPassword,
      role: "student",
      bio: "Career switcher learning web development",
      skills: ["HTML", "CSS", "JavaScript"],
    }),
  ]);

  const tutors = await Promise.all([
    storage.createUser({
      email: "tutor1@yeesp.com",
      name: "Dr. Robert Chen",
      password: hashedPassword,
      role: "tutor",
      headline: "Senior Software Engineer & Educator",
      bio: "10+ years of experience in full-stack development and teaching",
      skills: ["JavaScript", "TypeScript", "Node.js", "React", "System Design"],
      hourlyRate: "75",
      verified: true,
    }),
    storage.createUser({
      email: "tutor2@yeesp.com",
      name: "Sarah Martinez",
      password: hashedPassword,
      role: "tutor",
      headline: "UX/UI Design Expert",
      bio: "Passionate about creating beautiful user experiences",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      hourlyRate: "60",
      verified: true,
    }),
    storage.createUser({
      email: "tutor3@yeesp.com",
      name: "Prof. David Lee",
      password: hashedPassword,
      role: "tutor",
      headline: "AI/ML Specialist",
      bio: "PhD in Computer Science, specializing in Machine Learning",
      skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
      hourlyRate: "100",
      verified: true,
    }),
  ]);

  const freelancers = await Promise.all([
    storage.createUser({
      email: "freelancer1@yeesp.com",
      name: "John Smith",
      password: hashedPassword,
      role: "freelancer",
      headline: "Full-Stack Developer",
      bio: "Building scalable web applications with modern tech",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      hourlyRate: "80",
    }),
    storage.createUser({
      email: "freelancer2@yeesp.com",
      name: "Emily Wilson",
      password: hashedPassword,
      role: "freelancer",
      headline: "Mobile App Developer",
      bio: "Creating beautiful mobile experiences",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      hourlyRate: "70",
    }),
  ]);

  const recruiters = await Promise.all([
    storage.createUser({
      email: "recruiter1@yeesp.com",
      name: "Tech Solutions Inc",
      password: hashedPassword,
      role: "recruiter",
      headline: "Leading Tech Consulting Firm",
      bio: "Helping businesses transform through technology",
    }),
    storage.createUser({
      email: "recruiter2@yeesp.com",
      name: "StartupCo Hiring",
      password: hashedPassword,
      role: "recruiter",
      headline: "Fast-Growing Startup",
      bio: "Looking for innovative talent to join our team",
    }),
  ]);

  console.log(`✅ Created ${students.length} students, ${tutors.length} tutors, ${freelancers.length} freelancers, ${recruiters.length} recruiters\n`);

  // ===== CREATE COURSES =====
  console.log("📚 Creating courses...");
  
  const courses = await Promise.all([
    storage.createCourse({
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js, and deploy full-stack applications. Perfect for beginners!",
      instructorId: tutors[0].id,
      category: "programming",
      price: "99.99",
      level: "beginner",
      duration: 40,
      published: true,
    }),
    storage.createCourse({
      title: "Advanced React Patterns",
      description: "Master advanced React concepts including hooks, context, performance optimization, and state management",
      instructorId: tutors[0].id,
      category: "programming",
      price: "149.99",
      level: "advanced",
      duration: 25,
      published: true,
    }),
    storage.createCourse({
      title: "UI/UX Design Fundamentals",
      description: "Learn the principles of user interface and user experience design from scratch",
      instructorId: tutors[1].id,
      category: "design",
      price: "79.99",
      level: "beginner",
      duration: 20,
      published: true,
    }),
    storage.createCourse({
      title: "Machine Learning with Python",
      description: "Master data analysis, visualization, and machine learning algorithms",
      instructorId: tutors[2].id,
      category: "data-science",
      price: "129.99",
      level: "intermediate",
      duration: 35,
      published: true,
    }),
    storage.createCourse({
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile apps for iOS and Android",
      instructorId: tutors[0].id,
      category: "programming",
      price: "119.99",
      level: "intermediate",
      duration: 30,
      published: true,
    }),
  ]);

  console.log(`✅ Created ${courses.length} courses\n`);

  // ===== CREATE LESSONS =====
  console.log("📖 Creating lessons...");
  
  let lessonCount = 0;
  for (const course of courses.slice(0, 2)) {
    await Promise.all([
      storage.createLesson({
        courseId: course.id,
        title: "Introduction and Setup",
        content: "Welcome! Set up your development environment and learn what you'll build.",
        order: 1,
        duration: 30,
      }),
      storage.createLesson({
        courseId: course.id,
        title: "Core Concepts",
        content: "Deep dive into the fundamental concepts you need to master.",
        order: 2,
        duration: 45,
      }),
      storage.createLesson({
        courseId: course.id,
        title: "Hands-on Project",
        content: "Build your first project applying everything you've learned.",
        order: 3,
        duration: 60,
      }),
    ]);
    lessonCount += 3;
  }

  console.log(`✅ Created ${lessonCount} lessons\n`);

  // ===== CREATE ENROLLMENTS =====
  console.log("🎓 Creating enrollments...");
  
  const enrollments = await Promise.all([
    storage.createEnrollment({ studentId: students[0].id, courseId: courses[0].id, progress: 65 }),
    storage.createEnrollment({ studentId: students[0].id, courseId: courses[1].id, progress: 30 }),
    storage.createEnrollment({ studentId: students[1].id, courseId: courses[0].id, progress: 45 }),
    storage.createEnrollment({ studentId: students[1].id, courseId: courses[3].id, progress: 80 }),
    storage.createEnrollment({ studentId: students[2].id, courseId: courses[2].id, progress: 100, completed: true }),
    storage.createEnrollment({ studentId: students[2].id, courseId: courses[4].id, progress: 20 }),
  ]);

  console.log(`✅ Created ${enrollments.length} enrollments\n`);

  // ===== CREATE TUTORING SESSIONS =====
  console.log("🎯 Creating tutoring sessions...");
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(10, 0, 0, 0);

  const sessions = await Promise.all([
    storage.createSession({
      tutorId: tutors[0].id,
      studentId: students[0].id,
      title: "JavaScript Fundamentals Review",
      scheduledAt: tomorrow,
      duration: 60,
      status: "scheduled",
      price: "75",
      meetingUrl: "https://meet.example.com/session-123",
    }),
    storage.createSession({
      tutorId: tutors[1].id,
      studentId: students[1].id,
      title: "UI/UX Portfolio Review",
      scheduledAt: nextWeek,
      duration: 90,
      status: "scheduled",
      price: "60",
      meetingUrl: "https://meet.example.com/session-456",
    }),
    storage.createSession({
      tutorId: tutors[2].id,
      studentId: students[2].id,
      title: "Machine Learning Career Guidance",
      scheduledAt: tomorrow,
      duration: 120,
      status: "scheduled",
      price: "100",
      meetingUrl: "https://meet.example.com/session-789",
    }),
  ]);

  console.log(`✅ Created ${sessions.length} tutoring sessions\n`);

  // ===== CREATE PROJECTS =====
  console.log("💼 Creating freelance projects...");
  
  const projects = await Promise.all([
    storage.createProject({
      recruiterId: recruiters[0].id,
      title: "E-commerce Website Development",
      description: "Build a modern e-commerce platform with React, Node.js, and Stripe integration. Must include product catalog, shopping cart, and checkout.",
      budget: "5000",
      skills: ["React", "Node.js", "PostgreSQL", "Stripe"],
      status: "open",
    }),
    storage.createProject({
      recruiterId: recruiters[0].id,
      title: "Mobile App UI/UX Design",
      description: "Design user interface and user experience for a health & fitness mobile application. Deliverables include wireframes, mockups, and interactive prototype.",
      budget: "3000",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
      status: "open",
    }),
    storage.createProject({
      recruiterId: recruiters[1].id,
      title: "Data Analytics Dashboard",
      description: "Create an interactive dashboard to visualize business metrics and KPIs using modern data visualization libraries.",
      budget: "4500",
      skills: ["React", "D3.js", "Python", "SQL"],
      status: "open",
    }),
    storage.createProject({
      recruiterId: recruiters[1].id,
      title: "AI Chatbot Development",
      description: "Develop an intelligent chatbot using NLP and machine learning for customer support automation.",
      budget: "6000",
      skills: ["Python", "TensorFlow", "NLP", "API Development"],
      status: "in_progress",
    }),
  ]);

  console.log(`✅ Created ${projects.length} projects\n`);

  // ===== CREATE BIDS =====
  console.log("📝 Creating project bids...");
  
  const bids = await Promise.all([
    storage.createBid({
      projectId: projects[0].id,
      freelancerId: freelancers[0].id,
      proposal: "I have 5+ years of experience building e-commerce platforms. I can deliver this project within 6 weeks with all features included.",
      bidAmount: "4800",
      status: "pending",
    }),
    storage.createBid({
      projectId: projects[1].id,
      freelancerId: freelancers[1].id,
      proposal: "As a UI/UX specialist, I've designed 20+ mobile apps. I'll provide modern designs with full prototypes.",
      bidAmount: "2800",
      status: "accepted",
    }),
    storage.createBid({
      projectId: projects[2].id,
      freelancerId: freelancers[0].id,
      proposal: "I specialize in data visualization. I'll create an interactive dashboard with real-time updates.",
      bidAmount: "4200",
      status: "pending",
    }),
  ]);

  console.log(`✅ Created ${bids.length} bids\n`);

  // ===== CREATE REVIEWS =====
  console.log("⭐ Creating reviews...");
  
  const reviews = await Promise.all([
    storage.createReview({
      reviewerId: students[0].id,
      revieweeId: tutors[0].id,
      entityType: "session",
      entityId: sessions[0].id,
      rating: 5,
      comment: "Excellent tutor! Very knowledgeable and patient. Highly recommended!",
    }),
    storage.createReview({
      reviewerId: students[1].id,
      revieweeId: tutors[1].id,
      entityType: "session",
      entityId: sessions[1].id,
      rating: 5,
      comment: "Great design insights and practical advice. Really helped improve my portfolio.",
    }),
    storage.createReview({
      reviewerId: students[2].id,
      revieweeId: tutors[0].id,
      entityType: "course",
      entityId: courses[0].id,
      rating: 4,
      comment: "Comprehensive course with great content. Would love more real-world projects.",
    }),
  ]);

  console.log(`✅ Created ${reviews.length} reviews\n`);

  // ===== CREATE PAYMENTS =====
  console.log("💳 Creating payments...");
  
  const payments = await Promise.all([
    storage.createPayment({
      userId: students[0].id,
      amount: "99.99",
      platformFee: "6.99",
      netAmount: "93.00",
      entityType: "course",
      entityId: courses[0].id,
      status: "completed",
      stripePaymentId: "pi_test_001",
    }),
    storage.createPayment({
      userId: students[1].id,
      amount: "129.99",
      platformFee: "9.09",
      netAmount: "120.90",
      entityType: "course",
      entityId: courses[3].id,
      status: "completed",
      stripePaymentId: "pi_test_002",
    }),
    storage.createPayment({
      userId: students[0].id,
      amount: "75.00",
      platformFee: "5.25",
      netAmount: "69.75",
      entityType: "session",
      entityId: sessions[0].id,
      status: "completed",
      stripePaymentId: "pi_test_003",
    }),
  ]);

  console.log(`✅ Created ${payments.length} payments\n`);

  // ===== CREATE CERTIFICATES =====
  console.log("🏆 Creating certificates...");
  
  const certificates = await Promise.all([
    storage.createCertificate({
      studentId: students[2].id,
      courseId: courses[2].id,
      certificateUrl: `/certificates/${students[2].id}-${courses[2].id}.pdf`,
    }),
  ]);

  console.log(`✅ Created ${certificates.length} certificates\n`);

  // ===== CREATE STUDY GROUPS =====
  console.log("👥 Creating study groups...");
  
  const studyGroups = await Promise.all([
    db.insert(schema.studyGroups).values({
      name: "Web Dev Beginners",
      description: "Study group for students learning web development basics",
      courseId: courses[0].id,
      creatorId: students[0].id,
      maxMembers: 10,
      meetingSchedule: "Every Monday 7 PM EST",
    }).returning().then(r => r[0]),
    db.insert(schema.studyGroups).values({
      name: "React Masters",
      description: "Advanced React patterns and best practices discussion",
      courseId: courses[1].id,
      creatorId: students[1].id,
      maxMembers: 8,
      meetingSchedule: "Wednesdays 6 PM EST",
    }).returning().then(r => r[0]),
  ]);

  console.log(`✅ Created ${studyGroups.length} study groups\n`);

  // ===== CREATE BLOG POSTS =====
  console.log("📰 Creating blog posts...");
  
  const blogPosts = await Promise.all([
    db.insert(schema.blogPosts).values({
      title: "10 Tips for Learning Web Development in 2024",
      slug: "10-tips-web-development-2024",
      content: "Web development is an exciting field with endless opportunities. Here are 10 essential tips to accelerate your learning journey...",
      excerpt: "Essential tips to accelerate your web development learning journey",
      authorId: tutors[0].id,
      category: "Education",
      tags: ["Web Development", "Learning", "Career"],
      published: true,
      publishedAt: new Date(),
    }).returning().then(r => r[0]),
    db.insert(schema.blogPosts).values({
      title: "The Future of Remote Freelancing",
      slug: "future-remote-freelancing",
      content: "Remote work has transformed the freelancing landscape. Let's explore what the future holds for digital nomads and remote workers...",
      excerpt: "Exploring the evolving landscape of remote freelancing",
      authorId: tutors[1].id,
      category: "Freelancing",
      tags: ["Remote Work", "Freelancing", "Career"],
      published: true,
      publishedAt: new Date(),
    }).returning().then(r => r[0]),
  ]);

  console.log(`✅ Created ${blogPosts.length} blog posts\n`);

  // ===== CREATE NOTIFICATIONS =====
  console.log("🔔 Creating notifications...");
  
  const notifications = await Promise.all([
    storage.createNotification({
      userId: students[0].id,
      type: "course",
      title: "New lesson available",
      message: "A new lesson has been added to Complete Web Development Bootcamp",
      link: `/student/course-player?courseId=${courses[0].id}`,
    }),
    storage.createNotification({
      userId: students[1].id,
      type: "session",
      title: "Upcoming session reminder",
      message: "You have a tutoring session scheduled for tomorrow at 2 PM",
      link: "/student/bookings",
    }),
    storage.createNotification({
      userId: freelancers[0].id,
      type: "project",
      title: "New project matching your skills",
      message: "A new e-commerce project has been posted",
      link: "/freelancer/browse-jobs",
    }),
  ]);

  console.log(`✅ Created ${notifications.length} notifications\n`);

  // ===== SUMMARY =====
  console.log("\n" + "=".repeat(50));
  console.log("✨ DATABASE SEEDING COMPLETE!");
  console.log("=".repeat(50));
  console.log("\n📊 SUMMARY:");
  console.log(`  • Users: ${1 + students.length + tutors.length + freelancers.length + recruiters.length}`);
  console.log(`  • Courses: ${courses.length}`);
  console.log(`  • Lessons: ${lessonCount}`);
  console.log(`  • Enrollments: ${enrollments.length}`);
  console.log(`  • Sessions: ${sessions.length}`);
  console.log(`  • Projects: ${projects.length}`);
  console.log(`  • Bids: ${bids.length}`);
  console.log(`  • Reviews: ${reviews.length}`);
  console.log(`  • Payments: ${payments.length}`);
  console.log(`  • Certificates: ${certificates.length}`);
  console.log(`  • Study Groups: ${studyGroups.length}`);
  console.log(`  • Blog Posts: ${blogPosts.length}`);
  console.log(`  • Notifications: ${notifications.length}`);
  
  console.log("\n🔐 TEST ACCOUNTS:");
  console.log("  Admin:      admin@yeesp.com / password123");
  console.log("  Students:   alice@yeesp.com, bob@yeesp.com, carol@yeesp.com / password123");
  console.log("  Tutors:     tutor1@yeesp.com, tutor2@yeesp.com, tutor3@yeesp.com / password123");
  console.log("  Freelancers: freelancer1@yeesp.com, freelancer2@yeesp.com / password123");
  console.log("  Recruiters:  recruiter1@yeesp.com, recruiter2@yeesp.com / password123");
  console.log("\n");
}

seed().catch(console.error).finally(() => process.exit(0));
