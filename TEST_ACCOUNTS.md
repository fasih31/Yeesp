# YEESP Platform - Test Accounts & Feature Guide

## 🔑 Test Account Credentials

Use these credentials to log in and test all platform features:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Student** | `student@test.com` | `password123` | Course enrollment, tutoring sessions, certificates |
| **Tutor** | `tutor@test.com` | `password123` | Course creation, session management, reviews |
| **Freelancer** | `freelancer@test.com` | `password123` | Project bidding, freelance work |
| **Recruiter** | `recruiter@test.com` | `password123` | Project posting, hiring freelancers |
| **Admin** | `admin@test.com` | `admin123` | Full platform control, approvals, moderation |

## 🎯 How to Test Each Role

### 1️⃣ Student Features
**Login:** `student@test.com` / `password123`

**What You Can Do:**
- ✅ Browse and search courses
- ✅ Enroll in courses
- ✅ Track course progress
- ✅ Take quizzes and submit assignments
- ✅ Earn certificates upon completion
- ✅ Book tutoring sessions
- ✅ Rate tutors and courses
- ✅ View notifications
- ✅ Manage profile

**Test Flow:**
1. Go to Dashboard → Browse Courses
2. Enroll in a course
3. Track your progress
4. Browse Tutors → Book a session
5. Check your notifications

---

### 2️⃣ Tutor Features
**Login:** `tutor@test.com` / `password123`

**What You Can Do:**
- ✅ Create and publish courses
- ✅ Manage course content (videos, quizzes, assignments)
- ✅ Schedule tutoring sessions
- ✅ Conduct 1-on-1 sessions (video conferencing)
- ✅ Grade assignments
- ✅ View student enrollments
- ✅ Track earnings
- ✅ View reviews and ratings

**Test Flow:**
1. Go to Dashboard → Create New Course
2. Add course title, description, price, category
3. Upload course materials
4. Publish course
5. View enrolled students
6. Manage tutoring sessions

---

### 3️⃣ Freelancer Features
**Login:** `freelancer@test.com` / `password123`

**What You Can Do:**
- ✅ Browse available projects
- ✅ Submit bids on projects
- ✅ Manage active contracts
- ✅ Track milestones
- ✅ Receive payments via escrow
- ✅ Build portfolio
- ✅ View ratings and reviews

**Test Flow:**
1. Go to Dashboard → Browse Projects
2. Find a project (after recruiter posts and admin approves)
3. Submit a bid with your proposal
4. Wait for approval
5. Complete work and submit
6. Receive payment

---

### 4️⃣ Recruiter Features
**Login:** `recruiter@test.com` / `password123`

**What You Can Do:**
- ✅ Post freelance projects
- ✅ Set project budgets and deadlines
- ✅ Review freelancer bids
- ✅ Hire freelancers
- ✅ Create milestone payments
- ✅ Manage escrow funds
- ✅ Rate freelancers

**Test Flow:**
1. Go to Dashboard → Post New Project
2. Fill in project details, budget, deadline
3. Submit for admin approval (new feature!)
4. Wait for admin to approve (status: pending → open)
5. Review bids from freelancers
6. Hire a freelancer
7. Create milestones and release payments

---

### 5️⃣ Admin Features
**Login:** `admin@test.com` / `admin123`

**What You Can Do:**
- ✅ **Dashboard**: View platform statistics (users, courses, projects, revenue)
- ✅ **User Management**: View, edit, suspend, or delete users
- ✅ **Project Approval**: Approve or reject recruiter project submissions ⭐ NEW
- ✅ **Content Moderation**: Review and moderate courses, projects, comments
- ✅ **KYC Verification**: Approve or reject user verification documents
- ✅ **Role Requests**: Approve users requesting role changes
- ✅ **Dispute Resolution**: Handle conflicts between users
- ✅ **Support Tickets**: Manage customer support requests
- ✅ **Admin Management**: Add or remove other administrators
- ✅ **Notifications**: Send platform-wide announcements

**Test Flow:**
1. Go to Admin Dashboard → View Statistics
2. **Projects** → Review pending projects → Approve/Reject
3. **Users** → Manage user accounts
4. **KYC** → Verify user documents
5. **Role Requests** → Approve role changes
6. **Admins** → Manage admin accounts

---

## 🔐 Security Features Implemented

✅ **Authentication Required**: All actions require login  
✅ **Role-Based Access Control**: Users can only access their role's features  
✅ **Ownership Validation**: Users can only modify their own resources  
✅ **Admin Approval System**: Projects require admin approval before going live  
✅ **Protected Routes**: Client-side guards prevent unauthorized access  
✅ **Session Security**: Secure session management with bcrypt password hashing

---

## 🚀 Quick Start Testing Guide

### Option 1: Test Student Journey
1. Login as `student@test.com`
2. Browse courses, enroll in one
3. Book a tutoring session
4. Check notifications

### Option 2: Test Tutor Journey
1. Login as `tutor@test.com`
2. Create a new course
3. Upload course materials
4. View enrolled students

### Option 3: Test Freelancing Journey
**As Recruiter:**
1. Login as `recruiter@test.com`
2. Post a new project
3. Wait for admin approval notification

**As Admin:**
1. Login as `admin@test.com`
2. Go to Projects → Pending
3. Approve the recruiter's project

**As Freelancer:**
1. Login as `freelancer@test.com`
2. Browse approved projects
3. Submit a bid

### Option 4: Test Admin Powers
1. Login as `admin@test.com`
2. View dashboard statistics
3. Approve pending projects
4. Manage users
5. Handle KYC verifications

---

## 📝 Creating Additional Test Data

### Create More Test Users
Run the script again to reset passwords:
```bash
npm run setup-test-users
```

### Create Admin Accounts
To create additional admin accounts:
```bash
npm run create-admin
```
Then follow the prompts to enter email and password.

---

## 🛠 Resetting Test Accounts

If you need to reset the test account passwords:
```bash
npm run setup-test-users
```

This will reset all test accounts to their default passwords.

---

## 💡 Platform Features to Test

### LMS Features
- [ ] Course creation and enrollment
- [ ] Video lessons
- [ ] Quizzes and assignments
- [ ] Progress tracking
- [ ] Certificate generation

### Tutoring Features
- [ ] Session scheduling
- [ ] Video conferencing (Zoom/Dyte)
- [ ] Session reviews
- [ ] Tutor ratings

### Freelancing Features
- [ ] Project posting
- [ ] **Project approval workflow** ⭐ NEW
- [ ] Bid submission
- [ ] Milestone tracking
- [ ] Escrow payments

### Admin Features
- [ ] User management
- [ ] **Project moderation** ⭐ NEW
- [ ] KYC verification
- [ ] Role request approval
- [ ] Platform statistics
- [ ] Dispute resolution

### General Features
- [ ] User authentication
- [ ] Profile management
- [ ] Notifications
- [ ] Search and filtering
- [ ] Reviews and ratings

---

## 🔧 Troubleshooting

### Can't Log In?
1. Make sure you're using the correct email and password
2. Check that test users exist: `npm run setup-test-users`
3. Clear browser cache and try again

### Features Not Working?
1. Make sure you're logged in with the correct role
2. Check the browser console for errors
3. Restart the server: The workflow will auto-restart

### Need to Reset Everything?
```bash
npm run setup-test-users
```

---

## 📊 Platform Status

✅ **Fully Functional**:
- Authentication & Authorization
- LMS (Courses, Enrollments, Certificates)
- Tutoring Marketplace
- Freelancing Platform with Admin Approval
- Admin Dashboard
- User Management
- KYC Verification
- Notifications

⚠️ **Requires Configuration**:
- Stripe Payments (add API keys)
- Email Notifications (SendGrid configured)
- Video Conferencing (Zoom/Dyte - add SDK keys)

---

**Developer:** Fasih ur Rehman  
**Last Updated:** October 25, 2025
