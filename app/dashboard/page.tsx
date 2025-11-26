"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { useQuery } from "@apollo/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Calendar, CreditCard, Star, Users, CheckCircle, Clock } from "lucide-react";
import { DASHBOARD_STATS_CLIENT, DASHBOARD_STATS_ADMIN } from "@/lib/graphql/queries/dashboard-queries";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingItemCard } from "@/components/dashboard/upcoming-item-card";
import { CleanerDashboard } from "@/components/dashboard/cleaner-dashboard";
import { AccountButton } from "@/components/account-button";
import { UserRole, CompanyStatus, CompanyType } from "@/lib/api/_gen/gql";

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
  if (user?.role === UserRole.Client || !user?.role) {
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

  // CleanerAdmin with pending company - Application Under Review
  if (user?.role === UserRole.CleanerAdmin && user?.company?.status === CompanyStatus.Pending) {
    return (
      <div className="space-y-6 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Company Registration Under Review
            </h1>
            <p className="text-muted-foreground mt-2">
              Your company registration is being reviewed by our team
            </p>
          </div>
          <AccountButton
            user={{
              name: user.displayName || "User",
              email: user.email || "",
            }}
          />
        </div>

        <Card className="border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-xl">Registration Pending</CardTitle>
                <CardDescription>
                  We're reviewing your company registration and documents
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our team typically reviews company registrations within 24-48 hours.
              You'll receive an email notification once your registration
              has been approved or if we need additional information.
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="mailto:support@cleanbuddy.com">
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Show what's next */}
        <Card>
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">1</Badge>
                <span>Our team reviews your company documents and information</span>
              </li>
              <li className="flex gap-3">
                <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">2</Badge>
                <span>We verify your business registration and credentials</span>
              </li>
              <li className="flex gap-3">
                <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">3</Badge>
                <span>You'll receive approval and gain access to the company admin dashboard</span>
              </li>
              <li className="flex gap-3">
                <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">4</Badge>
                <span>Start managing your cleaning team and accepting jobs!</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    );
  }

  // CleanerAdmin with rejected company - Show rejection status
  if (user?.role === UserRole.CleanerAdmin && user?.company?.status === CompanyStatus.Rejected) {
    return (
      <div className="space-y-6 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Registration Update
            </h1>
            <p className="text-muted-foreground mt-2">
              Your company registration was not approved
            </p>
          </div>
          <AccountButton
            user={{
              name: user.displayName || "User",
              email: user.email || "",
            }}
          />
        </div>

        <Card className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle>Registration Not Approved</CardTitle>
            <CardDescription>
              We were unable to approve your company registration at this time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you believe this was a mistake or would like to reapply with
              updated information, please contact our support team.
            </p>
            {user?.company?.rejectionReason && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Reason:</p>
                <p className="text-sm text-muted-foreground">{user.company.rejectionReason}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link href="mailto:support@cleanbuddy.com">
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Cleaner Dashboard
  if (user?.role === UserRole.Cleaner) {
    return <CleanerDashboard user={user} />;
  }

  // CLEANER_ADMIN with approved company - different view for Individual vs Business
  if (user?.role === UserRole.CleanerAdmin && user?.company?.status === CompanyStatus.Approved) {
    const isBusiness = user.company.companyType === CompanyType.Business;
    const { data, loading: dataLoading } = useQuery(DASHBOARD_STATS_ADMIN, {
      skip: !user,
    });

    const allBookings = data?.allBookings?.edges?.map((edge: any) => edge.node) || [];
    const totalBookings = data?.allBookings?.totalCount || 0;

    // Calculate this month's revenue from completed bookings
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const completedBookings = allBookings.filter((b: any) => b.status === "COMPLETED");
    const monthlyRevenue = completedBookings
      .filter((b: any) => new Date(b.scheduledDate) >= startOfMonth)
      .reduce((sum: number, b: any) => sum + b.totalPrice, 0);

    // TODO: Calculate average rating - needs backend query
    const avgRating = "—";

    return (
      <div className="space-y-6 py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isBusiness ? "Company Dashboard" : "Dashboard"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isBusiness
              ? "Monitor your company's activity and manage your team"
              : "Monitor your bookings and manage your cleaning business"}
          </p>
        </div>

        {/* Statistics - Different for Individual vs Business */}
        <div className={`grid gap-4 md:grid-cols-2 ${isBusiness ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {dataLoading ? (
            <>
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              {isBusiness && <Skeleton className="h-32" />}
            </>
          ) : (
            <>
              <StatCard
                title="Total Bookings"
                value={totalBookings}
                icon={Calendar}
                description="All time"
              />
              {/* Only show Active Cleaners for BUSINESS companies */}
              {isBusiness && (
                <StatCard
                  title="Active Cleaners"
                  value={user.company.activeCleaners || 0}
                  icon={Users}
                  description="In your team"
                />
              )}
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
                description={isBusiness ? "Company average" : "Your rating"}
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

        {/* Quick Actions - Different for Individual vs Business */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className={`grid gap-4 ${isBusiness ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/company">
                <Users className="mr-2 h-4 w-4" />
                My Company
              </Link>
            </Button>
            {isBusiness && (
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/dashboard/company/cleaners">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Link>
              </Button>
            )}
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/bookings">
                <Calendar className="mr-2 h-4 w-4" />
                View Bookings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Global Admin Dashboard
  if (user?.role === UserRole.GlobalAdmin) {
    const { data, loading: dataLoading } = useQuery(DASHBOARD_STATS_ADMIN, {
      skip: !user,
    });

    const allBookings = data?.allBookings?.edges?.map((edge: any) => edge.node) || [];
    const totalBookings = data?.allBookings?.totalCount || 0;
    const pendingApplicationsCount = data?.pendingCompanies?.length || 0;

    // Calculate this month's revenue from completed bookings
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const completedBookings = allBookings.filter((b: any) => b.status === "COMPLETED");
    const monthlyRevenue = completedBookings
      .filter((b: any) => new Date(b.scheduledDate) >= startOfMonth)
      .reduce((sum: number, b: any) => sum + b.totalPrice, 0);

    const activeCleaners = 0;
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
