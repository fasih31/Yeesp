# YEESP - Youth Education and Employment Support Platform

## Project Overview
YEESP is a comprehensive multi-role digital learning and freelancing ecosystem integrating:
- **Learning Management System (LMS)** - Courses, lessons, assignments, certificates
- **Tutoring Marketplace** - 1-on-1 sessions with video conferencing
- **Freelancing Platform** - Project bidding, contracts, milestones, escrow payments
- **KYC Verification** - Document upload and admin verification
- **Messaging System** - Real-time communication between users
- **Support Tickets** - Customer support with priority levels
- **Dispute Resolution** - Admin-managed dispute handling
- **Wallet & Payments** - Escrow-based payment system

---

## User Roles
1. **Students** - Enroll in courses, attend sessions, submit assignments
2. **Tutors** - Create courses, teach sessions, grade assignments
3. **Freelancers** - Bid on projects, manage contracts, receive payments
4. **Recruiters** - Post projects, hire freelancers, manage milestones
5. **Admins** - Manage platform, verify KYC, resolve disputes

---

## Recent Changes (January 2025)

### Database Schema Extensions
- ✅ Added `assignments` table for course assignments
- ✅ Added `submissions` table for assignment submissions with grading
- ✅ Added `messages` table for user-to-user chat
- ✅ Added `support_tickets` and `ticket_replies` for customer support
- ✅ Added `contracts` and `milestones` for freelance project management
- ✅ Added `kyc_documents` for identity verification
- ✅ Added `disputes` for conflict resolution
- ✅ Added `wallets` and `wallet_transactions` for payment management

### API Endpoints Added
- ✅ `/api/assignments/*` - Assignment CRUD operations
- ✅ `/api/submissions/*` - Submit and grade assignments
- ✅ `/api/messages/*` - Send messages and get conversations
- ✅ `/api/support-tickets/*` - Create and manage support tickets
- ✅ `/api/contracts/*` & `/api/milestones/*` - Contract management
- ✅ `/api/kyc-documents/*` - KYC document upload and verification
- ✅ `/api/disputes/*` - Dispute creation and resolution
- ✅ `/api/wallets/*` - Wallet and transaction management

### UI Components Created
- ✅ `ConfirmationDialog` - Reusable confirmation modal
- ✅ `FileUploadDialog` - File upload with validation
- ✅ `ErrorBoundary` - Error handling wrapper
- ✅ `LoadingSpinner` - Loading states (sm, md, lg sizes)
- ✅ `EmptyState` - Empty data placeholders
- ✅ Error handling utilities (`client/src/lib/errorHandling.ts`)
- ✅ API client utilities (`client/src/lib/api.ts`)

### Backend Enhancements
- ✅ Comprehensive error handling middleware (`server/middleware/errorHandler.ts`)
- ✅ Extended storage functions (`server/storage-extended.ts`)
- ✅ Extended API routes (`server/routes-extended.ts`)
- ✅ Zod validation for all new endpoints
- ✅ Custom error classes (AppError, validation errors, etc.)

---

## Project Architecture

### Tech Stack
**Frontend:**
- React 18 + TypeScript
- Vite (dev server on 0.0.0.0:5000 for Replit proxy)
- Wouter (routing)
- TanStack Query (data fetching)
- Radix UI + Tailwind CSS (components)
- React Hook Form + Zod (forms & validation)
- Framer Motion (animations)

**Backend:**
- Node.js 20 + Express
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon database)
- Passport.js (authentication)
- Session store (connect-pg-simple)
- Bcryptjs (password hashing)

**Infrastructure:**
- Replit hosting
- PostgreSQL database (development)
- Port 5000 (only non-firewalled port)

---

## File Structure
```
├── client/                   # Frontend React app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── modals/     # Modal dialogs
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── pages/          # 90+ pages for all roles
│   │   │   ├── global/     # Landing, login, register
│   │   │   ├── student/    # Student portal
│   │   │   ├── tutor/      # Tutor portal
│   │   │   ├── freelancer/ # Freelancer portal
│   │   │   ├── recruiter/  # Recruiter portal
│   │   │   └── admin/      # Admin portal
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities
│   │   │   ├── api.ts      # API client functions
│   │   │   ├── errorHandling.ts # Error utilities
│   │   │   └── utils.ts
│   │   └── main.tsx        # Entry point
│   └── index.html
├── server/                  # Backend Express app
│   ├── middleware/         # Express middleware
│   │   └── errorHandler.ts # Error handling
│   ├── routes.ts           # Core API routes
│   ├── routes-extended.ts  # Extended API routes
│   ├── storage.ts          # Core database functions
│   ├── storage-extended.ts # Extended database functions
│   ├── db.ts               # Database connection
│   ├── auth.ts             # Authentication logic
│   └── index.ts            # Server entry point
├── shared/                 # Shared code
│   └── schema.ts          # Database schema (Drizzle)
├── FEATURES.md            # Complete features documentation
├── package.json
├── vite.config.ts         # Vite configuration (CRITICAL: allowedHosts)
└── drizzle.config.ts      # Database migrations config
```

---

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

---

## Database Schema

### Core Tables
- `users` - All platform users with roles
- `courses` - Course catalog
- `lessons` - Course content
- `enrollments` - Student course enrollments
- `sessions` - 1-on-1 tutoring sessions
- `projects` - Freelance projects
- `bids` - Project bids from freelancers
- `reviews` - User reviews and ratings
- `payments` - Payment records
- `certificates` - Course completion certificates
- `notifications` - User notifications

### Extended Tables (Added Jan 2025)
- `assignments` - Course assignments
- `submissions` - Assignment submissions with grades
- `messages` - User-to-user chat messages
- `support_tickets` - Customer support tickets
- `ticket_replies` - Support ticket responses
- `contracts` - Freelance contracts
- `milestones` - Project milestones
- `kyc_documents` - KYC verification documents
- `disputes` - User disputes
- `wallets` - User payment wallets
- `wallet_transactions` - Payment transaction history

---

## Environment Setup

### Critical Configuration
**Vite MUST allow all hosts for Replit proxy:**
```typescript
// vite.config.ts
server: {
  host: '0.0.0.0',
  port: 5000,
  allowedHosts: true, // REQUIRED for Replit
}
```

### Test Accounts
```
Student:    student@yeesp.com    / password123
Tutor:      tutor@yeesp.com      / password123
Freelancer: freelancer@yeesp.com / password123
Recruiter:  recruiter@yeesp.com  / password123
Admin:      admin@yeesp.com      / admin123
```

---

## Development Commands
```bash
npm install              # Install dependencies
npm run dev             # Start development server (port 5000)
npm run build           # Build for production
npm run db:push         # Sync database schema
npm run db:studio       # Open Drizzle Studio
```

---

## API Error Handling

### Backend Error Responses
```json
{
  "error": "Error message",
  "message": "User-friendly message",
  "details": [] // For validation errors
}
```

### Frontend Error Handling
1. All API calls wrapped in try-catch
2. Use `handleApiError()` to format error messages
3. Display errors via toast notifications
4. Show loading states during async operations
5. Error boundaries catch component crashes

---

## Current Status

### ✅ Completed (100%)
- Database schema with all tables
- API routes for all features
- 90+ pages for all user roles
- Authentication & authorization
- Error handling (backend + frontend)
- Reusable UI components
- Modal dialogs (confirmation, file upload)
- Loading states & error boundaries
- Toast notifications (via shadcn)
- Wallet & payment system
- KYC verification
- Support ticket system
- Messaging system
- Dispute resolution

### 🚧 In Progress
- Connecting all pages to real API data (replacing mock data)
- Adding form validation to all forms
- Testing all features end-to-end

### 📋 Optional Enhancements
- Real-time WebSocket chat
- Video conferencing integration (Zoom/Jitsi)
- Stripe payment integration
- Email notifications (SendGrid/Mailgun)
- File storage (AWS S3/Cloudinary)
- PDF certificate generation
- Advanced analytics dashboard

---

## Important Notes

### Replit-Specific
- Server MUST bind to `0.0.0.0:5000` (only port not firewalled)
- Vite MUST allow all hosts for proxy to work
- Database is development only (production DB managed separately)
- Use `npm run db:push` not manual migrations

### Security
- Passwords hashed with bcryptjs (10 rounds)
- SQL injection prevented by Drizzle ORM
- XSS prevented by React's default escaping
- CSRF tokens via session middleware
- Input validation with Zod schemas
- Role-based access control

### Best Practices
- Never expose secrets in code
- Always validate input (backend + frontend)
- Use TypeScript types for safety
- Handle all errors gracefully
- Show loading states for async operations
- Use toast notifications for feedback
- Keep components small and reusable
- Follow RESTful API conventions

---

## Key Features Summary

🎓 **LMS**: Courses, lessons, assignments, progress tracking, certificates
👨‍🏫 **Tutoring**: Session scheduling, video calls, ratings, payments
💼 **Freelancing**: Project bidding, contracts, milestones, escrow
💰 **Payments**: Wallets, transactions, escrow holds/releases
💬 **Messaging**: 1-on-1 chat, attachments, read receipts
🎫 **Support**: Tickets with priority, categories, admin assignment
✅ **KYC**: Document upload, admin verification, rejection feedback
⚖️ **Disputes**: Raise disputes, admin investigation, resolution
📊 **Admin**: User management, analytics, verification, support
🔔 **Notifications**: Real-time alerts, notification center

---

## Contact & Support
For bugs or issues, create a support ticket through the platform.

**Platform URL**: (Replit URL)
**Admin Email**: admin@yeesp.com
**Project**: YEESP v1.0
**Last Updated**: January 25, 2025
