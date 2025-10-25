import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Eye, Heart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 mt-4">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl -z-10" />
          <Badge className="mb-4 animate-fade-in">Our Story</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-slide-up" data-testid="text-about-title">
            Building the Future of Learning & Earning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed">
            YEESP is more than a platform—it's a movement to democratize education and create economic opportunities for youth worldwide.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: "2020", label: "Founded" },
            { value: "50+", label: "Countries" },
            { value: "10K+", label: "Active Users" },
            { value: "$2M+", label: "Earned by Freelancers" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="hover-elevate">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a unified ecosystem where learning, teaching, and earning converge seamlessly.
                We envision a world where every student can access quality education, every tutor can share
                their expertise, and every freelancer can build their career.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize access to education and opportunities by providing an all-in-one platform
                that connects students, tutors, and freelancers. We bridge the gap between learning and
                earning, making professional growth accessible to everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-accent/5 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in education and professional opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground">
                Our platform thrives on the success and collaboration of our community
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Focused</h3>
              <p className="text-muted-foreground">
                We're committed to helping every user achieve their personal and professional goals
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Passionate individuals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Fasih ur Rehman", role: "Founder & CEO", emoji: "👨‍💼" },
              { name: "Sarah Mitchell", role: "Head of Education", emoji: "👩‍🏫" },
              { name: "David Park", role: "Lead Developer", emoji: "👨‍💻" },
              { name: "Lisa Chen", role: "Community Manager", emoji: "👩‍💼" }
            ].map((member, i) => (
              <Card key={i} className="card-hover text-center border-2 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardHeader>
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-base">{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl -z-10 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6 animate-slide-up">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            Be part of the platform that's transforming education and employment for millions
          </p>
          <div className="flex gap-4 justify-center animate-bounce-in">
            <Button size="lg" className="shadow-xl" asChild>
              <Link href="/register">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}