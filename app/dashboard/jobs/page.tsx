"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

export default function JobsPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (user?.role !== "cleaner") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">This page is only accessible to cleaners.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your cleaning jobs
        </p>
      </div>

      <EmptyState
        icon={Briefcase}
        title="No jobs yet"
        description="Your cleaning jobs will appear here once customers book your services. Make sure your profile is complete and your availability is set."
        actionLabel="Complete Profile"
        actionHref="/dashboard/profile"
        secondaryActionLabel="Set Availability"
        secondaryActionHref="/dashboard/availability"
      />
    </div>
  );
}
