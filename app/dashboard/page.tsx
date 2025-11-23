"use client";

import { useTeam } from "@/components/providers/team-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/dashboard/empty-state";
import { EntityCreateDialog } from "@/components/dialogs/entity-create-dialog";
import { useDialog } from "@/components/providers/dialog-provider";
import { useSearchParams } from "next/navigation";
import { AccountMenu } from "@/components/dashboard/account-menu";
import { CreateProjectDocument } from "@/lib/api/_gen/gql";

export default function DashboardPage() {
  const { user, navigateToProject } = useTeam();
  const { openDialog } = useDialog();
  const searchParams = useSearchParams();

  if (user.loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Get the target team from URL query params, or default to first team
  const targetTeamId = searchParams.get('teamId');
  const defaultTeam = targetTeamId
    ? user.data?.teams.find(t => t.id === targetTeamId) || user.data?.teams[0]
    : user.data?.teams[0];

  // Show empty state if user has no projects (onboarding)
  if (defaultTeam && (!defaultTeam.projects || defaultTeam.projects.length === 0)) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-end border-b px-4 py-3">
          <AccountMenu
            user={{
              name: user.data?.displayName || "",
              email: user.data?.email || "",
            }}
          />
        </header>
        <EmptyState
          onCreateProject={() => {
            openDialog(
              <EntityCreateDialog
                entityType="project"
                mutation={CreateProjectDocument}
                teamId={defaultTeam.id}
                teamName={defaultTeam.displayName}
                onSuccess={(projectId) => {
                  navigateToProject(defaultTeam.id, projectId)
                }}
              />
            );
          }}
        />
      </div>
    );
  }

  // If user has projects, TeamProvider will redirect to first project
  // This is just a loading state while redirect happens
  return (
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
