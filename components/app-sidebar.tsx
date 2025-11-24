"use client";

import * as React from "react";
import {
  Calendar,
  Home,
  Sparkles,
  Search,
  MapPin,
  Briefcase,
  CreditCard,
  Star,
  Users,
  Settings,
  BarChart3,
  ClipboardList,
  FileText,
} from "lucide-react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useCurrentUser } from "@/components/providers/user-provider";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { SIDEBAR_BADGE_COUNTS } from "@/lib/graphql/queries/dashboard-queries";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentUser();
  const pathname = usePathname();

  // Fetch badge counts
  const { data: badgeData } = useQuery(SIDEBAR_BADGE_COUNTS, {
    skip: !user,
    pollInterval: 30000, // Poll every 30 seconds for updates
  });

  const pendingApplicationsCount = badgeData?.pendingApplications?.length || 0;

  // Navigation items based on user role
  const getNavItems = () => {
    const role = user?.role;

    // Customer/Client navigation
    if (role === "client" || !role) {
      return [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Book a Service", url: "/book", icon: Sparkles },
        { title: "My Bookings", url: "/dashboard/bookings", icon: ClipboardList },
        { title: "Find Cleaners", url: "/dashboard/cleaners", icon: Search },
        { title: "My Addresses", url: "/dashboard/addresses", icon: MapPin },
        { title: "Reviews", url: "/dashboard/reviews", icon: Star },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ];
    }

    // Cleaner navigation
    if (role === "cleaner") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "My Jobs", url: "/dashboard/jobs", icon: Briefcase },
        { title: "My Profile", url: "/dashboard/profile", icon: Users },
        { title: "Availability", url: "/dashboard/availability", icon: Calendar },
        { title: "Earnings", url: "/dashboard/earnings", icon: CreditCard },
        { title: "Reviews", url: "/dashboard/reviews", icon: Star },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ];
    }

    // Admin navigation
    if (role === "global_admin" || role === "company_admin") {
      return [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Applications", url: "/dashboard/applications", icon: FileText, badge: pendingApplicationsCount },
        { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
        { title: "All Bookings", url: "/dashboard/bookings", icon: ClipboardList },
        { title: "Cleaners", url: "/dashboard/cleaners", icon: Users },
        { title: "Customers", url: "/dashboard/customers", icon: Users },
        { title: "Services", url: "/dashboard/services", icon: Sparkles },
        { title: "Payouts", url: "/dashboard/payouts", icon: CreditCard },
        { title: "Reviews", url: "/dashboard/reviews", icon: Star },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CleanBuddy</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.role === "client" && "Customer Portal"}
                    {user?.role === "cleaner" && "Cleaner Portal"}
                    {(user?.role === "global_admin" || user?.role === "company_admin") && "Admin Portal"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge
                        variant="destructive"
                        className="ml-auto h-5 min-w-5 px-1 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.displayName || "User",
              email: user.email || "",
              avatar: undefined,
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
