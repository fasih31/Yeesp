
import { db } from "./db";
import { users, courses, lessons, projects, bids, enrollments, sessions, payments, certificates, reviews, kycDocuments, roleRequests, studyGroups, studyGroupMembers, blogPosts } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Starting comprehensive database seeding...");

  try {
    // 1. CREATE USERS
    console.log("Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Admin
    const [admin] = await db.insert(users).values({
      email: "admin@yeesp.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      verified: true,
      bio: "Platform Administrator",
    }).returning();

    // Students
    const [student1] = await db.insert(users).values({
      email: "john.student@yeesp.com",
      password: hashedPassword,
      name: "John Student",
      role: "student",
      verified: true,
      bio: "Aspiring web developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    }).returning();

    const [student2] = await db.insert(users).values({
      email: "sarah.student@yeesp.com",
      password: hashedPassword,
      name: "Sarah Student",
      role: "student",
      verified: true,
      bio: "Learning data science",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    }).returning();

    // Tutors
    const [tutor1] = await db.insert(users).values({
      email: "emma.tutor@yeesp.com",
      password: hashedPassword,
      name: "Dr. Emma Wilson",
      role: "tutor",
      verified: true,
      bio: "PhD in Computer Science, 10+ years teaching experience",
      expertise: "Web Development, JavaScript, React",
      hourlyRate: 75,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    }).returning();

    const [tutor2] = await db.insert(users).values({
      email: "michael.tutor@yeesp.com",
      password: hashedPassword,
      name: "Michael Chen",
      role: "tutor",
      verified: true,
      bio: "Full-stack developer and educator",
      expertise: "Python, Django, Machine Learning",
      hourlyRate: 85,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    }).returning();

    // Freelancers
    const [freelancer1] = await db.insert(users).values({
      email: "alex.freelancer@yeesp.com",
      password: hashedPassword,
      name: "Alex Rodriguez",
      role: "freelancer",
      verified: true,
      bio: "Senior Full-Stack Developer",
      expertise: "React, Node.js, AWS, PostgreSQL",
      hourlyRate: 95,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    }).returning();

    const [freelancer2] = await db.insert(users).values({
      email: "priya.freelancer@yeesp.com",
      password: hashedPassword,
      name: "Priya Sharma",
      role: "freelancer",
      verified: true,
      bio: "UI/UX Designer & Frontend Developer",
      expertise: "Figma, React, TypeScript, Tailwind CSS",
      hourlyRate: 80,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    }).returning();

    // Recruiters
    const [recruiter1] = await db.insert(users).values({
      email: "david.recruiter@yeesp.com",
      password: hashedPassword,
      name: "David Thompson",
      role: "recruiter",
      verified: true,
      bio: "CTO at TechStartup Inc.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    }).returning();

    const [recruiter2] = await db.insert(users).values({
      email: "lisa.recruiter@yeesp.com",
      password: hashedPassword,
      name: "Lisa Anderson",
      role: "recruiter",
      verified: true,
      bio: "Hiring Manager at DigitalCorp",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    }).returning();

    console.log("✅ Users created");

    // 2. CREATE COURSES
    console.log("Creating courses...");
    const [course1] = await db.insert(courses).values({
      title: "Complete Web Development Bootcamp",
      description: "Master HTML, CSS, JavaScript, React, Node.js and become a full-stack developer",
      instructorId: tutor1.id,
      price: "49.99",
      duration: 40,
      level: "beginner",
      category: "Web Development",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      published: true,
      objectives: ["Build responsive websites", "Master React framework", "Create REST APIs"],
      prerequisites: ["Basic computer skills", "Willingness to learn"],
    }).returning();

    const [course2] = await db.insert(courses).values({
      title: "Python for Data Science",
      description: "Learn Python, NumPy, Pandas, and Machine Learning fundamentals",
      instructorId: tutor2.id,
      price: "59.99",
      duration: 35,
      level: "intermediate",
      category: "Data Science",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
      published: true,
      objectives: ["Master Python basics", "Work with data using Pandas", "Build ML models"],
      prerequisites: ["Basic programming knowledge"],
    }).returning();

    const [course3] = await db.insert(courses).values({
      title: "Advanced React Patterns",
      description: "Learn advanced React concepts including hooks, context, and performance optimization",
      instructorId: tutor1.id,
      price: "79.99",
      duration: 25,
      level: "advanced",
      category: "Web Development",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      published: true,
      objectives: ["Master React hooks", "Optimize performance", "Build scalable apps"],
      prerequisites: ["React basics", "JavaScript ES6+"],
    }).returning();

    console.log("✅ Courses created");

    // 3. CREATE LESSONS
    console.log("Creating lessons...");
    await db.insert(lessons).values([
      {
        courseId: course1.id,
        title: "Introduction to HTML",
        content: "Learn the basics of HTML structure and semantic elements",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 45,
        order: 1,
      },
      {
        courseId: course1.id,
        title: "CSS Fundamentals",
        content: "Master CSS styling and layout techniques",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 60,
        order: 2,
      },
      {
        courseId: course1.id,
        title: "JavaScript Basics",
        content: "Learn JavaScript fundamentals and DOM manipulation",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 90,
        order: 3,
      },
      {
        courseId: course2.id,
        title: "Python Setup & Basics",
        content: "Install Python and learn basic syntax",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 50,
        order: 1,
      },
      {
        courseId: course2.id,
        title: "Working with NumPy",
        content: "Master array operations with NumPy",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: 70,
        order: 2,
      },
    ]);

    console.log("✅ Lessons created");

    // 4. CREATE ENROLLMENTS
    console.log("Creating enrollments...");
    await db.insert(enrollments).values([
      {
        studentId: student1.id,
        courseId: course1.id,
        progress: 45,
        completed: false,
      },
      {
        studentId: student1.id,
        courseId: course2.id,
        progress: 100,
        completed: true,
        completedAt: new Date(),
      },
      {
        studentId: student2.id,
        courseId: course1.id,
        progress: 20,
        completed: false,
      },
    ]);

    console.log("✅ Enrollments created");

    // 5. CREATE PROJECTS
    console.log("Creating projects...");
    const [project1] = await db.insert(projects).values({
      title: "E-commerce Website Development",
      description: "Need a full-stack developer to build a modern e-commerce platform with React and Node.js",
      recruiterId: recruiter1.id,
      budget: "5000",
      duration: "3 months",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "open",
      category: "Web Development",
    }).returning();

    const [project2] = await db.insert(projects).values({
      title: "Mobile App UI/UX Design",
      description: "Looking for a talented designer to create mockups for a fitness tracking app",
      recruiterId: recruiter2.id,
      budget: "2500",
      duration: "1 month",
      skills: ["Figma", "UI/UX", "Mobile Design"],
      status: "open",
      category: "Design",
    }).returning();

    const [project3] = await db.insert(projects).values({
      title: "Data Analytics Dashboard",
      description: "Build an analytics dashboard using Python and visualization libraries",
      recruiterId: recruiter1.id,
      budget: "4000",
      duration: "2 months",
      skills: ["Python", "Pandas", "Plotly", "Django"],
      status: "in_progress",
      category: "Data Science",
    }).returning();

    console.log("✅ Projects created");

    // 6. CREATE BIDS
    console.log("Creating bids...");
    await db.insert(bids).values([
      {
        projectId: project1.id,
        freelancerId: freelancer1.id,
        amount: "4800",
        proposal: "I have 5+ years of experience building e-commerce platforms. I can deliver a scalable solution with React, Node.js, and integrate Stripe payments.",
        deliveryTime: "2.5 months",
        status: "pending",
      },
      {
        projectId: project1.id,
        freelancerId: freelancer2.id,
        amount: "5200",
        proposal: "I specialize in modern web development and can create a beautiful, responsive e-commerce site with excellent UX.",
        deliveryTime: "3 months",
        status: "pending",
      },
      {
        projectId: project2.id,
        freelancerId: freelancer2.id,
        amount: "2300",
        proposal: "As a UI/UX specialist, I'll create stunning mockups with user-centered design principles.",
        deliveryTime: "3 weeks",
        status: "accepted",
      },
    ]);

    console.log("✅ Bids created");

    // 7. CREATE SESSIONS
    console.log("Creating tutoring sessions...");
    await db.insert(sessions).values([
      {
        tutorId: tutor1.id,
        studentId: student1.id,
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration: 60,
        topic: "React Hooks Deep Dive",
        status: "scheduled",
        meetingLink: "https://zoom.us/j/123456789",
      },
      {
        tutorId: tutor2.id,
        studentId: student2.id,
        scheduledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        duration: 90,
        topic: "Python Data Structures",
        status: "completed",
        meetingLink: "https://zoom.us/j/987654321",
      },
    ]);

    console.log("✅ Sessions created");

    // 8. CREATE PAYMENTS
    console.log("Creating payments...");
    await db.insert(payments).values([
      {
        userId: student1.id,
        amount: "49.99",
        platformFee: "3.50",
        netAmount: "46.49",
        entityType: "course",
        entityId: course1.id,
        status: "completed",
        stripePaymentId: "pi_test_" + Math.random().toString(36).substr(2, 9),
      },
      {
        userId: student1.id,
        amount: "59.99",
        platformFee: "4.20",
        netAmount: "55.79",
        entityType: "course",
        entityId: course2.id,
        status: "completed",
        stripePaymentId: "pi_test_" + Math.random().toString(36).substr(2, 9),
      },
      {
        userId: recruiter2.id,
        amount: "2300.00",
        platformFee: "161.00",
        netAmount: "2139.00",
        entityType: "project",
        entityId: project2.id,
        status: "completed",
        stripePaymentId: "pi_test_" + Math.random().toString(36).substr(2, 9),
      },
    ]);

    console.log("✅ Payments created");

    // 9. CREATE REVIEWS
    console.log("Creating reviews...");
    await db.insert(reviews).values([
      {
        reviewerId: student1.id,
        revieweeId: tutor1.id,
        entityType: "tutor",
        entityId: tutor1.id,
        rating: 5,
        comment: "Excellent tutor! Very knowledgeable and patient. Highly recommended!",
      },
      {
        reviewerId: student2.id,
        revieweeId: tutor2.id,
        entityType: "tutor",
        entityId: tutor2.id,
        rating: 4,
        comment: "Great explanations of complex topics. Would book again.",
      },
      {
        reviewerId: student1.id,
        revieweeId: course1.id,
        entityType: "course",
        entityId: course1.id,
        rating: 5,
        comment: "Best web development course I've taken. Very comprehensive!",
      },
    ]);

    console.log("✅ Reviews created");

    // 10. CREATE CERTIFICATES
    console.log("Creating certificates...");
    await db.insert(certificates).values([
      {
        studentId: student1.id,
        courseId: course2.id,
        certificateUrl: `/certificates/${student1.id}_${course2.id}.pdf`,
      },
    ]);

    console.log("✅ Certificates created");

    // 11. CREATE ROLE REQUESTS
    console.log("Creating role requests...");
    await db.insert(roleRequests).values([
      {
        userId: student1.id,
        requestedRole: "freelancer",
        reason: "I want to offer my web development skills on the platform",
        status: "pending",
      },
      {
        userId: student2.id,
        requestedRole: "tutor",
        reason: "I'd like to teach Python programming to beginners",
        status: "approved",
        reviewedBy: admin.id,
        reviewedAt: new Date(),
        reviewNotes: "Approved - has excellent skills",
      },
    ]);

    console.log("✅ Role requests created");

    // 12. CREATE STUDY GROUPS
    console.log("Creating study groups...");
    const [group1] = await db.insert(studyGroups).values({
      name: "Web Dev Warriors",
      description: "Study group for learning modern web development together",
      courseId: course1.id,
      creatorId: student1.id,
      maxMembers: 10,
    }).returning();

    await db.insert(studyGroupMembers).values([
      {
        groupId: group1.id,
        userId: student1.id,
        role: "admin",
      },
      {
        groupId: group1.id,
        userId: student2.id,
        role: "member",
      },
    ]);

    console.log("✅ Study groups created");

    // 13. CREATE BLOG POSTS
    console.log("Creating blog posts...");
    await db.insert(blogPosts).values([
      {
        title: "Getting Started with Web Development in 2024",
        slug: "getting-started-web-development-2024",
        content: "Web development is an exciting field with endless opportunities...",
        excerpt: "Learn the essential skills needed to start your web development journey",
        authorId: admin.id,
        published: true,
        tags: ["web development", "beginners", "guide"],
      },
      {
        title: "Top 10 Python Libraries for Data Science",
        slug: "top-10-python-libraries-data-science",
        content: "Python has become the go-to language for data science...",
        excerpt: "Discover the most important Python libraries every data scientist should know",
        authorId: tutor2.id,
        published: true,
        tags: ["python", "data science", "libraries"],
      },
    ]);

    console.log("✅ Blog posts created");

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📋 Test Accounts:");
    console.log("Admin: admin@yeesp.com / password123");
    console.log("Student 1: john.student@yeesp.com / password123");
    console.log("Student 2: sarah.student@yeesp.com / password123");
    console.log("Tutor 1: emma.tutor@yeesp.com / password123");
    console.log("Tutor 2: michael.tutor@yeesp.com / password123");
    console.log("Freelancer 1: alex.freelancer@yeesp.com / password123");
    console.log("Freelancer 2: priya.freelancer@yeesp.com / password123");
    console.log("Recruiter 1: david.recruiter@yeesp.com / password123");
    console.log("Recruiter 2: lisa.recruiter@yeesp.com / password123");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("✅ Seeding complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
