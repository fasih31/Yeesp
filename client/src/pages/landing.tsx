import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Briefcase, Award, ArrowRight, Check, Star, Sparkles, Zap, Trophy, TrendingUp, Globe, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Ultra Modern with Animated Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Glassmorphic grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="space-y-8">
            {/* Badge with glow effect */}
            <div className="flex justify-center">
              <Badge className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 text-sm font-medium shadow-2xl hover:bg-white/30 transition-all">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Next-Gen Learning Platform
              </Badge>
            </div>

            {/* Main Heading with gradient text */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="block text-white drop-shadow-2xl">Learn. Earn.</span>
              <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                Transform.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Join <span className="font-bold text-yellow-300">10,000+</span> students, tutors, and freelancers building extraordinary careers
            </p>

            {/* CTA Buttons with modern styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-2xl text-lg px-8 h-14 rounded-full font-semibold group" asChild>
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
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:-translate-y-2 shadow-2xl">
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
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform">
            <Zap className="w-8 h-8 text-yellow-300" />
          </div>
        </div>
        <div className="absolute top-20 right-20 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform">
            <Globe className="w-8 h-8 text-cyan-300" />
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Platform Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Everything You Need
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
                desc: "Access 500+ expert-led courses",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                icon: Users, 
                title: "Live Tutoring", 
                desc: "1-on-1 sessions with top tutors",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: Briefcase, 
                title: "Freelance Hub", 
                desc: "Find projects and build your career",
                gradient: "from-orange-500 to-red-500"
              },
              { 
                icon: Award, 
                title: "Certifications", 
                desc: "Earn verified certificates",
                gradient: "from-green-500 to-emerald-500"
              },
            ].map((feature, i) => (
              <Card key={i} className="relative group overflow-hidden border-2 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-8 space-y-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors">{feature.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Why Choose YEESP?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The most comprehensive platform for your growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: Shield, title: "Secure Payments", desc: "Escrow-based wallet system" },
                { icon: Zap, title: "Instant Access", desc: "Start learning immediately" },
                { icon: TrendingUp, title: "Career Growth", desc: "Track your progress" },
                { icon: Globe, title: "Global Community", desc: "Connect worldwide" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold mb-6">All Features Included</h3>
              <div className="space-y-3">
                {[
                  "Unlimited course access",
                  "Live video conferencing (Zoom & Dyte)",
                  "Project bidding & contracts",
                  "AI-powered recommendations",
                  "Certificate generation",
                  "24/7 priority support",
                  "Mobile app access",
                  "Lifetime updates"
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
      <section className="py-24 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of successful students, tutors, and freelancers today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-2xl text-lg px-10 h-16 rounded-full font-bold" asChild>
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
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            Developed by <span className="font-bold text-white">Fasih ur Rehman</span> | YEESP - Youth Education and Employment Support Platform
          </p>
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
