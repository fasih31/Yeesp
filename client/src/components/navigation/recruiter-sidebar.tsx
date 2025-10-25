
import { Link, useLocation } from "wouter";
import { Home, Plus, Briefcase, Users, FileText, DollarSign, Settings, MessageSquare } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const recruiterMenuItems = [
  { href: "/dashboard/recruiter", icon: Home, label: "Dashboard" },
  { href: "/recruiter/post-project", icon: Plus, label: "Post Project" },
  { href: "/recruiter/my-projects", icon: Briefcase, label: "My Projects" },
  { href: "/recruiter/proposals", icon: FileText, label: "Proposals" },
  { href: "/recruiter/hire-talent", icon: Users, label: "Hire Talent" },
  { href: "/recruiter/contracts", icon: FileText, label: "Contracts" },
  { href: "/student/payments", icon: DollarSign, label: "Payments" },
  { href: "/recruiter/messages", icon: MessageSquare, label: "Messages" },
  { href: "/recruiter/profile-settings", icon: Settings, label: "Settings" },
];

export function RecruiterSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {recruiterMenuItems.map((item) => (
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
