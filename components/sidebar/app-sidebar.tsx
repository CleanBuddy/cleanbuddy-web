"use client"

import React, { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { LifeBuoy, Send, Settings2 } from "lucide-react"
import { useTeam } from "@/components/providers/team-provider"
import { TeamSwitcher } from "./team-switcher"
import { EntityCreateDialog } from "../dialogs/entity-create-dialog"
import { EntitySettingsDialog } from "../dialogs/entity-settings-dialog"
import { useDialog } from "../providers/dialog-provider"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { FeedbackDialogContent } from "../dialogs/feedback-dialog"
import { isAuthenticatedVar } from "@/lib/apollo-client"
import {
  CreateTeamDocument,
  CreateProjectDocument,
  UpdateTeamDocument,
  UpdateProjectDocument,
  DeleteTeamDocument,
  DeleteProjectDocument,
} from "@/lib/api/_gen/gql"

// Global skeleton for the entire sidebar while loading user/team data
function SidebarGlobalSkeleton() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Skeleton className="h-8 w-full" />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-16 w-full" />
      </SidebarContent>
      <SidebarFooter>
        <Skeleton className="h-8 w-full" />
      </SidebarFooter>
    </Sidebar>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, selectedTeam, selectedProject, setSelectedTeam, navigateToTeamOnboarding, navigateToProject, navigateAfterTeamDeletion, navigateAfterProjectDeletion } = useTeam()
  const { openDialog } = useDialog()
  const [isClient, setIsClient] = useState(false)

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if we have an access token - if not, we're still loading auth context
  const hasAccessToken = isClient ? isAuthenticatedVar() : false;


  const handleCreateProject = (teamID: string) => {
    const team = user.data?.teams.find(team => team.id === teamID)
    if (!team) {
      return
    }
    openDialog(
      <EntityCreateDialog
        entityType="project"
        mutation={CreateProjectDocument}
        teamId={team.id}
        teamName={team.displayName}
        onSuccess={(projectId) => {
          navigateToProject(team.id, projectId)
        }}
      />
    )
  }

  const handleCreateTeam = async () => {
    openDialog(
      <EntityCreateDialog
        entityType="team"
        mutation={CreateTeamDocument}
        onSuccess={(teamId) => {
          navigateToTeamOnboarding(teamId)
        }}
      />
    )
  }

  const handleTeamSettings = (teamID: string) => {
    const team = user.data?.teams.find(team => team.id === teamID)
    if (!team) {
      return
    }

    openDialog(
      <EntitySettingsDialog
        entityType="team"
        entityId={team.id}
        initialDisplayName={team.displayName}
        updateMutation={UpdateTeamDocument}
        deleteMutation={DeleteTeamDocument}
        onDelete={() => navigateAfterTeamDeletion(team.id)}
      />
    )
  }

  const handleProjectSettings = (projectID: string) => {
    const team = user.data?.teams.find(team => team.id === selectedTeam?.id)
    const project = team?.projects?.find(project => project.id === projectID)
    if (!team || !project) {
      return
    }

    openDialog(
      <EntitySettingsDialog
        entityType="project"
        entityId={project.id}
        teamId={team.id}
        initialDisplayName={project.displayName}
        updateMutation={UpdateProjectDocument}
        deleteMutation={DeleteProjectDocument}
        onDelete={() => navigateAfterProjectDeletion(team.id, project.id)}
      />
    ).catch(() => {
      // Dialog dismissed
    })
  }

  const handleFeedback = (e: React.MouseEvent) => {
    e.preventDefault()
    openDialog(<FeedbackDialogContent />)
  }

  // Show loading while initializing client-side
  if (!isClient) {
    return <SidebarGlobalSkeleton />
  }

  // Show global skeleton while loading user/team data
  // Don't show skeleton for transient errors, only for auth errors or while truly loading
  if (user.loading || !hasAccessToken) {
    return <SidebarGlobalSkeleton />
  }

  // If there's an error but we have cached data, show the data instead of skeleton
  if (user.error != null && user.data == null) {
    return <SidebarGlobalSkeleton />
  }

  // If we have no data at all after loading completes, show skeleton
  if (user.data == null) {
    return <SidebarGlobalSkeleton />
  }

  // Show skeleton while waiting for team selection
  if (!selectedTeam) {
    return (
      <Sidebar variant="inset" collapsible="icon" {...props}>
        <SidebarHeader>
          <Skeleton className="h-8 w-full" />
        </SidebarHeader>
        <SidebarContent className="px-2">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-8 w-full" />
        </SidebarFooter>
      </Sidebar>
    )
  }

  return (
    <Sidebar variant="inset" collapsible="icon"  {...props}>
      <SidebarHeader>
        {selectedTeam ? (
          <TeamSwitcher
            teams={user.data.teams}
            selectedProject={selectedProject}
            onProjectSelect={setSelectedTeam}
            onCreateTeam={handleCreateTeam}
            onAddProject={handleCreateProject}
            onShowTeamSettings={handleTeamSettings}
          />
        ) : (
          <Skeleton className="h-8 w-full" />
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        {selectedTeam ? (
          <SidebarGroup>
            <SidebarMenu>
              <SidebarSeparator className="bg-transparent my-1" />
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Project Settings"
                  disabled={!selectedProject}
                >
                  <a 
                    href="#project-settings" 
                    onClick={(e) => {
                      if (!selectedProject) {
                        e.preventDefault()
                        return
                      }
                      handleProjectSettings(selectedProject.id)
                    }}
                  >
                    <Settings2 />
                    <span>Project Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        )}

        <NavSecondary items={[
          {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
          },
          {
            title: "Feedback",
            icon: Send,
            onClick: handleFeedback,
          }]} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user.data?.displayName,
          email: user.data?.email,
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}