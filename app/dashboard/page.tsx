"use client";

import { useCurrentUser } from "@/components/providers/user-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountMenu } from "@/components/dashboard/account-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "GLOBAL_ADMIN":
        return "destructive";
      case "COMPANY_ADMIN":
        return "default";
      case "CLEANER":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "GLOBAL_ADMIN":
        return "Global Admin";
      case "COMPANY_ADMIN":
        return "Company Admin";
      case "CLEANER":
        return "Cleaner";
      case "CLIENT":
        return "Client";
      default:
        return role;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <AccountMenu
          user={{
            name: user?.displayName || "",
            email: user?.email || "",
          }}
        />
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user?.displayName}</CardTitle>
              <CardDescription>
                Your current role: <Badge variant={getRoleBadgeVariant(user?.role || "")}>{getRoleLabel(user?.role || "")}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Email:</dt>
                      <dd>{user?.email}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">User ID:</dt>
                      <dd className="font-mono text-xs">{user?.id}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          {user?.role === "CLIENT" && (
            <Card>
              <CardHeader>
                <CardTitle>Become a Cleaner or Company Admin</CardTitle>
                <CardDescription>
                  Apply to upgrade your account and access additional features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Application system coming soon. You'll be able to apply to become a cleaner or company admin.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
