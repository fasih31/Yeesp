# YEESP - Youth Education and Employment Support Platform

## Overview
YEESP is a multi-role digital learning and freelancing ecosystem empowering youth through education and employment. It integrates an LMS, tutoring marketplace, and freelancing platform, supporting Students, Tutors, Freelancers, Recruiters, and Admins. Key features include real-time communication, customer support, dispute resolution, KYC verification, and an escrow-based payment system. The platform aims to be a comprehensive solution for skill development and economic empowerment.

## User Preferences
- **Coding Style**: TypeScript for type safety, functional components with hooks, async/await for promises, error handling at all levels, reusable components, consistent naming conventions.
- **Development Workflow**: Database changes → Update `shared/schema.ts` → Run `npm run db:push`; Backend features → Add storage functions → Add API routes; Frontend features → Create components → Connect to API → Add error handling; Test with test accounts before marking complete.

## System Architecture
The platform features a React 18 + TypeScript frontend with Vite, Wouter for routing, TanStack Query for data fetching, and Radix UI + Tailwind CSS for components. Forms are managed with React Hook Form and Zod for validation. The backend uses Node.js 20 + Express with TypeScript, Drizzle ORM, and PostgreSQL. Authentication is handled by Passport.js. The architecture emphasizes reusable components, modal dialogs, loading states, error boundaries, and toast notifications, supporting multi-role access with dedicated portals. Key features include an LMS, tutoring marketplace, freelancing platform, comprehensive admin controls, and advanced search functionality.

### Technical Implementations
- **Frontend**: React 18, TypeScript, Vite, Wouter, TanStack Query, Radix UI, Tailwind CSS, React Hook Form, Zod, Framer Motion.
- **Backend**: Node.js 20, Express, TypeScript, Drizzle ORM, PostgreSQL, Passport.js, Bcryptjs.
- **API Design**: RESTful with comprehensive error handling.
- **Database**: PostgreSQL with Drizzle ORM.
- **Authentication**: Session-based with bcryptjs for password hashing and role-based access control.
- **Video Conferencing**: Dyte SDK and Zoom Server-to-Server OAuth integration with automatic attendance tracking.
- **Payment System**: Escrow-based wallet with transaction history.
- **Security**: Password hashing, SQL injection prevention (Drizzle ORM), XSS prevention (React), CSRF tokens, input validation.
- **Admin API**: Dedicated routes for platform statistics, user management, content moderation, and KYC.
- **Certificate Generation**: PDFKit for branded, verifiable certificates with QR codes.
- **Real-time Features**: WebSocket notification system for live updates and toasts.

### Feature Specifications
- **LMS**: Courses (video, live, assignment, quiz, reading), submissions, certificates, quizzes.
- **Tutoring Marketplace**: Session scheduling, 1-on-1 video calls, reviews.
- **Freelancing Platform**: Project bidding, contracts, milestones, escrow payments.
- **KYC Verification**: Document upload, admin review.
- **Messaging System**: Real-time 1-on-1 chat.
- **Support Tickets**: Prioritized ticketing system.
- **Dispute Resolution**: Admin-managed conflict resolution.
- **Wallet & Payments**: User wallets, transaction history, escrow.
- **Notifications**: Real-time alerts, in-app notification center.
- **Admin Controls**: Dashboard with statistics, user/content management, KYC, dispute resolution.
- **Reviews & Ratings**: System for courses, tutors, and freelancers.
- **Advanced Search**: Multi-criteria filtering and sorting for courses, tutors, projects.

## External Dependencies
- **Stripe**: Payment processing.
- **SendGrid**: Email notifications.
- **Dyte**: Video conferencing SDK.
- **Zoom**: Server-to-Server OAuth for video conferencing.
- **PostgreSQL**: Primary database.
- **Replit**: Hosting platform.