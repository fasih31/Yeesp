import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      setTimeout(() => {
        setLocation('/dashboard');
      }, 100);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#E8F0FF] via-[#F0F7FF] to-[#E8F0FF] dark:from-[#1A2238] dark:via-[#0f1724] dark:to-[#1A2238]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00AEEF]/30 dark:bg-[#3A86FF]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00C896]/30 dark:bg-[#5EF38C]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-[#2B3A67]/20 dark:bg-[#3A86FF]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glassmorphic grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B3A6712_1px,transparent_1px),linear-gradient(to_bottom,#2B3A6712_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative w-full max-w-md">
        {/* Main Login Card - Glassmorphism */}
        <Card className="border-2 border-primary/20 bg-card/80 dark:bg-white/10 backdrop-blur-2xl shadow-2xl">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-foreground dark:text-white">
              Welcome Back
            </CardTitle>
            <p className="text-muted-foreground dark:text-white/80 text-lg">
              Sign in to your YEESP account
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground dark:text-white font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  disabled={isLoading}
                  className="h-12 bg-background/50 dark:bg-white/20 border-primary/30 dark:border-white/30 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 backdrop-blur-sm focus:bg-background dark:focus:bg-white/30 transition-all"
                />
                {errors.email && (
                  <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground dark:text-white font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-secondary hover:text-secondary/80 font-medium hover:underline">
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  disabled={isLoading}
                  className="h-12 bg-background/50 dark:bg-white/20 border-primary/30 dark:border-white/30 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 backdrop-blur-sm focus:bg-background dark:focus:bg-white/30 transition-all"
                />
                {errors.password && (
                  <p className="text-sm text-destructive font-medium">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-bold text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Sign In
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <p className="text-center text-muted-foreground dark:text-white/80">
                Don't have an account?{" "}
                <Link href="/register" className="text-secondary hover:text-secondary/80 font-bold hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Test Credentials Card */}
        <Card className="mt-6 border-2 border-primary/20 bg-card/60 dark:bg-white/5 backdrop-blur-xl">
          <CardContent className="pt-6">
            <p className="text-sm text-foreground dark:text-white/90 text-center mb-4 font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              Test Credentials
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-primary/10 dark:bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-primary/20 dark:border-white/20">
                <div className="text-muted-foreground dark:text-white/70 mb-1">Student</div>
                <div className="font-mono text-secondary font-bold">student@test.com</div>
              </div>
              <div className="bg-primary/10 dark:bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-primary/20 dark:border-white/20">
                <div className="text-muted-foreground dark:text-white/70 mb-1">Tutor</div>
                <div className="font-mono text-accent font-bold">tutor@test.com</div>
              </div>
              <div className="col-span-2 bg-primary/10 dark:bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-primary/20 dark:border-white/20 text-center">
                <div className="text-muted-foreground dark:text-white/70 mb-1">Password</div>
                <div className="font-mono text-primary font-bold">password123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
