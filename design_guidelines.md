# YEESP Platform Design Guidelines

## Design Approach

**Selected Framework:** Material Design 3 with custom adaptations
**Rationale:** YEESP requires a professional, scalable design system that supports complex data displays, multi-role dashboards, and educational content. Material Design provides excellent patterns for information hierarchy, data tables, and form-heavy interfaces while maintaining accessibility and consistency across roles.

**Reference Inspiration:** Notion (dashboard organization) + Coursera (course catalog) + Linear (clean navigation) + Udemy (course cards)

## Core Design Principles

1. **Role Clarity:** Each user role (Student, Tutor, Freelancer, Recruiter, Admin) has distinct visual markers and navigation patterns
2. **Data Hierarchy:** Information-dense interfaces use clear typography scales and spacing to prevent cognitive overload
3. **Action-Oriented:** Primary CTAs are always visible and contextually relevant to user goals
4. **Trust & Credibility:** Professional aesthetic with verification badges, ratings, and certificates prominently displayed

## Typography System

**Font Families:**
- Primary: Inter (headings, UI elements, navigation)
- Secondary: Source Sans Pro (body text, descriptions, course content)

**Scale & Usage:**
- Hero/Page Titles: 48px (3xl), font-weight 700, tracking tight
- Section Headings: 32px (2xl), font-weight 600
- Card/Component Titles: 20px (xl), font-weight 600
- Body Large: 18px (lg), font-weight 400, line-height 1.6
- Body Default: 16px (base), font-weight 400, line-height 1.5
- Small/Meta: 14px (sm), font-weight 400
- Captions: 12px (xs), font-weight 500, uppercase tracking

## Layout System

**Spacing Primitives:** Use Tailwind units of 1, 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Card spacing: p-6
- Form field gaps: gap-4
- Grid gaps: gap-6 to gap-8

**Container Widths:**
- Dashboard content: max-w-7xl
- Forms and narrow content: max-w-2xl
- Course catalogs/grids: w-full with responsive grids

**Grid Patterns:**
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Feature sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Tutor listings: grid-cols-1 lg:grid-cols-2 gap-4
- Dashboard widgets: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

## Component Library

### Navigation
**Main Header:** Fixed top navigation with logo left, primary nav center, user menu/notifications right. Height h-16, backdrop blur effect when scrolling.

**Role-Specific Sidebar:** Left sidebar (w-64) for dashboard views with collapsible sections, active state indicators, and role badge at top. Icons from Heroicons.

### Cards
**Course Card:** Elevated card with course thumbnail (16:9 ratio), category badge, title, instructor info with avatar, price, rating stars, and enroll button. Shadow on hover with subtle lift transform.

**Profile Card:** Avatar (96px), name, headline, skill tags, rating display, hourly rate badge, "Book Session" or "View Profile" CTA.

**Project Card:** Title, company logo, budget range, required skills as chips, deadline, applicant count, "Apply Now" button.

### Forms
**Input Fields:** Border style with focus ring, label above input, helper text below, error states in red with icon. Consistent height h-11.

**Search Bars:** Prominent search with icon left, filters dropdown right, rounded-lg borders.

**File Uploads:** Drag-and-drop zones with dashed borders, file type icons, progress bars for uploads.

### Dashboard Widgets
**Stats Cards:** Icon left in circular container, metric large and bold, label below, optional trend indicator (arrow + percentage).

**Activity Feed:** Timeline style with avatar, action text, timestamp, view details link.

**Calendar Widget:** Week/month view with color-coded event types (sessions, deadlines, assignments).

### Data Display
**Tables:** Zebra striping for rows, sortable headers with arrow icons, action buttons right-aligned, pagination at bottom.

**Progress Bars:** Rounded bars with percentage label, gradient fills for completion status.

**Rating Display:** Star icons (filled/half/empty) with numerical rating and review count.

### Modals & Overlays
**Modal Dialogs:** Centered overlay with backdrop blur, max-w-2xl, close button top-right, action buttons bottom-right.

**Notifications Toast:** Fixed top-right, slide-in animation, auto-dismiss, icon left indicating type (success/error/info).

### Buttons
**Primary CTA:** Solid fill, font-weight 600, px-6 py-3, rounded-lg, shadow-sm
**Secondary:** Border style with transparent background
**Tertiary:** Text-only with underline on hover
**Icon Buttons:** Square or circular, p-2, subtle hover background

### Badges & Tags
**Skill Tags:** Rounded-full, px-3 py-1, text-sm, subtle background
**Status Badges:** Uppercase text-xs, px-2 py-1, rounded, color-coded (green=active, yellow=pending, gray=inactive)
**Verification Badge:** Icon with checkmark, inline with name

## Page-Specific Layouts

### Landing Page (Marketing)
**Hero Section:** Full-width h-screen with large headline "Learn. Earn. Evolve.", subheadline, dual CTAs ("Get Started" + "Watch Demo"), background with subtle gradient and geometric patterns. Student/tutor illustrations on right.

**Features Grid:** 4-column grid showcasing Education Portal, Tutoring Hub, Freelancing Platform, and Certificates with icons, titles, descriptions.

**How It Works:** 3-step process with numbered circles, connecting lines, icons, and descriptions.

**Stats Section:** 4-column layout with large numbers (students enrolled, courses available, freelance projects, success rate).

**Testimonials:** 3-column cards with user photos, quotes, name, and role.

**Pricing Section:** 3-column comparison table for Self-Study, Hybrid, Full Tutoring modes.

**CTA Section:** Centered with headline "Start Your Journey Today", dual buttons, no distracting elements.

### Student Dashboard
**Overview Tab:** Stats row (enrolled courses, completed, hours learned, certificates earned) + upcoming sessions calendar + recommended courses grid + recent activity feed.

**My Courses Tab:** Filter bar (all/in-progress/completed) + course grid with progress indicators + "Continue Learning" prominent CTAs.

### Tutor Dashboard
**Overview Tab:** Earnings card prominent top-left + upcoming sessions list + student management quick links + profile completion meter.

**Course Authoring:** Side panel with course structure tree + main editor area with WYSIWYG for lessons + preview mode.

### Course Catalog
**Filter Sidebar:** Left sidebar (w-80) with category tree, skill checkboxes, price range slider, rating filter, learning mode selector.

**Main Grid:** Responsive course cards with search bar above, sort dropdown (relevance/price/rating/newest).

### Session Booking
**Tutor Profile:** Avatar and bio left column (w-1/3) + availability calendar right (w-2/3) with time slots as clickable buttons, booked slots disabled.

### Freelancer Marketplace
**Project Listings:** Search/filter bar + project cards in list view with expandable details + sidebar with saved projects and application status.

## Images

**Hero Section Image:** Professional photo of diverse young people collaborating on laptops in modern co-working space, placed as background with 50% opacity overlay to ensure text readability.

**Feature Section Icons:** Use Heroicons for Education (academic-cap), Tutoring (user-group), Freelancing (briefcase), Certificates (badge-check).

**Course Thumbnails:** 1200x675px placeholders with category-specific abstract graphics (code brackets for programming, design tools for design, etc.).

**User Avatars:** Circular 40px-96px depending on context, placeholder initials for users without photos.

**Empty States:** Friendly illustrations for "No courses yet", "No upcoming sessions", "No applications" with encouraging CTAs.

## Accessibility

- Minimum contrast ratio 4.5:1 for body text, 3:1 for large text
- All interactive elements minimum 44x44px touch targets
- Form inputs with visible labels, not just placeholders
- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- ARIA labels for icon-only buttons
- Keyboard navigation support with logical tab order

## Responsive Behavior

**Breakpoints:**
- Mobile: Base styles (< 768px)
- Tablet: md: (768px+) - 2-column grids, compact sidebar
- Desktop: lg: (1024px+) - 3-4 column grids, full sidebar
- Wide: xl: (1280px+) - Maximum width containers, expanded content

**Mobile Adaptations:**
- Sidebar becomes bottom navigation bar or hamburger menu
- Tables convert to stacked cards
- Multi-column grids stack to single column
- Search filters collapse into modal drawer