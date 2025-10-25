
// Load environment variables from Replit Secrets
import('../server/env.ts').catch(() => {});

console.log("\n🔍 ENVIRONMENT VARIABLES CHECK\n");
console.log("=".repeat(60));

console.log("\n📋 Checking required environment variables:\n");

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL'
];

let allPresent = true;

for (const varName of requiredVars) {
  const value = process.env[varName];
  if (value) {
    // Mask sensitive data
    const displayValue = varName.includes('KEY') || varName.includes('URL')
      ? value.substring(0, 20) + '...' + value.substring(value.length - 10)
      : value;
    console.log(`✅ ${varName}: ${displayValue}`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allPresent = false;
  }
}

console.log("\n" + "=".repeat(60));

if (allPresent) {
  console.log("✅ All required environment variables are set!");
} else {
  console.log("❌ MISSING ENVIRONMENT VARIABLES!");
  console.log("\n⚠️  ACTION REQUIRED:");
  console.log("   1. Open Secrets tool (lock icon in left sidebar)");
  console.log("   2. Add the missing environment variables");
  console.log("   3. Restart your application\n");
}

console.log("=".repeat(60) + "\n");
