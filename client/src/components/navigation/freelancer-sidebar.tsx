
import { Link, useLocation } from "wouter";
import { Home, Search, FileText, Briefcase, DollarSign, FolderOpen, Settings, MessageSquare } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const freelancerMenuItems = [
  { href: "/dashboard/freelancer", icon: Home, label: "Dashboard" },
  { href: "/freelancer/browse-jobs", icon: Search, label: "Browse Jobs" },
  { href: "/freelancer/my-proposals", icon: FileText, label: "My Proposals" },
  { href: "/freelancer/active-projects", icon: Briefcase, label: "Active Projects" },
  { href: "/freelancer/earnings", icon: DollarSign, label: "Earnings" },
  { href: "/freelancer/portfolio", icon: FolderOpen, label: "Portfolio" },
  { href: "/freelancer/messages", icon: MessageSquare, label: "Messages" },
  { href: "/freelancer/profile-settings", icon: Settings, label: "Settings" },
];

export function FreelancerSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {freelancerMenuItems.map((item) => (
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
