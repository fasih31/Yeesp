import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainNav } from "@/components/navigation/main-nav";

// Pages
import Landing from "@/pages/landing";
import Register from "@/pages/register";
import Login from "@/pages/login";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Pricing from "@/pages/pricing";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import Tutors from "@/pages/tutors";
import TutorProfile from "@/pages/tutor-profile";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import CreateProject from "@/pages/create-project";
import StudentDashboard from "@/pages/dashboard-student";
import TutorDashboard from "@/pages/dashboard-tutor";
import FreelancerDashboard from "@/pages/dashboard-freelancer";
import RecruiterDashboard from "@/pages/dashboard-recruiter";
import MyCourses from "@/pages/student/my-courses";
import CoursePlayer from "@/pages/student/course-player";
// Import new student pages
import Assignments from "@/pages/student/assignments";
import BookTutor from "@/pages/student/book-tutor";
import Bookings from "@/pages/student/bookings";
import Certificates from "@/pages/student/certificates";
import FreelanceOnboarding from "@/pages/student/freelance-onboarding";
import MyFreelanceProjects from "@/pages/student/my-freelance-projects";
import StudentPayments from "@/pages/student/payments";
import StudentMessages from "@/pages/student/messages";
import StudentProfileSettings from "@/pages/student/profile-settings";
import StudentSupport from "@/pages/student/support";
import RoleRequest from "@/pages/student/role-request";
import AdminRoleRequests from "@/pages/admin/role-requests";
import TutorMyCourses from "@/pages/tutor/my-courses";
import TutorCreateCourse from "@/pages/tutor/create-course";
import TutorSessions from "@/pages/tutor/sessions";
import TutorStudents from "@/pages/tutor/students";
import TutorEarnings from "@/pages/tutor/earnings";
import TutorAssignments from "@/pages/tutor/assignments";
import TutorMessages from "@/pages/tutor/messages";
import TutorProfileSettings from "@/pages/tutor/profile-settings";
import RecruiterPostProject from "@/pages/recruiter/post-project";
import RecruiterMessages from "@/pages/recruiter/messages";
import RecruiterProfileSettings from "@/pages/recruiter/profile-settings";
import FreelancerMessages from "@/pages/freelancer/messages";
import FreelancerProfileSettings from "@/pages/freelancer/profile-settings";
import Notifications from "@/pages/notifications";
import FAQ from "@/pages/faq";
import ForgotPassword from "@/pages/forgot-password";
import Maintenance from "@/pages/maintenance";
import RecruiterMyProjects from "@/pages/recruiter/my-projects";
import RecruiterProposals from "@/pages/recruiter/proposals";
import RecruiterHireTalent from "@/pages/recruiter/hire-talent";
import RecruiterContracts from "@/pages/recruiter/contracts";
import FreelancerBrowseJobs from "@/pages/freelancer/browse-jobs";
import FreelancerMyProposals from "@/pages/freelancer/my-proposals";
import FreelancerActiveProjects from "@/pages/freelancer/active-projects";
import FreelancerEarnings from "@/pages/freelancer/earnings";
import FreelancerPortfolio from "@/pages/freelancer/portfolio";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminCourses from "@/pages/admin/courses";
import AdminProjects from "@/pages/admin/projects";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminSettings from "@/pages/admin/settings";
import PlatformSettings from "@/pages/admin/platform-settings";
import AdminReports from "@/pages/admin/reports";
import ManageAdmins from "@/pages/admin/manage-admins";
import Blog from "@/pages/blog";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import NotFound from "@/pages/not-found";
import QuizExam from "@/pages/student/quiz-exam";
import LiveSession from "@/pages/student/live-session";
import DiscussionForum from "@/pages/student/discussion-forum";
import LearningPath from "@/pages/student/learning-path";
import ProgressAnalytics from "@/pages/student/progress-analytics";
import Achievements from "@/pages/student/achievements";
import Referrals from "@/pages/student/referrals";
import StudyGroups from "@/pages/student/study-groups";
import Leaderboard from "@/pages/student/leaderboard";
import CourseReviews from "@/pages/student/course-reviews";
import Careers from "@/pages/careers";
import HelpCenter from "@/pages/help-center";
import Affiliate from "@/pages/affiliate";
import AuthLogin from "@/pages/auth/login";
import AuthSignup from "@/pages/auth/signup";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthRedirect } from "@/components/AuthRedirect";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard">
        {() => <AuthRedirect />}
      </Route>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/auth/login" component={AuthLogin} />
      <Route path="/auth/signup" component={AuthSignup} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/courses" component={Courses} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/tutors" component={Tutors} />
      <Route path="/tutor/:id" component={TutorProfile} />
      <Route path="/projects" component={Projects} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/recruiter/project/create" component={CreateProject} />
      <Route path="/dashboard/student">
        {() => (
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/tutor">
        {() => (
          <ProtectedRoute allowedRoles={['tutor']}>
            <TutorDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/freelancer">
        {() => (
          <ProtectedRoute allowedRoles={['freelancer']}>
            <FreelancerDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard/recruiter">
        {() => (
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/student/my-courses" component={MyCourses} />
      <Route path="/student/course/:id" component={CoursePlayer} />
      <Route path="/student/assignments" component={Assignments} />
      <Route path="/student/book-tutor" component={BookTutor} />
      <Route path="/student/bookings" component={Bookings} />
      <Route path="/student/certificates" component={Certificates} />
      <Route path="/student/freelance-onboarding" component={FreelanceOnboarding} />
      <Route path="/student/my-freelance-projects" component={MyFreelanceProjects} />
      <Route path="/student/payments" component={StudentPayments} />
      <Route path="/student/messages" component={StudentMessages} />
      <Route path="/student/profile-settings" component={StudentProfileSettings} />
      <Route path="/student/support" component={StudentSupport} />
      <Route path="/student/role-request" component={RoleRequest} />
      <Route path="/student/quiz/:id" component={QuizExam} />
      <Route path="/student/live-session/:id" component={LiveSession} />
      <Route path="/student/discussion-forum" component={DiscussionForum} />
      <Route path="/student/learning-path" component={LearningPath} />
      <Route path="/student/progress-analytics" component={ProgressAnalytics} />
      <Route path="/student/achievements" component={Achievements} />
      <Route path="/student/referrals" component={Referrals} />
      <Route path="/student/study-groups" component={StudyGroups} />
      <Route path="/student/leaderboard" component={Leaderboard} />
      <Route path="/student/course-review/:id" component={CourseReviews} />
      <Route path="/tutor/my-courses" component={TutorMyCourses} />
      <Route path="/tutor/course/create" component={TutorCreateCourse} />
      <Route path="/tutor/sessions" component={TutorSessions} />
      <Route path="/tutor/students" component={TutorStudents} />
      <Route path="/tutor/earnings" component={TutorEarnings} />
      <Route path="/tutor/assignments" component={TutorAssignments} />
      <Route path="/tutor/messages" component={TutorMessages} />
      <Route path="/tutor/profile-settings" component={TutorProfileSettings} />
      <Route path="/recruiter/post-project" component={RecruiterPostProject} />
      <Route path="/recruiter/messages" component={RecruiterMessages} />
      <Route path="/recruiter/profile-settings" component={RecruiterProfileSettings} />
      <Route path="/freelancer/messages" component={FreelancerMessages} />
      <Route path="/freelancer/profile-settings" component={FreelancerProfileSettings} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/faq" component={FAQ} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/maintenance" component={Maintenance} />
      <Route path="/careers" component={Careers} />
      <Route path="/help" component={HelpCenter} />
      <Route path="/affiliate" component={Affiliate} />
      <Route path="/recruiter/my-projects" component={RecruiterMyProjects} />
      <Route path="/recruiter/proposals" component={RecruiterProposals} />
      <Route path="/recruiter/hire-talent" component={RecruiterHireTalent} />
      <Route path="/recruiter/contracts" component={RecruiterContracts} />
      <Route path="/freelancer/browse-jobs" component={FreelancerBrowseJobs} />
      <Route path="/freelancer/my-proposals" component={FreelancerMyProposals} />
      <Route path="/freelancer/active-projects" component={FreelancerActiveProjects} />
      <Route path="/freelancer/earnings" component={FreelancerEarnings} />
      <Route path="/freelancer/portfolio" component={FreelancerPortfolio} />
      <Route path="/admin/dashboard">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/users">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/courses">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCourses />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/projects">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminProjects />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/analytics">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminAnalytics />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/settings">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminSettings />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/platform-settings">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <PlatformSettings />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/reports">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReports />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/role-requests">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminRoleRequests />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/admin/manage-admins">
        {() => (
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageAdmins />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/blog" component={Blog} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider delayDuration={0}>
          <div className="min-h-screen">
            <MainNav />
            <Router />
            <Toaster />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;