"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProvider, useCurrentUser } from "@/components/providers/user-provider";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { UserRole, CompanyStatus } from "@/lib/api/_gen/gql";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, XCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AccountButton } from "@/components/account-button";

interface CompanyStatusDisplayProps {
  status: CompanyStatus;
  rejectionReason?: string | null;
  companyName?: string;
  user: { name: string; email: string };
}

function CompanyStatusDisplay({ status, rejectionReason, companyName, user }: CompanyStatusDisplayProps) {
  if (status === CompanyStatus.Pending) {
    return (
      <div className="min-h-screen bg-muted/50">
        <div className="absolute top-4 right-4">
          <AccountButton user={user} />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-2xl">Application Under Review</CardTitle>
              <CardDescription className="mt-2">
                {companyName ? `Your company "${companyName}" is being reviewed by our team.` : "Your company registration is being reviewed by our team."}
                We'll notify you once a decision has been made.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                This process typically takes 1-2 business days.
              </p>
              <Button asChild variant="outline">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (status === CompanyStatus.Rejected) {
    return (
      <div className="min-h-screen bg-muted/50">
        <div className="absolute top-4 right-4">
          <AccountButton user={user} />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md mx-4">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl">Application Not Approved</CardTitle>
              <CardDescription className="mt-2">
                Unfortunately, your company registration was not approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {rejectionReason && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Reason:</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">{rejectionReason}</p>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Please contact us if you have any questions or would like to discuss this decision.
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}

function NeedsCompanyRegistration() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">Complete Your Registration</CardTitle>
          <CardDescription className="mt-2">
            To access your dashboard, please complete your company registration first.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild className="w-full">
            <Link href="/company-signup">Complete Registration</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  // For CLEANER_ADMIN, check company status
  if (user.role === UserRole.CleanerAdmin) {
    // No company yet - needs to complete registration
    if (!user.company) {
      return <NeedsCompanyRegistration />;
    }

    // Company pending or rejected - show status page
    if (user.company.status === CompanyStatus.Pending || user.company.status === CompanyStatus.Rejected) {
      return (
        <CompanyStatusDisplay
          status={user.company.status}
          rejectionReason={user.company.rejectionReason}
          companyName={user.company.companyName}
          user={{
            name: user.displayName || "User",
            email: user.email || "",
          }}
        />
      );
    }
  }

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
    href: "/" + pathSegments.slice(0, index + 1).join("/"),
    isLast: index === pathSegments.length - 1,
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  );
}
