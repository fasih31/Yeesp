import { Link, useLocation } from "wouter";
import { Home, Search, FileText, Briefcase, DollarSign, FolderOpen, Settings, MessageSquare } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "@/components/ui/sidebar";
import { NotificationDropdown } from "@/components/NotificationDropdown";

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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Briefcase className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">YEESP</span>
                  <span className="text-xs">Freelancer</span>
                </div>
              </a>
            </SidebarMenuButton>
            <div className="ml-auto">
              <NotificationDropdown userId="freelancer-id" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
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