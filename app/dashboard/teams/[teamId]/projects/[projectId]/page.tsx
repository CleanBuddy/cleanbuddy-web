"use client";

import { useTeam } from "@/components/providers/team-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function ProjectPage() {
  const { user, selectedProject, selectedTeam } = useTeam();

  if (user.loading) {
    return (
      <>
        <DashboardHeader />
        <div className="flex-1 p-4 md:p-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </>
    );
  }

  if (!selectedProject) {
    return (
      <>
        <DashboardHeader />
        <div className="flex-1 p-4 md:p-8">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{selectedProject.displayName}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Team: {selectedTeam?.displayName}
          </p>
        </div>

        <div className="grid gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Information about this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm md:text-base">
                <span className="font-semibold">Project Name:</span> {selectedProject.displayName}
              </div>
              <div className="text-sm md:text-base break-all">
                <span className="font-semibold">Project ID:</span> {selectedProject.id}
              </div>
              <div className="text-sm md:text-base">
                <span className="font-semibold">Team:</span> {selectedTeam?.displayName}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Next steps for your project</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-muted-foreground">
                This is a placeholder project page. Add your custom features and content here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
