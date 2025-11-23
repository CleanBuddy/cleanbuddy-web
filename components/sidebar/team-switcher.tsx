"use client"

import * as React from "react"
import { ChevronsUpDown, CircleEllipsis, Plus, Settings } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn, getInitials } from "@/lib/utils"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Fragment } from "react"


export function TeamSwitcher<T extends {
  id: string
  displayName: string
  role: "owner" | "member"
  projects: {
    id: string
    displayName: string
  }[]
}>({
  teams,
  selectedProject,
  onCreateTeam,
  onProjectSelect,
  onAddProject,
  onShowTeamSettings,
}: {
  teams: T[]
  selectedProject: {
    id: string
    displayName: string
    teamId: string
  } | null
  onCreateTeam: () => void
  onAddProject: (teamID: string) => void
  onShowTeamSettings: (teamID: string) => void
  onProjectSelect: (teamID: string, projectID: string) => void
}) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = React.useState(false)

  const selectedTeam = teams.find(team => team.id === selectedProject?.teamId)
  const tooltipText = selectedProject == null ? "No Project Selected" : `${selectedProject.displayName} (${selectedTeam?.displayName})`


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip={tooltipText}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                {selectedProject == null ? (
                  <CircleEllipsis />
                ) : (
                  <span className="text-sm font-medium">{getInitials(selectedProject.displayName)}</span>
                )}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                {selectedProject == null ? (
                  <span className="truncate font-medium">No Project Selected</span>
                ) : (
                  <Fragment>
                    <span className="truncate font-medium">{selectedProject.displayName}</span>
                    <span className="truncate text-xs">{selectedTeam?.displayName}</span>
                  </Fragment>
                )}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {teams.sort((a, b) => a.id.localeCompare(b.id)).map((team, index) => (
              <Fragment key={team.id}>
                {index > 0 && <DropdownMenuSeparator />}
                <TeamProjectSection
                  team={team}
                  selectedProjectId={selectedProject?.id}
                  onAddProjectSettingsClick={onAddProject}
                  onTeamSettingsClick={onShowTeamSettings}
                  onProjectSelect={onProjectSelect}
                  onCloseDropdown={() => setOpen(false)}
                />
              </Fragment>
            ))}
            {teams.length === 0 && (
              <DropdownMenuItem className="gap-2 p-2" disabled>
                <span className="text-muted-foreground text-xs">No teams</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 py-1.5 px-2"
              onClick={onCreateTeam}
            >
              <div className="flex size-6 items-center justify-center rounded-sm border bg-transparent">
                <Plus className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground font-medium">New Team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


function TeamProjectSection({
  team,
  selectedProjectId,
  onAddProjectSettingsClick,
  onTeamSettingsClick,
  onProjectSelect,
  onCloseDropdown,
}: {
  team: {
    id: string
    displayName: string
    projects: {
      id: string
      displayName: string
    }[]
  }
  selectedProjectId?: string
  onAddProjectSettingsClick: (teamId: string) => void
  onTeamSettingsClick: (teamId: string) => void
  onProjectSelect: (teamId: string, projectId: string) => void
  onCloseDropdown: () => void
}) {

  return (
    <Fragment>
      <DropdownMenuLabel className="group text-muted-foreground hover:text-accent-foreground transition-colors text-xs font-semibold flex items-center gap-2" data-team-id={team.id}>
        <span className="truncate max-w-[120px]">{team.displayName}</span>
        <div className="flex items-center group/buttons ml-auto">
          <Button variant="ghost" size="sm" onClick={() => {
            onAddProjectSettingsClick(team.id)
            onCloseDropdown()
          }} title="Add Project">
            <Plus />
            <span className="sr-only">Add Project</span>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="sm" onClick={() => {
            onTeamSettingsClick(team.id)
            onCloseDropdown()
          }} title="Team Settings">
            <Settings />
            <span className="sr-only">Team Settings</span>
          </Button>
        </div>
      </DropdownMenuLabel>
      {team.projects.sort((a, b) => a.id.localeCompare(b.id)).map((project) => (
        <DropdownMenuItem
          key={project.id}
          className={cn(
            "gap-2 py-1.5 px-2",
            selectedProjectId === project.id && "bg-sidebar-accent"
          )}
          onClick={() => onProjectSelect(team.id, project.id)}
          aria-current={selectedProjectId === project.id}
        >
          <div className={cn(
            "flex size-6 items-center justify-center rounded-sm border",
            selectedProjectId === project.id && "bg-sidebar-primary border-none font-medium"
          )}>
            <span className={cn("text-xs font-medium text-muted-foreground", selectedProjectId === project.id && "text-sidebar-primary-foreground")}>{getInitials(project.displayName)}</span>
          </div>
          {project.displayName}
        </DropdownMenuItem>
      ))}
      {team.projects.length === 0 && (
        <DropdownMenuItem className="gap-2 p-2" disabled>
          <span className="text-muted-foreground text-xs">No projects</span>
        </DropdownMenuItem>
      )}
    </Fragment>
  )
}