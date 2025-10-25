import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";

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
    <Section spacing="lg" background="gradient" className="min-h-screen flex items-center">
      <PageContainer maxWidth="sm">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="flex justify-center mb-2">
              <img src="/icon.png" alt="YEESP" className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in to your YEESP account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Test Credentials Note */}
        <Card className="mt-4 bg-muted/50 border-dashed">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center mb-3 font-medium">
              Test Credentials:
            </p>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Student:</div>
                <div className="font-mono">student@test.com</div>
                <div className="text-muted-foreground">Tutor:</div>
                <div className="font-mono">tutor@test.com</div>
                <div className="text-muted-foreground">Password:</div>
                <div className="font-mono">password123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </Section>
  );
}
