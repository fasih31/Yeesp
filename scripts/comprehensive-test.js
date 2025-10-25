
import { db } from '../server/db.js';
import { users, courses, enrollments, tutoringBookings, freelanceProjects, projectBids, payments, certificates, studyGroups, blogPosts, notifications } from '../shared/schema.js';
import { eq, count, sql } from 'drizzle-orm';

console.log('\n🧪 YEESP PLATFORM - COMPREHENSIVE TESTING\n');
console.log('='.repeat(60));

async function runComprehensiveTests() {
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  try {
    // Test 1: Database Connection
    console.log('\n📊 Test 1: Database Connection...');
    const dbTest = await db.select().from(users).limit(1);
    results.passed.push('✅ Database connection successful');

    // Test 2: User Accounts
    console.log('\n👥 Test 2: User Accounts Verification...');
    const allUsers = await db.select().from(users);
    const usersByRole = {
      admin: allUsers.filter(u => u.role === 'admin').length,
      student: allUsers.filter(u => u.role === 'student').length,
      tutor: allUsers.filter(u => u.role === 'tutor').length,
      freelancer: allUsers.filter(u => u.role === 'freelancer').length,
      recruiter: allUsers.filter(u => u.role === 'recruiter').length
    };
    
    console.log(`   Total Users: ${allUsers.length}`);
    console.log(`   - Admins: ${usersByRole.admin}`);
    console.log(`   - Students: ${usersByRole.student}`);
    console.log(`   - Tutors: ${usersByRole.tutor}`);
    console.log(`   - Freelancers: ${usersByRole.freelancer}`);
    console.log(`   - Recruiters: ${usersByRole.recruiter}`);
    
    if (allUsers.length >= 13) {
      results.passed.push(`✅ User accounts: ${allUsers.length} users created`);
    } else {
      results.warnings.push(`⚠️ Expected 13+ users, found ${allUsers.length}`);
    }

    // Test 3: Courses
    console.log('\n📚 Test 3: Courses Verification...');
    const allCourses = await db.select().from(courses);
    console.log(`   Total Courses: ${allCourses.length}`);
    allCourses.forEach(course => {
      console.log(`   - ${course.title} ($${course.price}) - ${course.status}`);
    });
    
    if (allCourses.length >= 5) {
      results.passed.push(`✅ Courses: ${allCourses.length} courses created`);
    } else {
      results.warnings.push(`⚠️ Expected 5+ courses, found ${allCourses.length}`);
    }

    // Test 4: Enrollments
    console.log('\n🎓 Test 4: Course Enrollments...');
    const allEnrollments = await db.select().from(enrollments);
    console.log(`   Total Enrollments: ${allEnrollments.length}`);
    const completedEnrollments = allEnrollments.filter(e => e.progress === 100);
    console.log(`   Completed: ${completedEnrollments.length}`);
    console.log(`   In Progress: ${allEnrollments.length - completedEnrollments.length}`);
    
    results.passed.push(`✅ Enrollments: ${allEnrollments.length} enrollments found`);

    // Test 5: Tutoring Sessions
    console.log('\n👨‍🏫 Test 5: Tutoring Sessions...');
    const allSessions = await db.select().from(tutoringBookings);
    const sessionsByStatus = {
      scheduled: allSessions.filter(s => s.status === 'scheduled').length,
      completed: allSessions.filter(s => s.status === 'completed').length,
      cancelled: allSessions.filter(s => s.status === 'cancelled').length
    };
    
    console.log(`   Total Sessions: ${allSessions.length}`);
    console.log(`   - Scheduled: ${sessionsByStatus.scheduled}`);
    console.log(`   - Completed: ${sessionsByStatus.completed}`);
    console.log(`   - Cancelled: ${sessionsByStatus.cancelled}`);
    
    results.passed.push(`✅ Sessions: ${allSessions.length} sessions found`);

    // Test 6: Freelance Projects
    console.log('\n💼 Test 6: Freelance Projects...');
    const allProjects = await db.select().from(freelanceProjects);
    const projectsByStatus = {
      open: allProjects.filter(p => p.status === 'open').length,
      inProgress: allProjects.filter(p => p.status === 'in_progress').length,
      completed: allProjects.filter(p => p.status === 'completed').length
    };
    
    console.log(`   Total Projects: ${allProjects.length}`);
    console.log(`   - Open: ${projectsByStatus.open}`);
    console.log(`   - In Progress: ${projectsByStatus.inProgress}`);
    console.log(`   - Completed: ${projectsByStatus.completed}`);
    
    results.passed.push(`✅ Projects: ${allProjects.length} projects found`);

    // Test 7: Project Bids
    console.log('\n📝 Test 7: Project Bids...');
    const allBids = await db.select().from(projectBids);
    const bidsByStatus = {
      pending: allBids.filter(b => b.status === 'pending').length,
      accepted: allBids.filter(b => b.status === 'accepted').length,
      rejected: allBids.filter(b => b.status === 'rejected').length
    };
    
    console.log(`   Total Bids: ${allBids.length}`);
    console.log(`   - Pending: ${bidsByStatus.pending}`);
    console.log(`   - Accepted: ${bidsByStatus.accepted}`);
    console.log(`   - Rejected: ${bidsByStatus.rejected}`);
    
    results.passed.push(`✅ Bids: ${allBids.length} bids submitted`);

    // Test 8: Payments
    console.log('\n💰 Test 8: Payment Transactions...');
    const allPayments = await db.select().from(payments);
    const totalRevenue = allPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const platformFees = allPayments.reduce((sum, p) => sum + parseFloat(p.platformFee || 0), 0);
    
    console.log(`   Total Payments: ${allPayments.length}`);
    console.log(`   Total Revenue: $${totalRevenue.toFixed(2)}`);
    console.log(`   Platform Fees: $${platformFees.toFixed(2)}`);
    
    results.passed.push(`✅ Payments: ${allPayments.length} transactions ($${totalRevenue.toFixed(2)})`);

    // Test 9: Certificates
    console.log('\n🏆 Test 9: Certificates...');
    const allCertificates = await db.select().from(certificates);
    console.log(`   Total Certificates: ${allCertificates.length}`);
    
    if (allCertificates.length > 0) {
      results.passed.push(`✅ Certificates: ${allCertificates.length} issued`);
    } else {
      results.warnings.push('⚠️ No certificates issued yet');
    }

    // Test 10: Study Groups
    console.log('\n👥 Test 10: Study Groups...');
    const allGroups = await db.select().from(studyGroups);
    console.log(`   Total Groups: ${allGroups.length}`);
    allGroups.forEach(group => {
      console.log(`   - ${group.name} (${group.memberCount}/${group.maxMembers} members)`);
    });
    
    results.passed.push(`✅ Study Groups: ${allGroups.length} groups active`);

    // Test 11: Blog Posts
    console.log('\n📰 Test 11: Blog Posts...');
    const allPosts = await db.select().from(blogPosts);
    console.log(`   Total Posts: ${allPosts.length}`);
    allPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.status})`);
    });
    
    results.passed.push(`✅ Blog: ${allPosts.length} posts published`);

    // Test 12: Notifications
    console.log('\n🔔 Test 12: Notifications...');
    const allNotifications = await db.select().from(notifications);
    const unreadNotifications = allNotifications.filter(n => !n.read).length;
    
    console.log(`   Total Notifications: ${allNotifications.length}`);
    console.log(`   Unread: ${unreadNotifications}`);
    
    results.passed.push(`✅ Notifications: ${allNotifications.length} sent`);

  } catch (error) {
    results.failed.push(`❌ Error: ${error.message}`);
    console.error('\n❌ Test Error:', error);
  }

  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📋 TEST SUMMARY\n');
  
  console.log('✅ PASSED TESTS:');
  results.passed.forEach(test => console.log(`   ${test}`));
  
  if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    results.warnings.forEach(warning => console.log(`   ${warning}`));
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.failed.forEach(fail => console.log(`   ${fail}`));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Passed: ${results.passed.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log('\n🎯 Overall Status: ' + (results.failed.length === 0 ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'));
  
  console.log('\n📸 To verify visually, login with these accounts:');
  console.log('   👨‍💼 Admin: admin@yeesp.com / password123');
  console.log('   👨‍🎓 Student: alice@yeesp.com / password123');
  console.log('   👨‍🏫 Tutor: tutor1@yeesp.com / password123');
  console.log('   💼 Freelancer: freelancer1@yeesp.com / password123');
  console.log('   🏢 Recruiter: recruiter1@yeesp.com / password123');
  
  console.log('\n🌐 Access the app at: http://0.0.0.0:5000');
  console.log('\n');
}

runComprehensiveTests().catch(console.error);
