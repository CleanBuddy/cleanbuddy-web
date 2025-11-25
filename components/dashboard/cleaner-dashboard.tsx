"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, CreditCard, Star, Users } from "lucide-react";
import { DASHBOARD_STATS_CLEANER } from "@/lib/graphql/queries/dashboard-queries";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingItemCard } from "@/components/dashboard/upcoming-item-card";

interface CleanerDashboardProps {
  user: {
    id: string;
    displayName?: string | null;
    email: string;
    role: string;
  };
}

export function CleanerDashboard({ user }: CleanerDashboardProps) {
  const router = useRouter();
  const hasRedirected = useRef(false);
  const { data, loading: dataLoading, error } = useQuery(DASHBOARD_STATS_CLEANER, {
    skip: !user,
    errorPolicy: "all",
  });

  const jobs = data?.myJobs?.edges?.map((edge: any) => edge.node) || [];
  const profile = data?.myCleanerProfile;
  const upcomingJobs = data?.upcomingBookings || [];

  // Redirect to profile setup if cleaner doesn't have a profile yet
  // Use ref to prevent multiple redirects
  useEffect(() => {
    if (!dataLoading && !profile && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace("/cleaner-profile-setup");
    }
  }, [dataLoading, profile, router]);

  // Show loading while checking for profile
  if (dataLoading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // If no profile, show loading skeleton (redirect will happen)
  if (!profile) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // Calculate this month's earnings
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyEarnings = jobs
    .filter((j: any) =>
      j.status === "COMPLETED" &&
      new Date(j.scheduledDate) >= startOfMonth
    )
    .reduce((sum: number, j: any) => sum + (j.cleanerPayout || 0), 0);

  // Count active jobs (confirmed or in progress, scheduled for this week or later)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const activeJobs = jobs.filter((j: any) =>
    (j.status === "CONFIRMED" || j.status === "IN_PROGRESS") &&
    new Date(j.scheduledDate) >= startOfWeek &&
    new Date(j.scheduledDate) < endOfWeek
  ).length;

  const tierLabel = profile?.tier ? profile.tier.charAt(0) + profile.tier.slice(1).toLowerCase() : "New";
  const ratingValue = profile?.averageRating
    ? profile.averageRating.toFixed(1)
    : "—";

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(" ")[0]}!</h1>
        <p className="text-muted-foreground mt-2">
          Manage your jobs, availability, and earnings
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Jobs"
          value={activeJobs}
          icon={Calendar}
          description="Jobs this week"
        />
        <StatCard
          title="Earnings"
          value={`${(monthlyEarnings / 100).toFixed(2)} RON`}
          icon={CreditCard}
          description="This month"
        />
        <StatCard
          title="Rating"
          value={ratingValue}
          icon={Star}
          description={profile?.totalReviews ? `${profile.totalReviews} reviews` : "No reviews yet"}
        />
        <StatCard
          title="Profile"
          value={tierLabel}
          icon={Users}
          description="Cleaner tier"
        />
      </div>

      {/* Upcoming Jobs */}
      {upcomingJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
            <CardDescription>Your next scheduled cleaning jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingJobs.map((job: any) => (
                <UpcomingItemCard
                  key={job.id}
                  id={job.id}
                  date={job.scheduledDate}
                  time={job.scheduledTime}
                  duration={job.duration}
                  serviceType={job.serviceType}
                  status={job.status}
                  personName={job.customer?.displayName || "Customer"}
                  personRole="customer"
                  address={job.address}
                  amount={job.cleanerPayout}
                  linkTo="/dashboard/jobs"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/dashboard/profile">
              <Users className="mr-2 h-4 w-4" />
              Edit your profile
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/dashboard/availability">
              <Calendar className="mr-2 h-4 w-4" />
              Set your availability
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
