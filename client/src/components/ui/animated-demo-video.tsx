import { Play, Sparkles, Users, BookOpen, Briefcase, Award } from "lucide-react";
import { Card } from "./card";

export function AnimatedDemoVideo() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Video Container with Glass Effect */}
      <Card className="relative overflow-hidden border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-pink-500/10 backdrop-blur-xl">
        <div className="aspect-video relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
          </div>

          {/* Floating Feature Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Center Play Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <button className="group relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all">
                    <Play className="h-8 w-8 text-violet-600 ml-1" fill="currentColor" />
                  </div>
                </button>
              </div>

              {/* Animated Feature Badges */}
              <div className="absolute top-8 left-8 animate-float">
                <div className="glass rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3 text-white">
                    <BookOpen className="h-6 w-6" />
                    <div>
                      <div className="font-bold">500+ Courses</div>
                      <div className="text-sm opacity-90">Expert-Led</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 animate-float animation-delay-1000">
                <div className="glass rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3 text-white">
                    <Users className="h-6 w-6" />
                    <div>
                      <div className="font-bold">10K+ Students</div>
                      <div className="text-sm opacity-90">Worldwide</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 animate-float animation-delay-2000">
                <div className="glass rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3 text-white">
                    <Briefcase className="h-6 w-6" />
                    <div>
                      <div className="font-bold">1,200+ Projects</div>
                      <div className="text-sm opacity-90">Live Now</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 animate-float animation-delay-3000">
                <div className="glass rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3 text-white">
                    <Award className="h-6 w-6" />
                    <div>
                      <div className="font-bold">4.9/5 Rating</div>
                      <div className="text-sm opacity-90">User Reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sparkles Effect */}
              <div className="absolute top-20 left-1/2 animate-pulse">
                <Sparkles className="h-8 w-8 text-yellow-300" />
              </div>
            </div>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4 glass-dark rounded-full px-4 py-2 text-white text-sm font-medium">
            <Sparkles className="inline h-4 w-4 mr-2" />
            2 min platform overview
          </div>
        </div>
      </Card>

      {/* Decorative Glow Effects */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl"></div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}
