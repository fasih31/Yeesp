import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star, BookOpen, Video, Shield, Zap, TrendingUp, Globe } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Dark Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center z-10">
          <Badge className="mb-8 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 px-6 py-2.5 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2 inline" />
            Next-Generation Learning Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Learn Skills.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Earn Income.
            </span><br />
            Transform Your Future.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join <span className="text-cyan-400 font-semibold">10,000+</span> students, tutors, and freelancers building successful careers through education and opportunity
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-lg px-10 h-16 rounded-full font-semibold shadow-2xl shadow-cyan-500/30 border-0" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-600 bg-transparent text-white hover:bg-white/10 text-lg px-10 h-16 rounded-full font-semibold" asChild>
              <Link href="/courses">
                Explore Courses
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, value: "10K+", label: "Active Users" },
              { icon: BookOpen, value: "500+", label: "Courses" },
              { icon: Briefcase, value: "1,200+", label: "Projects" },
              { icon: Star, value: "4.9/5", label: "Rating" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <stat.icon className="w-10 h-10 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Light Background */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-100 text-cyan-700 border-0">
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to <span className="text-cyan-600">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete ecosystem for learning, teaching, and earning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: GraduationCap, 
                title: "Premium Courses", 
                desc: "Access 500+ expert-led courses across all skill levels with lifetime access",
                gradient: "from-cyan-500 to-blue-500"
              },
              { 
                icon: Video, 
                title: "Live Tutoring", 
                desc: "1-on-1 sessions with verified tutors via Zoom and Dyte video conferencing",
                gradient: "from-blue-500 to-purple-500"
              },
              { 
                icon: Briefcase, 
                title: "Freelance Hub", 
                desc: "Find opportunities, submit bids, and build your professional career",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                icon: Award, 
                title: "Certifications", 
                desc: "Earn verified certificates with QR codes to showcase your achievements",
                gradient: "from-pink-500 to-red-500"
              },
            ].map((feature, i) => (
              <Card key={i} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
                <div className="p-8 space-y-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
                <div className={`h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark Card on Light Background */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-cyan-100 text-cyan-700 border-0">
                Why Choose YEESP?
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                The Most Trusted Platform for <span className="text-cyan-600">Youth Empowerment</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Join thousands who are transforming their careers through our comprehensive platform
              </p>
              
              <div className="space-y-5">
                {[
                  { icon: Shield, title: "Secure Payments", desc: "Escrow-based wallet with Stripe integration" },
                  { icon: Video, title: "Live Sessions", desc: "Dual video support with Zoom & Dyte SDK" },
                  { icon: TrendingUp, title: "Career Growth", desc: "Track progress with detailed analytics" },
                  { icon: Globe, title: "Global Community", desc: "Connect with learners worldwide" },
                  { icon: Zap, title: "Fast & Reliable", desc: "99.9% uptime with instant notifications" },
                  { icon: Award, title: "Quality Assured", desc: "All tutors and courses are verified" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-8">All Features Included</h3>
              <div className="space-y-4">
                {[
                  "Unlimited course access",
                  "Live video conferencing (Zoom & Dyte)",
                  "Project bidding & contracts",
                  "AI-powered recommendations",
                  "Certificate generation with QR codes",
                  "24/7 priority support",
                  "Real-time notifications",
                  "Escrow payment protection"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-gray-900 font-bold" />
                    </div>
                    <span className="text-lg text-gray-100">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-10 z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to Transform<br />Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Future</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful students, tutors, and freelancers who are already building their dream careers
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-lg px-12 h-16 rounded-full font-bold shadow-2xl shadow-cyan-500/30" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-600 bg-transparent text-white hover:bg-white/10 text-lg px-12 h-16 rounded-full font-bold" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer className="bg-gray-950 text-white py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">YEESP</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Youth Education and Employment Support Platform - Empowering the next generation</p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/courses" className="text-gray-400 hover:text-cyan-400 transition-colors">Courses</Link></li>
                <li><Link href="/tutors" className="text-gray-400 hover:text-cyan-400 transition-colors">Tutors</Link></li>
                <li><Link href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/help" className="text-gray-400 hover:text-cyan-400 transition-colors">Help Center</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 YEESP. All rights reserved. | Developed with ❤️ by <span className="text-cyan-400 font-semibold">Fasih ur Rehman</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
