"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, DollarSign, Clock, CheckCircle } from "lucide-react";

export default function PayoutsPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (user?.role !== "global_admin" && user?.role !== "company_admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
          <p className="text-muted-foreground mt-2">
            Manage cleaner payouts and payment processing
          </p>
        </div>
        <Button disabled>
          <CreditCard className="mr-2 h-4 w-4" />
          Process Payouts
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 RON</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 RON</div>
            <p className="text-xs text-muted-foreground">Total paid out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Time</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.00 RON</div>
            <p className="text-xs text-muted-foreground">Total processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cleaners</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Receiving payments</p>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        icon={CreditCard}
        title="No payouts yet"
        description="Cleaner payouts will appear here once jobs are completed and payments are processed. You can batch process payouts or handle them individually."
      />

      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
          <CardDescription>
            Configure payout schedules and payment methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Payout Schedule</label>
            <p className="text-sm text-muted-foreground mt-1">Weekly on Fridays</p>
          </div>
          <div>
            <label className="text-sm font-medium">Minimum Payout Amount</label>
            <p className="text-sm text-muted-foreground mt-1">50.00 RON</p>
          </div>
          <Button variant="outline" disabled>
            Edit Settings (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
