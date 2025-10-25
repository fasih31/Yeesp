import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star, BookOpen, Video, Shield, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean & Elegant */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-violet-600 to-violet-800 overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge className="mb-6 bg-white/10 backdrop-blur-md border-white/20 text-white px-6 py-2">
            Next-Generation Learning Platform
          </Badge>

          <h1 className="text-responsive-xl font-bold text-white mb-6 leading-tight">
            Learn Skills. Earn Income.<br />
            <span className="text-violet-200">Transform Your Future.</span>
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join 10,000+ students, tutors, and freelancers building successful careers through education and opportunity
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-50 text-lg px-8 h-14 rounded-full font-semibold shadow-xl" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full font-semibold" asChild>
              <Link href="/courses">
                Explore Courses
              </Link>
            </Button>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, value: "10K+", label: "Active Users" },
              { icon: BookOpen, value: "500+", label: "Courses" },
              { icon: Briefcase, value: "1,200+", label: "Projects" },
              { icon: Star, value: "4.9/5", label: "Rating" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <stat.icon className="w-8 h-8 text-white mx-auto mb-2 opacity-90" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete platform for learning, teaching, and earning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: GraduationCap, 
                title: "Premium Courses", 
                desc: "Access 500+ expert-led courses across all skill levels"
              },
              { 
                icon: Video, 
                title: "Live Tutoring", 
                desc: "1-on-1 sessions with verified tutors via video conferencing"
              },
              { 
                icon: Briefcase, 
                title: "Freelance Projects", 
                desc: "Find opportunities and build your professional career"
              },
              { 
                icon: Award, 
                title: "Certifications", 
                desc: "Earn verified certificates to showcase your achievements"
              },
            ].map((feature, i) => (
              <Card key={i} className="p-8 hover:shadow-xl transition-all duration-300 border-violet-100 hover:border-violet-300">
                <div className="h-14 w-14 rounded-xl bg-violet-100 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose YEESP?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                The most trusted platform for youth education and employment
              </p>
              
              <div className="space-y-4">
                {[
                  "Secure escrow-based payment system",
                  "Live video conferencing (Zoom & Dyte)",
                  "AI-powered course recommendations",
                  "Verifiable certificates with QR codes",
                  "Real-time notifications & messaging",
                  "24/7 priority support",
                  "Project bidding & contract management",
                  "Comprehensive admin controls"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-violet-600 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Secure Platform</div>
                    <div className="text-sm text-gray-600">Bank-level encryption</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-violet-600 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fast Payments</div>
                    <div className="text-sm text-gray-600">Instant withdrawals</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-violet-600 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Global Community</div>
                    <div className="text-sm text-gray-600">Connect worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-violet-600 to-violet-800">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of successful students, tutors, and freelancers today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-50 text-lg px-10 h-14 rounded-full font-bold shadow-xl" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 h-14 rounded-full font-bold" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 brand-gradient-text">YEESP</h3>
              <p className="text-gray-400 text-sm">Youth Education and Employment Support Platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/courses" className="hover:text-white transition">Courses</Link></li>
                <li><Link href="/tutors" className="hover:text-white transition">Tutors</Link></li>
                <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 YEESP. All rights reserved. | Developed by <span className="text-violet-400 font-semibold">Fasih ur Rehman</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
