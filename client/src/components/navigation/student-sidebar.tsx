
import { Link, useLocation } from "wouter";
import { Home, BookOpen, Calendar, Award, Briefcase, DollarSign, MessageSquare, Settings, HelpCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const studentMenuItems = [
  { href: "/dashboard/student", icon: Home, label: "Dashboard" },
  { href: "/student/my-courses", icon: BookOpen, label: "My Courses" },
  { href: "/student/assignments", icon: BookOpen, label: "Assignments" },
  { href: "/student/book-tutor", icon: Calendar, label: "Book Tutor" },
  { href: "/student/bookings", icon: Calendar, label: "My Bookings" },
  { href: "/student/certificates", icon: Award, label: "Certificates" },
  { href: "/student/freelance-onboarding", icon: Briefcase, label: "Become Freelancer" },
  { href: "/student/my-freelance-projects", icon: Briefcase, label: "My Projects" },
  { href: "/student/payments", icon: DollarSign, label: "Payments" },
  { href: "/student/messages", icon: MessageSquare, label: "Messages" },
  { href: "/student/profile-settings", icon: Settings, label: "Settings" },
  { href: "/student/support", icon: HelpCircle, label: "Support" },
];

export function StudentSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={location === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
