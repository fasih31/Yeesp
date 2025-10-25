
import { db } from "../server/db.js";
import { users } from "../shared/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function setupTestUsers() {
  console.log("Setting up comprehensive test users...\n");

  const testUsers = [
    {
      email: "student@test.com",
      password: "password123",
      name: "Test Student",
      role: "student",
      bio: "Passionate learner exploring web development",
      skills: ["JavaScript", "React", "Python"]
    },
    {
      email: "student2@test.com",
      password: "password123",
      name: "Jane Learner",
      role: "student",
      bio: "Computer Science student seeking practical skills",
      skills: ["Java", "SQL"]
    },
    {
      email: "tutor@test.com",
      password: "password123",
      name: "Test Tutor",
      role: "tutor",
      bio: "Experienced educator with 10+ years teaching web development",
      headline: "Senior Full-Stack Developer & Educator",
      skills: ["JavaScript", "React", "Node.js", "Python", "Teaching"],
      hourlyRate: "75.00",
      verified: true
    },
    {
      email: "tutor2@test.com",
      password: "password123",
      name: "Dr. Sarah Chen",
      role: "tutor",
      bio: "PhD in Computer Science, specializing in AI and Machine Learning",
      headline: "AI/ML Expert & University Professor",
      skills: ["Python", "TensorFlow", "Machine Learning", "Data Science"],
      hourlyRate: "100.00",
      verified: true
    },
    {
      email: "freelancer@test.com",
      password: "password123",
      name: "Test Freelancer",
      role: "freelancer",
      bio: "Full-stack developer available for projects",
      headline: "Full-Stack Web Developer",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      hourlyRate: "60.00"
    },
    {
      email: "freelancer2@test.com",
      password: "password123",
      name: "Alex Designer",
      role: "freelancer",
      bio: "Creative UI/UX designer with a passion for beautiful interfaces",
      headline: "UI/UX Designer & Front-end Developer",
      skills: ["Figma", "Adobe XD", "React", "Tailwind CSS"],
      hourlyRate: "55.00"
    },
    {
      email: "recruiter@test.com",
      password: "password123",
      name: "Test Recruiter",
      role: "recruiter",
      bio: "Tech company seeking talented developers",
      headline: "Tech Solutions Inc - Hiring Manager"
    },
    {
      email: "recruiter2@test.com",
      password: "password123",
      name: "StartupCo Hiring",
      role: "recruiter",
      bio: "Fast-growing startup looking for innovative talent",
      headline: "StartupCo - Head of Talent Acquisition"
    },
    {
      email: "admin@test.com",
      password: "admin123",
      name: "Platform Admin",
      role: "admin",
      bio: "YEESP Platform Administrator",
      headline: "Platform Administrator",
      verified: true
    }
  ];

  for (const testUser of testUsers) {
    try {
      const hashedPassword = await bcrypt.hash(testUser.password, 10);

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, testUser.email))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(users)
          .set({ 
            password: hashedPassword,
            ...testUser,
            password: hashedPassword
          })
          .where(eq(users.email, testUser.email));
        
        console.log(`✅ Updated: ${testUser.email} (${testUser.role})`);
      } else {
        await db.insert(users).values({
          email: testUser.email,
          password: hashedPassword,
          name: testUser.name,
          role: testUser.role,
          bio: testUser.bio,
          headline: testUser.headline,
          skills: testUser.skills,
          hourlyRate: testUser.hourlyRate,
          verified: testUser.verified || false,
          kycStatus: "approved"
        });
        
        console.log(`✅ Created: ${testUser.email} (${testUser.role})`);
      }

      console.log(`   Password: ${testUser.password}`);
    } catch (error) {
      console.error(`❌ Error with ${testUser.email}:`, error.message);
    }
  }

  console.log("\n✨ Test users setup complete!");
  console.log("\n📝 Available Test Accounts:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Students:");
  console.log("  • student@test.com / password123");
  console.log("  • student2@test.com / password123");
  console.log("\nTutors:");
  console.log("  • tutor@test.com / password123");
  console.log("  • tutor2@test.com / password123");
  console.log("\nFreelancers:");
  console.log("  • freelancer@test.com / password123");
  console.log("  • freelancer2@test.com / password123");
  console.log("\nRecruiters:");
  console.log("  • recruiter@test.com / password123");
  console.log("  • recruiter2@test.com / password123");
  console.log("\nAdmin:");
  console.log("  • admin@test.com / admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  process.exit(0);
}

setupTestUsers().catch((error) => {
  console.error("Error setting up test users:", error);
  process.exit(1);
});
