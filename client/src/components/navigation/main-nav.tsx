import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function MainNav() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/tutors", label: "Tutors" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img src="/icon.png" alt="YEESP" className="h-8 w-8 transition-transform group-hover:scale-110" />
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">YEESP</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                className={`text-sm font-medium transition-all ${location === link.href ? "text-cyan-400 bg-cyan-500/10" : "text-gray-300 hover:text-cyan-400 hover:bg-white/5"}`}
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/notifications" className="cursor-pointer">
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'student' && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/student" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'tutor' && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/tutor" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'freelancer' && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/freelancer" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'recruiter' && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/recruiter" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin" className="cursor-pointer">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href={`/${user.role}/profile-settings`} className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-gray-300 hover:text-cyan-400 hover:bg-white/5">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {!user && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login" className="cursor-pointer">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup" className="cursor-pointer">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
