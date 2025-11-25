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
import { ApplicationStatus } from "@/components/application-status";
import { useQuery } from "@apollo/client";
import { MY_APPLICATIONS } from "@/lib/graphql/queries/application-queries";
import { ApplicationType, ApplicationStatus as ApplicationStatusEnum } from "@/lib/api/_gen/gql";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();

  // Query user's applications to check for pending cleaner application
  const { data: applicationsData, loading: applicationsLoading } = useQuery(MY_APPLICATIONS, {
    skip: !user,
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  // Show loading state while checking authentication and applications
  if (loading || applicationsLoading) {
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

  // Check if user has a pending or rejected application by querying applications
  const applications = applicationsData?.myApplications || [];
  const pendingCleanerApplication = applications.find(
    (app: { applicationType: string; status: string }) => app.applicationType === ApplicationType.Cleaner && app.status === ApplicationStatusEnum.Pending
  );
  const pendingCompanyAdminApplication = applications.find(
    (app: { applicationType: string; status: string }) => app.applicationType === ApplicationType.CompanyAdmin && app.status === ApplicationStatusEnum.Pending
  );
  const rejectedCleanerApplication = applications.find(
    (app: { applicationType: string; status: string }) => app.applicationType === ApplicationType.Cleaner && app.status === ApplicationStatusEnum.Rejected
  );
  const rejectedCompanyAdminApplication = applications.find(
    (app: { applicationType: string; status: string }) => app.applicationType === ApplicationType.CompanyAdmin && app.status === ApplicationStatusEnum.Rejected
  );

  // If user has pending cleaner application, show application status instead of dashboard
  if (pendingCleanerApplication) {
    return <ApplicationStatus application={pendingCleanerApplication} />;
  }

  // If user has pending company admin application, show application status instead of dashboard
  if (pendingCompanyAdminApplication) {
    return <ApplicationStatus application={pendingCompanyAdminApplication} />;
  }

  // If user has rejected cleaner application, show application status instead of dashboard
  if (rejectedCleanerApplication) {
    return <ApplicationStatus application={rejectedCleanerApplication} />;
  }

  // If user has rejected company admin application, show application status instead of dashboard
  if (rejectedCompanyAdminApplication) {
    return <ApplicationStatus application={rejectedCompanyAdminApplication} />;
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
