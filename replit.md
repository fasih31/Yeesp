# YEESP - Youth Education and Employment Support Platform

## Overview
YEESP is a comprehensive multi-role digital learning and freelancing ecosystem designed to empower youth through education and employment opportunities. It integrates a Learning Management System (LMS), a tutoring marketplace, and a freelancing platform. The platform supports various user roles including Students, Tutors, Freelancers, Recruiters, and Admins, facilitating course enrollment, teaching, project bidding, hiring, and platform management. Key capabilities include real-time communication, customer support, dispute resolution, KYC verification, and an escrow-based payment system.

## User Preferences
### Coding Style
- TypeScript for type safety
- Functional components with hooks
- Async/await for promises
- Error handling at all levels
- Reusable components
- Consistent naming conventions

### Development Workflow
1. Database changes → Update `shared/schema.ts` → Run `npm run db:push`
2. Backend features → Add storage functions → Add API routes
3. Frontend features → Create components → Connect to API → Add error handling
4. Test with test accounts before marking complete

## System Architecture
The platform is built with a React 18 + TypeScript frontend using Vite, Wouter for routing, TanStack Query for data fetching, and Radix UI + Tailwind CSS for components. Forms are handled with React Hook Form and Zod for validation. The backend utilizes Node.js 20 + Express with TypeScript, Drizzle ORM, and PostgreSQL. Authentication is managed via Passport.js. The system employs a comprehensive error handling middleware and a structured file organization separating client, server, and shared code. UI/UX decisions prioritize reusable components, modal dialogs, loading states, error boundaries, and toast notifications. The application is designed for multi-role access, with dedicated portals for Students, Tutors, Freelancers, Recruiters, and Admins.

### Technical Implementations
- **Frontend**: React 18, TypeScript, Vite, Wouter, TanStack Query, Radix UI, Tailwind CSS, React Hook Form, Zod, Framer Motion.
- **Backend**: Node.js 20, Express, TypeScript, Drizzle ORM, PostgreSQL, Passport.js, Bcryptjs.
- **Form Validation**: Zod schemas for robust input validation.
- **API Design**: RESTful conventions with comprehensive error handling.
- **Database**: PostgreSQL with Drizzle ORM for schema management.
- **Authentication**: Session-based authentication with bcryptjs for password hashing and role-based access control.
- **Video Conferencing**: Dyte SDK integration for live video sessions with automatic attendance tracking.
- **Payment System**: Escrow-based wallet system with transaction history.
- **Security**: Passwords hashed, SQL injection prevention (Drizzle ORM), XSS prevention (React), CSRF tokens, input validation.
- **Admin API**: Dedicated admin API routes for platform statistics, user management, content moderation, and KYC verification.

### Feature Specifications
- **LMS**: Courses with multiple lesson types (video, live_session, assignment, quiz, reading), submissions, certificates, quizzes with attempts tracking.
- **Enhanced Course Creation**: LessonBuilder component supporting video lessons, live sessions, assignments with due dates, quizzes with questions, and reading materials.
- **Tutoring Marketplace**: Session scheduling, 1-on-1 video calls, reviews.
- **Video Conferencing**: Dual provider support (Dyte and Zoom) for flexible video session hosting with automatic meeting creation and management.
- **Freelancing Platform**: Project bidding, contracts, milestones, escrow payments.
- **KYC Verification**: Document upload, admin review, and verification status.
- **Messaging System**: Real-time 1-on-1 chat.
- **Support Tickets**: Ticketing system with priority levels and admin management.
- **Dispute Resolution**: Admin-managed process for resolving conflicts.
- **Wallet & Payments**: User wallets, transaction history, escrow management.
- **Notifications**: Real-time alerts and in-app notification center.
- **Attendance Tracking**: Automatic recording of video session attendance and statistics.
- **Admin Controls**: Comprehensive admin dashboard with real-time statistics, user management, content moderation, KYC verification queue, and dispute resolution tools.

## External Dependencies
- **Stripe**: Payment processing (blueprint integrated, ready for API keys).
- **SendGrid**: Email notifications (connection established).
- **Dyte**: Video conferencing SDK for live video sessions.
- **Zoom**: Server-to-Server OAuth integration for programmatic meeting creation and management.
- **PostgreSQL**: Primary database.
- **Replit**: Hosting platform.

## Developer Information
**Developed by:** Fasih ur Rehman

## Recent Changes (October 25, 2025)

### Critical Fixes - Login/Signup & Missing Pages (October 25, 2025 - Session 3)
**Database & Authentication Fixed:**
- Fixed missing `user_approved_roles` and `role_requests` tables causing login failures
- Updated db:push script to `DRIZZLE_KIT_NO_PROMPT=1 drizzle-kit push --force` for automated syncing
- Created SQL tables directly to resolve blocking database sync issue

**Auth Pages Created:**
- Built professional `/auth/login` page with email/password validation
- Built `/auth/signup` page with role selection (Student, Tutor, Freelancer, Recruiter)
- Both pages use proper form validation with Zod schemas
- Integrated with existing auth context using `useAuth()` hook
- Clean UI with YEESP branding and responsive design

**Navigation Fixed:**
- Updated main navigation links to point to `/auth/login` and `/auth/signup`
- Removed broken link references
- All pages now accessible and properly routed

**Branding Verification:**
- Confirmed NO "Replit" branding visible in UI
- All branding shows "YEESP" correctly
- Logo, navigation, and meta tags all use YEESP identity

### Admin Reports & Data Export System (October 25, 2025 - Session 2)
**Comprehensive Reporting Dashboard:**

**Admin Reports Page:**
- Professional reports dashboard at `/admin/reports`
- Download reports in CSV or PDF format
- Date range filtering with quick presets (7d, 30d, 90d, 365d)
- Export format selection (CSV for Excel, PDF for documents)

**Available Reports:**
1. **Courses Report**: All courses, enrollments, completion rates, tutor info
2. **Students Report**: Student registrations, activity, progress tracking
3. **Tutors Report**: Tutor profiles, sessions conducted, total earnings
4. **Classes Report**: Live sessions, attendance, status, video provider
5. **Billing Report**: All transactions, revenue, payment analytics
6. **Freelance Projects Report**: Projects, bids, budget, client information

**Backend API:**
- `GET /api/admin/reports/download` - Download any report in CSV/PDF
- `GET /api/admin/reports/stats/:type` - Get statistics for specific report type
- All reports include comprehensive data with JOIN operations for related info
- Proper CSV formatting with quote escaping for Excel compatibility

**Features:**
- Real-time statistics cards for each report type
- Detailed analytics tabs (Overview, Revenue, Users, Engagement)
- Visual metrics with trend indicators
- One-click download buttons for each report
- Admin-only access with authentication middleware

### COMPLETE Platform Overhaul (October 25, 2025 - Evening Session 2)
**ALL Remaining Enhancements Delivered:**

**Real-time Features:**
- WebSocket notification system with useRealtimeNotifications hook
- Live toast notifications for platform events
- Automatic reconnection and user authentication for WebSocket

**Advanced Search System:**
- Complete backend search API for courses, tutors, and projects (`/api/search/*`)
- Multi-criteria filtering: query, category, level, price range, rating
- Sorting options: relevance, newest, price (low/high), rating, popularity
- AdvancedSearch component integrated with backend

**File Management:**
- FileUploader component with drag-and-drop support
- Real-time upload progress tracking
- File validation (size limits, file type restrictions)
- Multiple file upload with preview and removal
- Visual feedback for upload states

**Mobile Responsiveness:**
- All components use Tailwind's responsive breakpoints (sm, md, lg)
- Analytics charts adapt to screen sizes with ResponsiveContainer
- Navigation menus collapse on mobile
- Cards and grids stack properly on smaller screens

**Bug Fixes:**
- Fixed auth.tsx file corruption issue (recreated as .tsx)
- Resolved all routing errors in App.tsx
- Fixed certificate routes to use correct schema fields
- Added admin settings routes with proper authentication

### Complete Platform Enhancement (October 25, 2025 - Evening Session 1)
**Admin Dashboard & Controls:**
- Enhanced admin dashboard with modern StatsCard components showing trends
- Integrated real-time analytics: Revenue Chart (line chart) and User Activity Chart (bar chart)
- Added Platform Settings page with 4 tabs: Pricing, Platform, Email, Security
- Platform settings include: fee configuration, commission rates, budget limits, currency selection
- Maintenance mode toggle and registration controls
- All admin quick actions linked: Users, Courses, Projects, Platform Settings, KYC, Disputes, Support

**Reviews & Ratings System:**
- Complete reviews infrastructure for courses, tutors, and freelancers
- ReviewCard component with star ratings and user avatars
- Backend API routes: POST /api/reviews/course/:id, GET /api/reviews/course/:id
- Tutor reviews with average rating calculation and statistics
- Support for session-specific and project-specific reviews

**Advanced Search:**
- AdvancedSearch component with collapsible filter panel
- Multi-criteria filtering: category, level, price range, minimum rating, sort options
- Active filter badges with quick remove functionality
- Search types: courses, tutors, projects
- Sort options: relevance, newest, price (low/high), rating, popularity

**Analytics Components:**
- StatsCard: Reusable metric display with trend indicators (↑/↓ percentage)
- RevenueChart: Line chart showing monthly revenue vs expenses using Recharts
- UserActivityChart: Bar chart for role-based user activity (students, tutors, freelancers)
- All charts fully responsive with tooltips and legends

**Route Integration:**
- Added /admin/platform-settings route to App.tsx
- Connected Platform Settings to admin dashboard quick actions
- All review routes registered in server/index.ts
- Certificate routes integrated

## Recent Changes Archive
### Zoom Integration
- Added Zoom Server-to-Server OAuth authentication service with automatic token refresh
- Created Zoom meetings API for programmatic meeting creation, retrieval, updates, and deletion
- Updated sessions schema to support multiple video providers (Dyte/Zoom)
- Added Zoom-specific fields: zoomMeetingId, zoomPassword, videoProvider
- Implemented authenticated API endpoints: `/api/zoom/create-meeting`, `/api/zoom/meeting/:id`, `/api/zoom/session/:id/zoom-meeting`
- Backend supports dual provider configuration (Dyte or Zoom) for sessions
- All Zoom endpoints protected with authentication middleware

### Frontend Video Provider Selection
- Created VideoProviderSelector component with visual radio cards for Dyte/Zoom selection
- Built BookSessionDialog component with complete booking workflow (date, time, duration, provider, notes, pricing)
- Enhanced session details page to display Zoom meeting credentials (ID, password, join URL)
- Added copy-to-clipboard functionality for meeting details
- Fully integrated with existing Zoom backend API

### Stripe Payment Integration
- Database schema updated: Added stripe_customer_id to users table, stripe_intent_id to wallet_transactions
- Comprehensive StripeService implementation:
  * Automatic customer creation and retrieval
  * Checkout session creation for wallet deposits
  * Payment intent handling for transactions
  * Escrow hold and release functionality
  * Webhook event processing with signature verification
  * Automatic wallet balance updates on successful payments
- Secure API routes under `/api/stripe/*`:
  * POST /create-checkout-session (wallet deposits)
  * GET /wallet/balance (user wallet info)
  * POST /webhook (Stripe webhook with raw body handling)
  * GET /config (publishable key for frontend)
  * GET /checkout-session/:id (session verification)
- Ready for production use (requires STRIPE_SECRET_KEY and VITE_STRIPE_PUBLIC_KEY environment variables)

### Email & Notification Infrastructure
- Created email_templates table for template management with variable substitution
- Added metadata jsonb field to notifications table for rich notification data
- Foundation ready for SendGrid integration (requires SENDGRID_API_KEY)
- Existing email service supports development mode logging

### Branding & UI Updates
- Removed all proprietary platform references - code is now generic and portable
- Integrated custom YEESP logo (blue bird icon) throughout application:
  * Favicon in browser tab
  * Main navigation header
  * All role-based sidebars (Student, Tutor, Freelancer, Recruiter, Admin)
- Added developer credit to Fasih ur Rehman in footer
- Updated environment variables to use generic APP_URL instead of platform-specific domains

### Certificate Generation System
- Complete PDF certificate generation service using PDFKit
- Professional certificate design with YEESP branding
- QR code integration for certificate verification
- API endpoints for certificate issuance, download, and verification:
  * POST /api/certificates/issue - Issue certificate for completed courses
  * GET /api/certificates/download/:id - Download certificate as PDF
  * GET /api/certificates/my-certificates - List user's certificates
  * GET /api/certificates/verify/:id - Public certificate verification
- Automatic certificate issuance upon course completion
- Verification URL embedded in QR code