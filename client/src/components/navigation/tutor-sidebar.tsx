import { Link, useLocation } from "wouter";
import { Home, BookOpen, Video, Users, DollarSign, MessageSquare, Settings, ClipboardList } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "@/components/ui/sidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";

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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/icon.png" alt="YEESP" className="size-8" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">YEESP</span>
                  <span className="text-xs">Tutor Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
            <div className="ml-auto">
              <NotificationDropdown userId="tutor-id" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
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