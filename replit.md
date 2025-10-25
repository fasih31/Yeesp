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

## Recent Changes (October 25, 2025)
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