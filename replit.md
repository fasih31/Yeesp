# YEESP - Youth Education and Employment Support Platform

**Tagline:** Learn. Earn. Evolve.

## Overview

YEESP is a comprehensive multi-role digital learning and freelancing ecosystem that integrates:
- **Learning Management System (LMS)** - Course enrollment, progress tracking, certifications
- **Tutoring Marketplace** - 1-on-1 and group sessions with expert tutors
- **Freelancing Platform** - Project bidding and freelance work opportunities

## User Roles

1. **Students** - Enroll in courses, book tutoring sessions, track progress, earn certificates
2. **Tutors** - Create courses, conduct live sessions, manage students, earn income
3. **Freelancers** - Bid on projects, showcase skills, build portfolio, earn through gigs
4. **Recruiters** - Post projects, hire freelancers, manage contracts and payments
5. **Admins** - Manage platform, approve content, handle payments, view analytics

## Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** TanStack Query (React Query v5)
- **Forms:** React Hook Form + Zod validation

### Backend
- **Runtime:** Node.js with Express
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Authentication:** bcryptjs password hashing
- **Payments:** Stripe integration (7% platform fee)

### Key Features Implemented

#### Authentication & Users
- Secure registration/login with bcrypt password hashing
- Multi-role user system (Student, Tutor, Freelancer, Recruiter, Admin)
- User profiles with skills, bio, ratings

#### Education Portal
- Course catalog with search and filtering
- Course enrollment and progress tracking
- Lesson management
- Digital certificate generation upon completion

#### Tutoring Hub
- Tutor profiles with ratings and reviews
- Session booking and scheduling
- Live session management
- Hourly rate pricing

#### Freelancing Platform
- Project posting by recruiters
- Freelancer bidding system
- Project budget and skill matching
- Escrow payment support

#### Payments
- Stripe payment integration
- Platform fee calculation (7%)
- Payment history and tracking
- Escrow for freelance projects

#### Notifications
- User notification system
- Read/unread tracking
- Activity notifications

## Database Schema

See `shared/schema.ts` for complete schema including:
- users
- courses & lessons
- enrollments
- tutoring sessions
- freelance projects & bids
- payments
- reviews & ratings
- certificates
- notifications

## API Endpoints

All API routes are prefixed with `/api`:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (tutor)
- `PATCH /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments/my` - Get user enrollments
- `POST /api/enrollments` - Enroll in course
- `PATCH /api/enrollments/:id` - Update progress

### Sessions
- `GET /api/sessions/my` - Get user sessions
- `POST /api/sessions` - Create session
- `PATCH /api/sessions/:id` - Update session

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project (recruiter)
- `PATCH /api/projects/:id` - Update project

### Bids
- `POST /api/bids` - Submit bid (freelancer)
- `PATCH /api/bids/:id` - Update bid status

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/confirm` - Confirm payment

### Tutors
- `GET /api/tutors` - List all tutors with ratings

### Reviews
- `POST /api/reviews` - Submit review

### Certificates
- `GET /api/certificates/my` - Get user certificates

### Notifications
- `GET /api/notifications/my` - Get user notifications
- `POST /api/notifications/mark-read` - Mark notifications as read

## Replit Environment Setup

The application is configured for Replit with:
- **Server:** Runs on port 5000 (frontend + backend combined)
- **Database:** PostgreSQL (pre-configured in Replit)
- **Vite Config:** Configured to allow all hosts for Replit's proxy
- **Deployment:** Autoscale deployment configured

### Running Locally on Replit
Simply click the "Run" button - the server will start automatically on port 5000.

### Test Accounts

All test accounts use password: `password123`

- Student: `student@yeesp.com`
- Tutor: `tutor@yeesp.com`
- Freelancer: `freelancer@yeesp.com`
- Recruiter: `recruiter@yeesp.com`

### Seeding Database

Run `tsx server/seed.ts` to populate the database with test data including:
- Sample users for each role
- 5 courses across different categories
- Course lessons
- Sample projects
- Tutor sessions
- Reviews and ratings

## Design System

YEESP follows Material Design 3 principles with a blue primary color theme:
- Inter font for headings and UI
- Source Sans Pro for body text
- Consistent spacing system (p-6, p-8 for components)
- Responsive grid layouts
- Accessible color contrast ratios

See `design_guidelines.md` for detailed design specifications.

## Development Notes

- Frontend uses shadcn/ui components for consistent UI
- All forms validated with Zod schemas
- TanStack Query for efficient data fetching
- Proper error handling on all API routes
- Password hashing with bcrypt (10 salt rounds)
- Stripe integration for secure payments

## Platform Fee Structure

- Course enrollments: Immediate capture with platform fee
- Tutoring sessions: Pre-authorization or capture based on policy
- Freelance projects: 7% platform fee, escrow deposit required

## Security

- Passwords hashed with bcrypt
- Input validation with Zod
- SQL injection protection via Drizzle ORM
- CORS configuration
- Secure payment processing via Stripe

## Future Enhancements

- Admin dashboard for platform management
- Real-time notifications with WebSockets
- Video call integration for tutoring sessions
- Advanced search with Elasticsearch
- Mobile app (React Native/Flutter)
- AI-powered course recommendations
- Blockchain-verified certificates
- Multi-language support
- Advanced analytics and reporting

## Project Structure

```
/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── lib/           # Utilities and helpers
│   │   └── hooks/         # Custom React hooks
│   └── index.html
├── server/                # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database storage layer
│   ├── db.ts              # Database connection
│   ├── seed.ts            # Database seeding
│   └── index.ts           # Server entry point
├── shared/                # Shared code between frontend/backend
│   └── schema.ts          # Database schema & types
├── design_guidelines.md   # UI/UX design specifications
└── replit.md              # This file
```

## Contact & Support

YEESP - Empowering youth through education and employment opportunities.
