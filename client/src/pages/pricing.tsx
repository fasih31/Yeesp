
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Self-Study",
      price: "29",
      description: "Perfect for independent learners",
      features: [
        "Access to all course materials",
        "Downloadable resources",
        "Community forum access",
        "Progress tracking",
        "Certificate upon completion",
        "Lifetime course access"
      ],
      cta: "Start Learning",
      popular: false
    },
    {
      name: "Hybrid",
      price: "79",
      description: "Best value for most students",
      features: [
        "Everything in Self-Study",
        "2 live tutoring sessions/month",
        "Assignment review & feedback",
        "Q&A with instructors",
        "Priority support",
        "Career guidance session"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Full Tutoring",
      price: "149",
      description: "Complete personalized experience",
      features: [
        "Everything in Hybrid",
        "Unlimited tutoring sessions",
        "1-on-1 mentorship",
        "Custom learning path",
        "Project reviews",
        "Interview preparation",
        "Job placement assistance"
      ],
      cta: "Go Premium",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 mt-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the learning experience that fits your goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className={`hover-elevate flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                {plan.popular && (
                  <Badge className="w-fit mb-4">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-accent/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Freelancing Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>For Freelancers</CardTitle>
                <CardDescription>Start earning from your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>10% platform commission</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Secure payment escrow</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Profile verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Dispute resolution</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/register">Start Freelancing</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Recruiters</CardTitle>
                <CardDescription>Find the perfect talent</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Post unlimited projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Access verified talent pool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Milestone-based payments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>On-demand training options</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/register">Hire Talent</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
