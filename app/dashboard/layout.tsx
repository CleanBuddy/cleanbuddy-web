"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useTeam } from "@/components/providers/team-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useTeam();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!user.loading && !user.data) {
      router.push("/auth");
    }
  }, [user.loading, user.data, router]);

  // Show loading state while checking authentication
  if (user.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user.data) {
    return null;
  }

  // Check if user has no teams or no projects (empty state / onboarding)
  const hasNoTeams = user.data.teams.length === 0;
  const hasNoProjects = user.data.teams.length > 0 && user.data.teams.every(team => team.projects.length === 0);
  const shouldHideSidebar = hasNoTeams || hasNoProjects;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {!shouldHideSidebar && <AppSidebar />}
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
