
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, TrendingUp, Gift } from "lucide-react";

export default function Affiliate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge className="mb-4" variant="secondary">Earn Money</Badge>
          <h1 className="text-5xl font-bold mb-4">Affiliate Program</h1>
          <p className="text-xl text-muted-foreground">
            Earn up to 30% commission by referring students to our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>30% Commission</CardTitle>
              <CardDescription>On every sale you refer</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>90-Day Cookie</CardTitle>
              <CardDescription>Long tracking window</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Recurring Income</CardTitle>
              <CardDescription>Monthly recurring commissions</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-center">Join the Program</CardTitle>
            <CardDescription className="text-center">Start earning today</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Email Address" />
              <Input placeholder="Website or Social Media URL" />
              <Button className="w-full" size="lg">Apply Now</Button>
            </form>
          </CardContent>
        </Card>

        <div className="bg-primary/5 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Gift className="h-6 w-6" /> How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-1">Sign Up</h3>
                <p className="text-sm text-muted-foreground">Apply and get approved instantly</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-1">Share Your Link</h3>
                <p className="text-sm text-muted-foreground">Promote courses using your unique affiliate link</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-1">Earn Commission</h3>
                <p className="text-sm text-muted-foreground">Get paid for every successful referral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
