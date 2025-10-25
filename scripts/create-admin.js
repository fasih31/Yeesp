import { db } from '../server/db.ts';
import { users } from '../shared/schema.ts';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdmin() {
  console.log('\n🔐 YEESP Admin Account Setup\n');
  console.log('This script will create or update an admin account.\n');

  const email = await question('Enter admin email: ');
  
  if (!email || !email.includes('@')) {
    console.error('❌ Invalid email address');
    rl.close();
    process.exit(1);
  }

  const fullName = await question('Enter full name: ');
  
  const password = await question('Enter password (min 8 characters): ');
  
  if (!password || password.length < 8) {
    console.error('❌ Password must be at least 8 characters');
    rl.close();
    process.exit(1);
  }

  rl.close();

  try {
    console.log('\n⏳ Processing...\n');

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser.length > 0) {
      await db.update(users)
        .set({
          fullName: fullName,
          password: hashedPassword,
          role: 'admin'
        })
        .where(eq(users.email, email));
      
      console.log('✅ Admin account updated successfully!');
      console.log(`📧 Email: ${email}`);
      console.log(`👤 Name: ${fullName}`);
      console.log(`🔑 Role: admin`);
    } else {
      await db.insert(users).values({
        email: email,
        fullName: fullName,
        password: hashedPassword,
        role: 'admin',
        bio: 'Platform Administrator',
        expertise: 'Platform Management',
        hourlyRate: 0
      });

      console.log('✅ Admin account created successfully!');
      console.log(`📧 Email: ${email}`);
      console.log(`👤 Name: ${fullName}`);
      console.log(`🔑 Role: admin`);
    }

    console.log('\n⚠️  IMPORTANT SECURITY REMINDERS:');
    console.log('1. Keep your password secure and don\'t share it');
    console.log('2. Change your password regularly');
    console.log('3. Use a strong, unique password');
    console.log('4. Enable 2FA when available\n');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }

  process.exit(0);
}

createAdmin();
