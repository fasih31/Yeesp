import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, Settings, Sun, Moon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/components/theme-provider";

export function MainNav() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
    <header className="border-b border-gray-800 bg-[#1A2238]/95 backdrop-blur-lg sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img src="/icon.png" alt="YEESP" className="h-8 w-8 transition-transform group-hover:scale-110" />
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#5EF38C]">YEESP</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                className={`text-sm font-medium transition-all ${location === link.href ? "text-[#3A86FF] bg-[#3A86FF]/10" : "text-gray-300 hover:text-[#3A86FF] hover:bg-white/5"}`}
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="ml-2 text-gray-300 hover:text-[#3A86FF] hover:bg-white/5"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-cyan-400">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#1A2238] border-gray-800">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                    <Link href="/notifications" className="cursor-pointer">
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'student' && (
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/dashboard/student" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'tutor' && (
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/dashboard/tutor" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'freelancer' && (
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/dashboard/freelancer" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'recruiter' && (
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/dashboard/recruiter" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/dashboard/admin" className="cursor-pointer">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                    <Link href={`/${user.role}/profile-settings`} className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-500/10">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-gray-300 hover:text-[#3A86FF] hover:bg-white/5">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-[#3A86FF] to-[#5EF38C] hover:from-[#2B6FDD] hover:to-[#4AD478] text-white">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-cyan-400">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1A2238] border-gray-800">
                {!user && (
                  <>
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/auth/login" className="cursor-pointer">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                      <Link href="/auth/signup" className="cursor-pointer">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                  </>
                )}
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer text-gray-300 focus:text-[#3A86FF] focus:bg-[#3A86FF]/10">
                  {theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
