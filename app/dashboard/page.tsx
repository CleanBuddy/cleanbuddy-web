"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Calendar, CreditCard, Star, Users, BarChart3, CheckCircle, Clock } from "lucide-react";
import { DASHBOARD_STATS_CLIENT, DASHBOARD_STATS_CLEANER, DASHBOARD_STATS_ADMIN } from "@/lib/graphql/queries/dashboard-queries";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingItemCard } from "@/components/dashboard/upcoming-item-card";

export default function DashboardPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // Customer Dashboard
  if (user?.role === "client" || !user?.role) {
    const { data, loading: dataLoading } = useQuery(DASHBOARD_STATS_CLIENT, {
      skip: !user,
    });

    const bookings = data?.myBookings?.edges?.map((edge: any) => edge.node) || [];
    const upcomingBookings = data?.upcomingBookings || [];
    const totalBookings = data?.myBookings?.totalCount || 0;
    const completedBookings = bookings.filter((b: any) => b.status === "COMPLETED").length;
    const totalSpent = bookings
      .filter((b: any) => b.status === "COMPLETED")
      .reduce((sum: number, b: any) => sum + b.totalPrice, 0);

    return (
      <div className="space-y-6 py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(" ")[0]}!</h1>
          <p className="text-muted-foreground mt-2">
            Book a cleaning service or manage your existing bookings
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dataLoading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <StatCard
                title="Total Bookings"
                value={totalBookings}
                icon={Calendar}
                description="All time"
              />
              <StatCard
                title="Completed"
                value={completedBookings}
                icon={CheckCircle}
                description="Services completed"
              />
              <StatCard
                title="Total Spent"
                value={`${(totalSpent / 100).toFixed(2)} RON`}
                icon={CreditCard}
                description="All time"
              />
              <StatCard
                title="Upcoming"
                value={upcomingBookings.length}
                icon={Clock}
                description="Scheduled bookings"
              />
            </>
          )}
        </div>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your next scheduled cleaning services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingBookings.map((booking: any) => (
                  <UpcomingItemCard
                    key={booking.id}
                    id={booking.id}
                    date={booking.scheduledDate}
                    time={booking.scheduledTime}
                    duration={booking.duration}
                    serviceType={booking.serviceType}
                    status={booking.status}
                    personName={booking.cleaner?.displayName || "Cleaner"}
                    personRole="cleaner"
                    address={booking.address}
                    amount={booking.totalPrice}
                    linkTo="/dashboard/bookings"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/book">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Book a Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find and book professional cleaning services
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/cleaners">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-lg">Find Cleaners</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Browse and compare professional cleaners
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/addresses">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg">My Addresses</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage your saved addresses
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    );
  }

  // Cleaner Dashboard
  if (user?.role === "cleaner") {
    const { data, loading: dataLoading } = useQuery(DASHBOARD_STATS_CLEANER, {
      skip: !user,
    });

    const jobs = data?.myJobs?.edges?.map((edge: any) => edge.node) || [];
    const profile = data?.myCleanerProfile;
    const upcomingJobs = data?.upcomingJobs || [];

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
          {dataLoading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
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
            </>
          )}
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
                    personName={job.client?.displayName || "Customer"}
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
                Complete your profile
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

  // Admin Dashboard
  if (user?.role === "global_admin" || user?.role === "company_admin") {
    const { data, loading: dataLoading } = useQuery(DASHBOARD_STATS_ADMIN, {
      skip: !user,
    });

    const allBookings = data?.allBookings?.edges?.map((edge: any) => edge.node) || [];
    const totalBookings = data?.allBookings?.totalCount || 0;
    const pendingApplicationsCount = data?.pendingApplications?.length || 0;

    // Calculate this month's revenue from completed bookings
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const completedBookings = allBookings.filter((b: any) => b.status === "COMPLETED");
    const monthlyRevenue = completedBookings
      .filter((b: any) => new Date(b.scheduledDate) >= startOfMonth)
      .reduce((sum: number, b: any) => sum + b.totalPrice, 0);

    // TODO: Calculate active cleaners count - needs backend query
    const activeCleaners = 0;

    // TODO: Calculate average rating - needs backend query
    const avgRating = "—";

    return (
      <div className="space-y-6 py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor platform activity and manage operations
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dataLoading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </>
          ) : (
            <>
              <StatCard
                title="Total Bookings"
                value={totalBookings}
                icon={Calendar}
                description="All time"
              />
              <StatCard
                title="Active Cleaners"
                value={activeCleaners}
                icon={Users}
                description="Currently active"
              />
              <StatCard
                title="Revenue"
                value={`${(monthlyRevenue / 100).toFixed(2)} RON`}
                icon={CreditCard}
                description="This month"
              />
              <StatCard
                title="Avg Rating"
                value={avgRating}
                icon={Star}
                description="Platform average"
              />
            </>
          )}
        </div>

        {/* Recent Activity */}
        {allBookings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allBookings.slice(0, 5).map((booking: any) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          booking.status === "COMPLETED" ? "default" :
                          booking.status === "CONFIRMED" ? "secondary" :
                          booking.status === "PENDING" ? "outline" : "destructive"
                        }>
                          {booking.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-1">
                        {(booking.totalPrice / 100).toFixed(2)} RON
                      </p>
                    </div>
                    <Link href="/dashboard/bookings">
                      <Button size="sm" variant="ghost">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/dashboard/applications">
                  <Users className="mr-2 h-4 w-4" />
                  Review Applications
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/dashboard/cleaners">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Cleaners
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/dashboard/bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Bookings
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System Status:</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Status:</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
                {pendingApplicationsCount > 0 && (
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-muted-foreground">Pending Applications:</span>
                    <Badge variant="secondary">{pendingApplicationsCount}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
