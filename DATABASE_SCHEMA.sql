
```sql
-- YEESP Platform - Complete Database Schema
-- Compatible with PostgreSQL, Supabase, or any PostgreSQL-based database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'tutor', 'freelancer', 'recruiter', 'admin')),
  avatar TEXT,
  bio TEXT,
  headline TEXT,
  skills TEXT[],
  hourly_rate DECIMAL(10, 2),
  verified BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- ROLE MANAGEMENT
-- =====================================================

CREATE TABLE role_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  requested_role TEXT NOT NULL CHECK (requested_role IN ('student', 'tutor', 'freelancer', 'recruiter')),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  review_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE user_approved_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  approved_role TEXT NOT NULL CHECK (approved_role IN ('student', 'tutor', 'freelancer', 'recruiter')),
  approved_by UUID NOT NULL REFERENCES users(id),
  approved_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- COURSES & EDUCATION
-- =====================================================

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  thumbnail TEXT,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration INTEGER,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  video_url TEXT,
  "order" INTEGER NOT NULL,
  duration INTEGER
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  enrolled_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  due_date TIMESTAMP NOT NULL,
  total_points INTEGER NOT NULL,
  attachments TEXT[],
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachments TEXT[],
  grade INTEGER,
  feedback TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'graded', 'late')),
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
  graded_at TIMESTAMP
);

-- =====================================================
-- TUTORING SESSIONS
-- =====================================================

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tutor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  video_provider TEXT NOT NULL DEFAULT 'dyte' CHECK (video_provider IN ('dyte', 'zoom')),
  meeting_url TEXT,
  video_room_id TEXT,
  zoom_meeting_id TEXT,
  zoom_password TEXT,
  recording_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  left_at TIMESTAMP,
  duration INTEGER,
  status TEXT NOT NULL DEFAULT 'present',
  notes TEXT
);

-- =====================================================
-- FREELANCE PROJECTS
-- =====================================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recruiter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  skills TEXT[],
  deadline TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  proposal TEXT NOT NULL,
  bid_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recruiter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'disputed')),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  due_date TIMESTAMP NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'approved', 'rejected', 'paid')),
  completed_at TIMESTAMP,
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- PAYMENTS & WALLET
-- =====================================================

CREATE TABLE wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
  escrow_balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'escrow_hold', 'escrow_release', 'earning', 'payout')),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  reference_id UUID,
  stripe_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  net_amount DECIMAL(10, 2) NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('course', 'session', 'project')),
  entity_id UUID NOT NULL,
  stripe_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- REVIEWS & RATINGS
-- =====================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('course', 'session', 'project')),
  entity_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- CERTIFICATES
-- =====================================================

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  certificate_url TEXT,
  issued_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- NOTIFICATIONS & MESSAGES
-- =====================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('course', 'assignment', 'message', 'payment', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachments TEXT[],
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- SUPPORT & DISPUTES
-- =====================================================

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technical', 'billing', 'general')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE ticket_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  attachments TEXT[],
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  raised_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('project', 'session', 'payment')),
  entity_id UUID NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
  resolution TEXT,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  resolved_at TIMESTAMP
);

-- =====================================================
-- KYC & VERIFICATION
-- =====================================================

CREATE TABLE kyc_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('id_card', 'passport', 'selfie', 'address_proof')),
  document_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  verified_by UUID REFERENCES users(id),
  submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
  verified_at TIMESTAMP
);

-- =====================================================
-- STUDY GROUPS & BLOG
-- =====================================================

CREATE TABLE study_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  max_members INTEGER DEFAULT 10,
  meeting_schedule TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE study_group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW() NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator'))
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  tags TEXT[],
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  text_body TEXT NOT NULL,
  variables TEXT[],
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_sessions_tutor ON sessions(tutor_id);
CREATE INDEX idx_sessions_student ON sessions(student_id);
CREATE INDEX idx_projects_recruiter ON projects(recruiter_id);
CREATE INDEX idx_bids_project ON bids(project_id);
CREATE INDEX idx_bids_freelancer ON bids(freelancer_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
```
