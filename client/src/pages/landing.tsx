import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        {/* Floating orbs for visual interest */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-20">
          <Badge className="mb-6 text-sm animate-fade-in hover-elevate" data-testid="badge-platform-tagline">
            Your All-in-One Platform for Growth
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up" data-testid="text-hero-title">
            Learn. Earn. <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Evolve.</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in" data-testid="text-hero-subtitle">
            Join thousands of students, tutors, and freelancers building their future on YEESP
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button size="lg" className="w-full sm:w-auto hover-elevate-2 transition-all" asChild data-testid="button-get-started">
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto hover-elevate" asChild data-testid="button-browse-courses">
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're learning, teaching, or freelancing, YEESP has you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-elevate" data-testid="card-feature-education">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Education Portal</CardTitle>
                <CardDescription>
                  Access thousands of courses across various categories and skill levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-tutoring">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Tutoring Hub</CardTitle>
                <CardDescription>
                  Book one-on-one sessions with expert tutors in your field of interest
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-freelancing">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Freelancing Platform</CardTitle>
                <CardDescription>
                  Find projects, build your portfolio, and earn while you learn
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-certificates">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Certificates</CardTitle>
                <CardDescription>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="step-signup">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account and choose your role: Student, Tutor, or Freelancer
              </p>
            </div>

            <div className="text-center" data-testid="step-explore">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore & Connect</h3>
              <p className="text-muted-foreground">
                Browse courses, find tutors, or discover freelance opportunities
              </p>
            </div>

            <div className="text-center" data-testid="step-achieve">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn & Achieve</h3>
              <p className="text-muted-foreground">
                Complete courses, attend sessions, and earn certificates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-students">
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Students Enrolled</div>
            </div>
            <div data-testid="stat-courses">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Courses Available</div>
            </div>
            <div data-testid="stat-projects">
              <div className="text-5xl font-bold mb-2">1,200+</div>
              <div className="text-lg opacity-90">Projects Completed</div>
            </div>
            <div data-testid="stat-success">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-lg opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-cta-heading">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join YEESP and unlock your potential with our comprehensive learning and earning platform
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild data-testid="button-cta-register">
              <Link href="/register">
                Create Free Account
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-cta-login">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
