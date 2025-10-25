
import { Link, useLocation } from "wouter";
import { Home, BookOpen, Video, Users, DollarSign, MessageSquare, Settings, ClipboardList } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const tutorMenuItems = [
  { href: "/dashboard/tutor", icon: Home, label: "Dashboard" },
  { href: "/tutor/my-courses", icon: BookOpen, label: "My Courses" },
  { href: "/tutor/course/create", icon: BookOpen, label: "Create Course" },
  { href: "/tutor/sessions", icon: Video, label: "Sessions" },
  { href: "/tutor/students", icon: Users, label: "My Students" },
  { href: "/tutor/assignments", icon: ClipboardList, label: "Assignments" },
  { href: "/tutor/earnings", icon: DollarSign, label: "Earnings" },
  { href: "/tutor/messages", icon: MessageSquare, label: "Messages" },
  { href: "/tutor/profile-settings", icon: Settings, label: "Settings" },
];

export function TutorSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {tutorMenuItems.map((item) => (
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
