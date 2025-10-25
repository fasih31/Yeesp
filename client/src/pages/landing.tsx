import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />

        {/* Floating orbs for visual interest */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-20">
          <Badge className="mb-6 text-sm animate-fade-in hover-elevate" data-testid="badge-platform-tagline">
            Your All-in-One Platform for Growth
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up" data-testid="text-hero-title">
            Learn. Earn. <span className="gradient-text">Evolve.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in leading-relaxed" data-testid="text-hero-subtitle">
            Join thousands of students, tutors, and freelancers building their future on YEESP
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-bounce-in">
            <Button size="lg" className="w-full sm:w-auto hover-elevate-2 transition-all group shadow-lg hover:shadow-xl" asChild data-testid="button-get-started">
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto hover-elevate transition-all shadow-md" asChild data-testid="button-browse-courses">
              <Link href="/courses">
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-features-heading">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're learning, teaching, or freelancing, YEESP has you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover border-2 group animate-slide-up" data-testid="card-feature-education">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Education Portal</CardTitle>
                <CardDescription className="text-base">
                  Access thousands of courses across various categories and skill levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover border-2 group animate-slide-up" style={{ animationDelay: '0.1s' }} data-testid="card-feature-tutoring">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-xl">Tutoring Hub</CardTitle>
                <CardDescription className="text-base">
                  Book one-on-one sessions with expert tutors in your field of interest
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover border-2 group animate-slide-up" style={{ animationDelay: '0.2s' }} data-testid="card-feature-freelancing">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Freelancing Platform</CardTitle>
                <CardDescription className="text-base">
                  Find projects, build your portfolio, and earn while you learn
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover border-2 group animate-slide-up" style={{ animationDelay: '0.3s' }} data-testid="card-feature-certificates">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="text-xl">Certificates</CardTitle>
                <CardDescription className="text-base">
                  Earn verified certificates to showcase your achievements
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="text-how-it-works-heading">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group animate-slide-up" data-testid="step-signup">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 shimmer">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3">Sign Up</h3>
              <p className="text-muted-foreground text-lg">
                Create your account and choose your role: Student, Tutor, or Freelancer
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.15s' }} data-testid="step-explore">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-accent to-accent/80 text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 shimmer">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3">Explore & Connect</h3>
              <p className="text-muted-foreground text-lg">
                Browse courses, find tutors, or discover freelance opportunities
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.3s' }} data-testid="step-achieve">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 shimmer">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3">Learn & Achieve</h3>
              <p className="text-muted-foreground text-lg">
                Complete courses, attend sessions, and earn certificates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up" data-testid="stat-students">
              <div className="text-6xl font-bold mb-3 shimmer">10K+</div>
              <div className="text-xl opacity-95">Students Enrolled</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }} data-testid="stat-courses">
              <div className="text-6xl font-bold mb-3 shimmer">500+</div>
              <div className="text-xl opacity-95">Courses Available</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }} data-testid="stat-projects">
              <div className="text-6xl font-bold mb-3 shimmer">1,200+</div>
              <div className="text-xl opacity-95">Projects Completed</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }} data-testid="stat-success">
              <div className="text-6xl font-bold mb-3 shimmer">95%</div>
              <div className="text-xl opacity-95">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-accent/5 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-5xl font-bold mb-6 animate-slide-up" data-testid="text-cta-heading">
            Start Your Journey <span className="gradient-text">Today</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in leading-relaxed max-w-2xl mx-auto">
            Join YEESP and unlock your potential with our comprehensive learning and earning platform
          </p>
          <div className="flex flex-wrap gap-6 justify-center animate-bounce-in">
            <Button size="lg" className="px-8 py-6 text-lg shadow-xl hover:shadow-2xl group" asChild data-testid="button-cta-register">
              <Link href="/register">
                Create Free Account <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg shadow-lg" asChild data-testid="button-cta-login">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background/50 py-16 px-6 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="font-bold text-xl gradient-text">YEESP</h3>
            <p className="text-muted-foreground">
              Building the future of learning and earning, one skill at a time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a></li>
              <li><a href="/tutors" className="text-muted-foreground hover:text-foreground transition-colors">Tutors</a></li>
              <li><a href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="/affiliate" className="text-muted-foreground hover:text-foreground transition-colors">Affiliate Program</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-muted-foreground mt-16 space-y-2">
          <p>© {new Date().getFullYear()} YEESP. All rights reserved.</p>
          <p className="text-sm">Developed by <span className="font-semibold text-foreground">Fasih ur Rehman</span></p>
        </div>
      </footer>
    </div>
  );
}