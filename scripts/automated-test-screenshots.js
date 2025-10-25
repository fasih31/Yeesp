
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://0.0.0.0:5000';
const SCREENSHOT_DIR = 'test-screenshots';

// Test accounts
const accounts = {
  admin: { email: 'admin@yeesp.com', password: 'password123' },
  student: { email: 'alice@yeesp.com', password: 'password123' },
  tutor: { email: 'tutor1@yeesp.com', password: 'password123' },
  freelancer: { email: 'freelancer1@yeesp.com', password: 'password123' },
  recruiter: { email: 'recruiter1@yeesp.com', password: 'password123' }
};

// Create screenshot directory
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function login(page, email, password) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
}

async function captureScreenshot(page, name, role) {
  const filename = `${SCREENSHOT_DIR}/${role}-${name}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`✅ Screenshot saved: ${filename}`);
}

async function testRole(browser, role, account) {
  console.log(`\n🧪 Testing ${role.toUpperCase()} role...`);
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Login
    await login(page, account.email, account.password);
    await captureScreenshot(page, '01-dashboard', role);

    // Role-specific tests
    if (role === 'student') {
      await page.goto(`${BASE_URL}/student/my-courses`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '02-my-courses', role);

      await page.goto(`${BASE_URL}/student/bookings`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '03-bookings', role);

      await page.goto(`${BASE_URL}/student/certificates`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '04-certificates', role);
    }

    if (role === 'tutor') {
      await page.goto(`${BASE_URL}/tutor/my-courses`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '02-my-courses', role);

      await page.goto(`${BASE_URL}/tutor/sessions`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '03-sessions', role);

      await page.goto(`${BASE_URL}/tutor/earnings`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '04-earnings', role);
    }

    if (role === 'freelancer') {
      await page.goto(`${BASE_URL}/freelancer/browse-jobs`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '02-browse-jobs', role);

      await page.goto(`${BASE_URL}/freelancer/my-proposals`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '03-my-proposals', role);

      await page.goto(`${BASE_URL}/freelancer/active-projects`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '04-active-projects', role);
    }

    if (role === 'recruiter') {
      await page.goto(`${BASE_URL}/recruiter/my-projects`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '02-my-projects', role);

      await page.goto(`${BASE_URL}/recruiter/proposals`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '03-proposals', role);

      await page.goto(`${BASE_URL}/recruiter/contracts`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '04-contracts', role);
    }

    if (role === 'admin') {
      await page.goto(`${BASE_URL}/admin/users`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '02-users', role);

      await page.goto(`${BASE_URL}/admin/courses`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '03-courses', role);

      await page.goto(`${BASE_URL}/admin/analytics`);
      await page.waitForTimeout(1000);
      await captureScreenshot(page, '04-analytics', role);
    }

    console.log(`✅ ${role.toUpperCase()} testing complete!`);
  } catch (error) {
    console.error(`❌ Error testing ${role}:`, error.message);
  } finally {
    await context.close();
  }
}

async function runAllTests() {
  console.log('🚀 Starting automated testing with screenshots...\n');
  
  const browser = await chromium.launch({ headless: true });

  for (const [role, account] of Object.entries(accounts)) {
    await testRole(browser, role, account);
  }

  await browser.close();

  console.log('\n✅ All tests complete!');
  console.log(`📸 Screenshots saved in: ${SCREENSHOT_DIR}/`);
}

runAllTests().catch(console.error);
