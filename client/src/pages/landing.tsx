import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star, BookOpen, Video, MessageSquare, Shield } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean Split Layout */}
      <Section spacing="xl" background="gradient" className="min-h-[90vh] flex items-center">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <Badge className="text-sm">
                Your All-in-One Platform for Growth
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Learn. Earn.{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Evolve.
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Join thousands of students, tutors, and freelancers building their future with quality education and real opportunities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/register">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base" asChild>
                  <Link href="/courses">
                    Browse Courses
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative hidden lg:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 backdrop-blur-sm border border-primary/10">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-4 mb-8">
                      <div className="h-16 w-16 rounded-xl bg-white shadow-lg flex items-center justify-center">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div className="h-16 w-16 rounded-xl bg-white shadow-lg flex items-center justify-center">
                        <Briefcase className="h-8 w-8 text-accent" />
                      </div>
                      <div className="h-16 w-16 rounded-xl bg-white shadow-lg flex items-center justify-center">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <p className="text-lg font-semibold">All-in-One Platform</p>
                    <p className="text-muted-foreground">Learning, Tutoring & Freelancing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Features Section */}
      <Section spacing="lg" background="white">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're learning, teaching, or freelancing, YEESP provides all the tools you need to succeed.
            </p>
          </div>

          <Grid cols={4} gap="lg">
            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Learn</CardTitle>
                <CardDescription>
                  Access thousands of courses across various categories and skill levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Teach</CardTitle>
                <CardDescription>
                  Share your expertise and earn by creating courses or tutoring students
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Freelance</CardTitle>
                <CardDescription>
                  Find projects, submit proposals, and build your freelance career
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Grow</CardTitle>
                <CardDescription>
                  Earn certificates, build your portfolio, and advance your career
                </CardDescription>
              </CardHeader>
            </Card>
          </Grid>
        </PageContainer>
      </Section>

      {/* How It Works */}
      <Section spacing="lg" background="gray">
        <PageContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How YEESP Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up for free and choose your role: Student, Tutor, Freelancer, or Recruiter
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">Explore & Connect</h3>
              <p className="text-muted-foreground">
                Browse courses, find tutors, or discover freelance opportunities that match your goals
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Achieve Goals</h3>
              <p className="text-muted-foreground">
                Learn new skills, earn money, and build your professional portfolio
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Benefits Section */}
      <Section spacing="lg" background="white">
        <PageContainer>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Why Choose YEESP?
              </h2>
              <p className="text-lg text-muted-foreground">
                We provide everything you need to learn, earn, and grow professionally in one integrated platform.
              </p>

              <div className="space-y-4">
                {[
                  { icon: BookOpen, title: "Quality Content", desc: "Expert-created courses and verified tutors" },
                  { icon: Video, title: "Live Sessions", desc: "Real-time video conferencing with Zoom & Dyte" },
                  { icon: Shield, title: "Secure Payments", desc: "Escrow-based wallet system for safe transactions" },
                  { icon: MessageSquare, title: "24/7 Support", desc: "Dedicated support team ready to help" },
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold">Platform Features</h3>
              <div className="space-y-3">
                {[
                  "Comprehensive Learning Management System",
                  "1-on-1 Tutoring Marketplace",
                  "Freelance Project Bidding",
                  "Real-time Video Conferencing",
                  "Secure Wallet & Payments",
                  "Certificate Generation",
                  "Progress Tracking & Analytics",
                  "24/7 Support System",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" background="gradient">
        <PageContainer maxWidth="md">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of learners, tutors, and freelancers already building their future on YEESP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-base" asChild>
                <Link href="/register">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Footer Note */}
      <Section spacing="sm" background="white" className="border-t">
        <PageContainer>
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Developed by <span className="font-semibold text-foreground">Fasih ur Rehman</span> | YEESP - Youth Education and Employment Support Platform
            </p>
          </div>
        </PageContainer>
      </Section>
    </div>
  );
}
