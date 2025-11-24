"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground mt-2">
          {user?.role === "client" && "View and manage your service reviews"}
          {user?.role === "cleaner" && "View reviews from your clients"}
          {(user?.role === "global_admin" || user?.role === "company_admin") && "Manage platform reviews"}
        </p>
      </div>

      <EmptyState
        icon={Star}
        title="No reviews yet"
        description={
          user?.role === "client"
            ? "Reviews from your completed bookings will appear here. Book a service to get started!"
            : user?.role === "cleaner"
            ? "Reviews from your completed jobs will appear here. Complete jobs to start receiving reviews!"
            : "Platform reviews will appear here once customers start rating services."
        }
        actionLabel={user?.role === "client" ? "Book a Service" : undefined}
        actionHref={user?.role === "client" ? "/book" : undefined}
      />
    </div>
  );
}
