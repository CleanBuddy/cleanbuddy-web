"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/components/providers/user-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, MapPin, FileText, Settings, UserPlus } from "lucide-react";
import { UserRole, useMyCompanyQuery } from "@/lib/api/_gen/gql";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CompanyDashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();
  const { toast } = useToast();
  const { data, loading: companyLoading, error } = useMyCompanyQuery({
    skip: !user || user.role !== UserRole.CleanerAdmin,
  });

  // Redirect non-company admins
  useEffect(() => {
    if (!userLoading && user) {
      if (user.role !== UserRole.CleanerAdmin) {
        toast({
          title: "Access Denied",
          description: "Only company admins can access this page.",
          variant: "destructive",
        });
        router.push("/dashboard");
      }
    }
  }, [user, userLoading, router, toast]);

  if (userLoading || companyLoading) {
    return (
      <div className="space-y-6 py-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 py-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading company data: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const company = data?.myCompany;

  if (!company) {
    return (
      <div className="space-y-6 py-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Company not found. Please contact support.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const businessTypeLabels: Record<string, string> = {
    limited_liability: "Limited Liability Company (SRL)",
    joint_stock: "Joint Stock Company (SA)",
    sole_proprietorship: "Sole Proprietorship (PFA)",
    individual: "Individual (PF)",
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{company.companyName}</h1>
          <p className="text-muted-foreground mt-2">
            Manage your company and cleaners
          </p>
        </div>
        <Badge variant={company.isActive ? "default" : "secondary"}>
          {company.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cleaners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.totalCleaners}</div>
            <p className="text-xs text-muted-foreground">
              Registered with your company
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cleaners</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{company.activeCleaners}</div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Type</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {company.businessType ? businessTypeLabels[company.businessType] || company.businessType : "N/A"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {new Date(company.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Details
            </CardTitle>
            <CardDescription>
              Your registered company information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Registration Number</p>
                <p className="font-medium">{company.registrationNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tax ID</p>
                <p className="font-medium">{company.taxId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </CardTitle>
            <CardDescription>
              Your company's registered address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{company.companyStreet}</p>
            <p className="text-muted-foreground">
              {company.companyCity}
              {company.companyCounty && `, ${company.companyCounty}`}
            </p>
            <p className="text-muted-foreground">
              {company.companyPostalCode}, {company.companyCountry}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your company and team
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => router.push("/dashboard/company/invites")}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Cleaner
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => router.push("/dashboard/company/cleaners")}
          >
            <Users className="mr-2 h-4 w-4" />
            View Cleaners
          </Button>
          <Button variant="outline" className="justify-start" disabled>
            <Settings className="mr-2 h-4 w-4" />
            Company Settings
            <Badge variant="secondary" className="ml-auto">Coming Soon</Badge>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
