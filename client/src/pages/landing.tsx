import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star, Sparkles, Zap, Trophy, TrendingUp, Globe, Shield, BookOpen, Video, MessageSquare } from "lucide-react";
import { AnimatedDemoVideo } from "@/components/ui/animated-demo-video";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Hero Section - Brand Colors */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <Badge className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 text-sm font-medium shadow-2xl hover:bg-white/30 transition-all">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Next-Gen Learning Platform
              </Badge>
            </div>

            <h1 className="text-responsive-xl font-extrabold tracking-tight">
              <span className="block text-white drop-shadow-2xl">Learn. Earn.</span>
              <span className="block brand-gradient-text drop-shadow-2xl">
                Transform.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Join <span className="font-bold text-yellow-300">10,000+</span> students, tutors, and freelancers building extraordinary careers
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 shadow-2xl text-lg px-8 h-14 rounded-full font-semibold group" asChild>
                <Link href="/register">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-md shadow-2xl text-lg px-8 h-14 rounded-full font-semibold" asChild>
                <Link href="/courses">
                  Explore Courses
                </Link>
              </Button>
            </div>

            {/* Stats with glassmorphism */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
              {[
                { icon: Users, value: "10K+", label: "Active Users" },
                { icon: GraduationCap, value: "500+", label: "Courses" },
                { icon: Trophy, value: "95%", label: "Success Rate" },
                { icon: Star, value: "4.9", label: "Rating" }
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:-translate-y-2 shadow-2xl">
                  <stat.icon className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="glass rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform">
            <Zap className="w-8 h-8 text-yellow-300" />
          </div>
        </div>
        <div className="absolute top-20 right-20 hidden lg:block">
          <div className="glass rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform">
            <Globe className="w-8 h-8 text-cyan-300" />
          </div>
        </div>
      </section>

      {/* Platform Demo Video Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Platform Overview
            </Badge>
            <h2 className="text-responsive-lg font-bold mb-6">
              <span className="brand-gradient-text">See YEESP in Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how our platform empowers thousands to learn, earn, and grow
            </p>
          </div>

          <AnimatedDemoVideo />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-responsive-lg font-bold mb-6">
              <span className="brand-gradient-text">Everything You Need</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete ecosystem for learning, teaching, and earning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: GraduationCap, 
                title: "Premium Courses", 
                desc: "Access 500+ expert-led courses across all skill levels",
                gradient: "from-violet-500 to-purple-500",
                color: "text-violet-600"
              },
              { 
                icon: Users, 
                title: "Live Tutoring", 
                desc: "1-on-1 sessions with verified tutors via Zoom & Dyte",
                gradient: "from-blue-500 to-cyan-500",
                color: "text-blue-600"
              },
              { 
                icon: Briefcase, 
                title: "Freelance Hub", 
                desc: "Find projects, submit bids, and build your career",
                gradient: "from-pink-500 to-rose-500",
                color: "text-pink-600"
              },
              { 
                icon: Award, 
                title: "Certifications", 
                desc: "Earn verified certificates and showcase achievements",
                gradient: "from-green-500 to-emerald-500",
                color: "text-green-600"
              },
            ].map((feature, i) => (
              <Card key={i} className="card-hover relative group overflow-hidden border-2 hover:border-transparent transition-all duration-300 hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-8 space-y-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold group-hover:text-white transition-colors ${feature.color}`}>{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors">{feature.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-violet-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-responsive-lg font-bold mb-6">Why Choose YEESP?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The most comprehensive platform for your growth journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: Shield, title: "Secure Payments", desc: "Escrow-based wallet with Stripe integration" },
                { icon: Video, title: "Live Sessions", desc: "Dual video support with Zoom & Dyte SDK" },
                { icon: TrendingUp, title: "Career Growth", desc: "Track progress with detailed analytics" },
                { icon: Globe, title: "Global Community", desc: "Connect with learners worldwide" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start glass rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold mb-6">All Features Included</h3>
              <div className="space-y-3">
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
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-responsive-lg font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of successful students, tutors, and freelancers today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 shadow-2xl text-lg px-10 h-16 rounded-full font-bold" asChild>
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-md text-lg px-10 h-16 rounded-full font-bold" asChild>
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
              <p className="text-gray-400">Youth Education and Employment Support Platform</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses" className="hover:text-white transition">Courses</Link></li>
                <li><Link href="/tutors" className="hover:text-white transition">Tutors</Link></li>
                <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              Developed by <span className="font-bold text-white">Fasih ur Rehman</span> | © 2024 YEESP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
