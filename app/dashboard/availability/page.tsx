"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function AvailabilityPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="text-muted-foreground mt-2">
          Set your working hours and availability for bookings
        </p>
      </div>

      <EmptyState
        icon={Calendar}
        title="No availability set"
        description="Configure your working hours and days to start receiving job bookings. Set up recurring availability patterns or block off specific dates."
        actionLabel="Set Availability"
        actionHref="#"
      />
    </div>
  );
}
