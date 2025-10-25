# YEESP - Youth Education and Employment Support Platform

> **Your All-in-One Platform for Learning, Teaching, and Freelancing**

YEESP is a comprehensive multi-role platform that combines a Learning Management System (LMS), Tutoring Marketplace, and Freelancing Platform to empower youth through education and employment opportunities.

---

## 🎯 Platform Overview

YEESP serves **five distinct user roles**, each with dedicated features and dashboards:

- **👨‍🎓 Students**: Learn new skills, take courses, and book tutoring sessions
- **👩‍🏫 Tutors**: Create courses, teach students, and earn through tutoring
- **💼 Freelancers**: Find projects, submit bids, and build your portfolio
- **🏢 Recruiters**: Post projects, hire freelancers, and manage contracts
- **⚡ Admins**: Manage the entire platform, approve projects, and handle KYC

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd yeesp-platform

# Install dependencies
npm install

# Set up database
npm run db:push

# Create test users
npm run setup-test-users
```

### 2. Start the Platform

```bash
npm run dev
```

The platform will be available at `http://localhost:5000`

### 3. Login with Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | `student@test.com` | `password123` |
| Tutor | `tutor@test.com` | `password123` |
| Freelancer | `freelancer@test.com` | `password123` |
| Recruiter | `recruiter@test.com` | `password123` |
| Admin | `admin@test.com` | `admin123` |

**See [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md) for complete testing guide.**

---

## ✨ Key Features

### 📚 Learning Management System (LMS)
- Course creation with multimedia content (videos, documents, quizzes)
- Student enrollment and progress tracking
- Assignment submission and grading
- Automated certificate generation
- Course reviews and ratings

### 👨‍🏫 Tutoring Marketplace
- 1-on-1 tutoring session scheduling
- Video conferencing integration (Zoom & Dyte)
- Session management and attendance tracking
- Tutor profiles with ratings and reviews
- Flexible pricing and availability

### 💼 Freelancing Platform
- Project posting by recruiters
- **Admin project approval system** (NEW!)
- Freelancer bidding and proposals
- Milestone-based project management
- Escrow payment system
- Portfolio and skills showcase

### ⚡ Admin Control Panel
- Comprehensive platform dashboard
- User management and moderation
- **Project approval workflow** (NEW!)
- KYC document verification
- Role request approval
- Dispute resolution
- Platform statistics and analytics

### 🔐 Security Features
- Session-based authentication with bcrypt
- Role-based access control (RBAC)
- Ownership validation on all operations
- Automatic foreign key derivation from authenticated sessions
- Protected client-side routes
- Admin approval for sensitive operations

---

## 🏗 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Radix UI** + **Tailwind CSS** for components
- **React Hook Form** + **Zod** for forms and validation
- **Framer Motion** for animations

### Backend
- **Node.js 20** with Express
- **TypeScript** for type safety
- **Drizzle ORM** with PostgreSQL
- **Passport.js** for authentication
- **Bcryptjs** for password hashing
- **WebSockets** for real-time notifications

### Integrations
- **Stripe** for payment processing
- **SendGrid** for email notifications
- **Zoom** & **Dyte** for video conferencing
- **PDFKit** for certificate generation
- **QR Code** generation for certificate verification

---

## 📁 Project Structure

```
yeesp-platform/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components (student, tutor, admin, etc.)
│   │   ├── components/ # Reusable UI components
│   │   ├── lib/        # API client and utilities
│   │   └── hooks/      # Custom React hooks
│   └── index.html
│
├── server/             # Express backend
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # Main API routes
│   ├── routes-admin.ts # Admin-specific routes
│   ├── storage.ts      # Database access layer
│   ├── middleware/     # Authentication & authorization
│   └── services/       # Business logic (PDF, email, WebSocket)
│
├── shared/             # Shared code (schemas, types)
│   └── schema.ts       # Database schema and Zod validators
│
├── scripts/            # Utility scripts
│   ├── create-admin.js # Create admin accounts
│   └── setup-test-users.js # Set up test users
│
└── public/             # Static assets
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database (auto-configured on Replit)
DATABASE_URL=postgresql://...

# Session Secret
SESSION_SECRET=your-secret-key-here

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Zoom (for video conferencing)
ZOOM_ACCOUNT_ID=...
ZOOM_CLIENT_ID=...
ZOOM_CLIENT_SECRET=...
ZOOM_SDK_KEY=...
ZOOM_SDK_SECRET=...
```

### Optional Configuration
- **SendGrid**: Email integration (pre-configured via Replit)
- **Dyte**: Alternative video conferencing SDK

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run db:push` | Sync database schema |
| `npm run setup-test-users` | Create/reset test accounts |
| `npm run create-admin` | Create new admin account |

---

## 🎓 User Journeys

### Student Journey
1. Register/Login as student
2. Browse available courses
3. Enroll in courses
4. Complete lessons and assignments
5. Earn certificates
6. Book tutoring sessions
7. Rate tutors and courses

### Tutor Journey
1. Register/Login as tutor
2. Create and publish courses
3. Upload course materials
4. Manage student enrollments
5. Schedule tutoring sessions
6. Conduct video sessions
7. Grade assignments

### Freelancer Journey
1. Register/Login as freelancer
2. Browse approved projects
3. Submit competitive bids
4. Work on projects
5. Complete milestones
6. Receive escrow payments
7. Build portfolio

### Recruiter Journey
1. Register/Login as recruiter
2. Post new project (goes to pending)
3. Wait for admin approval
4. Review freelancer bids
5. Hire freelancers
6. Create milestone payments
7. Release funds upon completion

### Admin Journey
1. Login as admin
2. View platform statistics
3. **Approve/reject pending projects**
4. Verify KYC documents
5. Manage user accounts
6. Handle disputes
7. Monitor platform health

---

## 🔐 Security Architecture

### Authentication
- Session-based authentication with secure cookies
- Password hashing with bcrypt (10 rounds)
- CSRF protection via session tokens

### Authorization
- **requireAuth middleware**: All sensitive routes require authentication
- **requireRole middleware**: Role-based access control
- **Ownership validation**: Users can only modify their own resources
- **Automatic ID derivation**: Foreign keys derived from authenticated session

### Data Protection
- SQL injection prevention (Drizzle ORM parameterized queries)
- XSS prevention (React's built-in sanitization)
- Input validation (Zod schemas on all API endpoints)

---

## 📊 Database Schema

### Core Tables
- `users` - User accounts and profiles
- `courses` - Course information
- `enrollments` - Student course enrollments
- `sessions` - Tutoring sessions
- `projects` - Freelance projects
- `bids` - Freelancer bids on projects
- `payments` - Payment transactions
- `notifications` - Real-time notifications
- `certificates` - Course completion certificates
- `reviews` - Ratings and reviews
- `role_requests` - User role change requests
- `kyc_documents` - KYC verification documents

---

## 🚀 Deployment

### Prerequisites
- PostgreSQL database
- Node.js 20+
- Environment variables configured

### Steps
1. Build the application:
   ```bash
   npm run build
   ```

2. Set environment to production:
   ```bash
   export NODE_ENV=production
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Configure reverse proxy (nginx/Apache) if needed

---

## 🧪 Testing

### Run Test Suite
```bash
npm test
```

### Manual Testing
See [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md) for comprehensive testing guide with test accounts.

### Test Coverage
- ✅ Authentication flows
- ✅ Role-based access control
- ✅ Course enrollment
- ✅ Project bidding
- ✅ Admin approval workflows
- ✅ Payment processing

---

## 📚 Documentation

- **[TEST_ACCOUNTS.md](TEST_ACCOUNTS.md)** - Complete testing guide with test credentials
- **[PRODUCTION_STATUS.md](PRODUCTION_STATUS.md)** - Production readiness report

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Developer

**Fasih ur Rehman**  
Email: fasih31@gmail.com

---

## 🎯 Platform Status

### ✅ Production Ready
- Core LMS functionality
- Tutoring marketplace
- Freelancing platform with admin approval
- User authentication and authorization
- Admin control panel
- KYC verification
- Real-time notifications

### ⚠️ Requires Configuration
- Stripe payments (add API keys)
- Email notifications (SendGrid pre-configured)
- Video conferencing (add Zoom/Dyte keys)

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Contact: fasih31@gmail.com

---

**Built with ❤️ for empowering youth through education and employment**
