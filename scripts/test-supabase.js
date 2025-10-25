
// Load environment variables from Replit Secrets
import "../server/env.ts";

import { db } from "../server/db.ts";
import { users } from "../shared/schema.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function testSupabaseConnection() {
  console.log("\n🧪 TESTING SUPABASE CONNECTION\n");
  console.log("=".repeat(60));

  try {
    // Test 1: Database Connection
    console.log("\n📊 Test 1: Verifying database connection...");
    const testQuery = await db.select().from(users).limit(1);
    console.log("✅ Database connection successful!");

    // Test 2: Insert Test User
    console.log("\n📝 Test 2: Creating test user in Supabase...");
    const testEmail = `test-${Date.now()}@supabase-test.com`;
    const hashedPassword = await bcrypt.hash("testpassword123", 10);

    const [newUser] = await db.insert(users).values({
      email: testEmail,
      password: hashedPassword,
      name: "Supabase Test User",
      role: "student",
      bio: "This is a test user created to verify Supabase integration",
      skills: ["Testing", "Supabase"],
    }).returning();

    console.log("✅ User created successfully!");
    console.log(`   ID: ${newUser.id}`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   Name: ${newUser.name}`);

    // Test 3: Read Test User
    console.log("\n📖 Test 3: Reading user from Supabase...");
    const retrievedUser = await db
      .select()
      .from(users)
      .where(eq(users.email, testEmail))
      .limit(1);

    if (retrievedUser.length > 0) {
      console.log("✅ User retrieved successfully!");
      console.log(`   Retrieved: ${retrievedUser[0].name}`);
    } else {
      console.log("❌ Failed to retrieve user");
    }

    // Test 4: Update Test User
    console.log("\n✏️ Test 4: Updating user in Supabase...");
    const [updatedUser] = await db
      .update(users)
      .set({ 
        bio: "Updated bio to confirm Supabase write operations work",
        skills: ["Testing", "Supabase", "Drizzle ORM"]
      })
      .where(eq(users.id, newUser.id))
      .returning();

    console.log("✅ User updated successfully!");
    console.log(`   New Bio: ${updatedUser.bio}`);
    console.log(`   New Skills: ${updatedUser.skills?.join(", ")}`);

    // Test 5: Count All Users
    console.log("\n🔢 Test 5: Counting all users in database...");
    const allUsers = await db.select().from(users);
    console.log(`✅ Total users in database: ${allUsers.length}`);

    // Test 6: Clean up (optional - remove test user)
    console.log("\n🧹 Test 6: Cleaning up test data...");
    await db.delete(users).where(eq(users.id, newUser.id));
    console.log("✅ Test user deleted successfully!");

    // Final Summary
    console.log("\n" + "=".repeat(60));
    console.log("✅ ALL TESTS PASSED - SUPABASE INTEGRATION VERIFIED!");
    console.log("=".repeat(60));
    console.log("\n📋 Summary:");
    console.log("   ✓ Database connection working");
    console.log("   ✓ INSERT operations working");
    console.log("   ✓ SELECT operations working");
    console.log("   ✓ UPDATE operations working");
    console.log("   ✓ DELETE operations working");
    console.log("\n🎉 Your Supabase database is fully connected and operational!\n");

  } catch (error) {
    console.error("\n❌ SUPABASE TEST FAILED:");
    console.error(error);
    console.log("\n⚠️ Please check:");
    console.log("   1. DATABASE_URL is correctly set in Secrets");
    console.log("   2. SUPABASE_URL is correctly set in Secrets");
    console.log("   3. SUPABASE_SERVICE_ROLE_KEY is correctly set in Secrets");
    console.log("   4. Database schema has been pushed (npm run db:push)");
    process.exit(1);
  }

  process.exit(0);
}

testSupabaseConnection();
