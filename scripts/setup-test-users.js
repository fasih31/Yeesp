import { db } from "../server/db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function setupTestUsers() {
  console.log("Setting up test users...\n");

  const testUsers = [
    {
      email: "student@test.com",
      password: "password123",
      name: "Test Student",
      role: "student"
    },
    {
      email: "tutor@test.com",
      password: "password123",
      name: "Test Tutor",
      role: "tutor"
    },
    {
      email: "freelancer@test.com",
      password: "password123",
      name: "Test Freelancer",
      role: "freelancer"
    },
    {
      email: "recruiter@test.com",
      password: "password123",
      name: "Test Recruiter",
      role: "recruiter"
    },
    {
      email: "admin@test.com",
      password: "admin123",
      name: "Test Admin",
      role: "admin"
    }
  ];

  for (const testUser of testUsers) {
    try {
      const hashedPassword = await bcrypt.hash(testUser.password, 10);

      // Check if user exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, testUser.email))
        .limit(1);

      if (existing.length > 0) {
        // Update password
        await db
          .update(users)
          .set({ password: hashedPassword })
          .where(eq(users.email, testUser.email));
        
        console.log(`✅ Updated: ${testUser.email} (${testUser.role})`);
      } else {
        // Create new user
        await db.insert(users).values({
          email: testUser.email,
          password: hashedPassword,
          name: testUser.name,
          role: testUser.role,
          bio: `Test ${testUser.role} account`,
          verified: true,
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
  console.log("\nYou can now log in with:");
  console.log("  • student@test.com / password123");
  console.log("  • tutor@test.com / password123");
  console.log("  • freelancer@test.com / password123");
  console.log("  • recruiter@test.com / password123");
  console.log("  • admin@test.com / admin123");

  process.exit(0);
}

setupTestUsers().catch((error) => {
  console.error("Error setting up test users:", error);
  process.exit(1);
});
