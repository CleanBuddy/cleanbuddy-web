"use client"

import { DialogHeader, DialogTitle, DialogBody } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "sonner"
import { Pencil, Check, X, Trash2, AlertTriangle } from "lucide-react"
import { DocumentNode } from "@apollo/client"
import { useMutationWithToast } from "@/lib/hooks/use-mutation-with-toast"
import { useCurrentUserTeamsWithProjectsQuery } from "@/lib/api/_gen/gql"

type EntityType = "team" | "project"

interface BaseEntitySettingsDialogProps {
  entityType: EntityType
  entityId: string
  initialDisplayName: string
  updateMutation: DocumentNode
  deleteMutation: DocumentNode
  onClose?: () => void
  onDismiss?: () => void
  onDelete?: () => void | Promise<void>
}

interface TeamSettingsDialogProps extends BaseEntitySettingsDialogProps {
  entityType: "team"
}

interface ProjectSettingsDialogProps extends BaseEntitySettingsDialogProps {
  entityType: "project"
  teamId: string
}

type EntitySettingsDialogProps = TeamSettingsDialogProps | ProjectSettingsDialogProps

const ENTITY_CONFIG = {
  team: {
    title: "Team Settings",
    nameLabel: "Team Name",
    dangerZoneTitle: "Danger Zone",
    dangerZoneDescription: "Deleting a team is permanent and cannot be undone.",
    deleteButtonText: "Delete Team...",
    deletingButtonText: "Deleting...",
    deleteDialogTitle: "Delete Team",
    deleteDialogDescription: (name: string) =>
      <>Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone and will permanently delete all team data, projects, and remove all members.</>,
    updateSuccessMessage: "Team name updated successfully",
    updateErrorMessage: "Failed to update team name",
    deleteSuccessMessage: "Team deleted successfully",
    deleteErrorMessage: "Failed to delete team. Please try again.",
  },
  project: {
    title: "Project Settings",
    nameLabel: "Project Name",
    dangerZoneTitle: "Danger Zone",
    dangerZoneDescription: "Deleting a project is permanent and cannot be undone.",
    deleteButtonText: "Delete Project...",
    deletingButtonText: "Deleting...",
    deleteDialogTitle: "Delete Project",
    deleteDialogDescription: (name: string) =>
      <>Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone and will permanently delete all project data.</>,
    updateSuccessMessage: "Project name updated successfully",
    updateErrorMessage: "Failed to update project name",
    deleteSuccessMessage: "Project deleted successfully",
    deleteErrorMessage: "Failed to delete project. Please try again.",
  },
} as const

/**
 * Generic settings dialog for teams and projects
 * Consolidates duplicate logic from team-settings-dialog and project-settings-dialog
 *
 * Features:
 * - Inline name editing with save/cancel
 * - Delete confirmation dialog
 * - Consistent error handling and toasts
 *
 * @example Team Settings
 * <EntitySettingsDialog
 *   entityType="team"
 *   entityId="team-123"
 *   initialDisplayName="Acme Corp"
 *   updateMutation={UpdateTeamDocument}
 *   deleteMutation={DeleteTeamDocument}
 *   onDelete={() => navigateAfterTeamDeletion(teamId)}
 * />
 *
 * @example Project Settings
 * <EntitySettingsDialog
 *   entityType="project"
 *   entityId="project-123"
 *   teamId="team-123"
 *   initialDisplayName="My Project"
 *   updateMutation={UpdateProjectDocument}
 *   deleteMutation={DeleteProjectDocument}
 *   onDelete={() => navigateAfterProjectDeletion(teamId, projectId)}
 * />
 */
export function EntitySettingsDialog(props: EntitySettingsDialogProps) {
  const { entityType, entityId, initialDisplayName, updateMutation, deleteMutation, onClose, onDelete } = props

  const [displayName, setDisplayName] = useState(initialDisplayName || "")
  const [savedDisplayName, setSavedDisplayName] = useState(initialDisplayName || "")
  const [isEditingName, setIsEditingName] = useState(false)
  const [loading, setLoading] = useState(false)

  const { refetch: refetchTeams } = useCurrentUserTeamsWithProjectsQuery()
  const config = ENTITY_CONFIG[entityType]

  const [executeUpdateMutation] = useMutationWithToast(updateMutation)
  const [executeDeleteMutation, { loading: deleteLoading }] = useMutationWithToast(deleteMutation)

  const handleUpdateName = async () => {
    if (!displayName.trim()) {
      toast.error(`${entityType === "team" ? "Team" : "Project"} name cannot be empty`)
      return
    }

    if (displayName === savedDisplayName) {
      setIsEditingName(false)
      return
    }

    if (!entityId) {
      toast.error(`${entityType === "team" ? "Team" : "Project"} ID is required`)
      return
    }

    setLoading(true)

    try {
      await executeUpdateMutation({
        variables: {
          id: entityId,
          displayName: displayName.trim(),
        },
      })

      toast.success(config.updateSuccessMessage)
      setSavedDisplayName(displayName.trim())
      setIsEditingName(false)
      await refetchTeams()
    } catch {
      toast.error(config.updateErrorMessage)
      // Revert to saved name
      setDisplayName(savedDisplayName)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelNameEdit = () => {
    setDisplayName(savedDisplayName)
    setIsEditingName(false)
  }

  const handleDelete = async () => {
    if (!entityId) {
      toast.error(`${entityType === "team" ? "Team" : "Project"} ID is required`)
      return
    }

    try {
      await executeDeleteMutation({
        variables: {
          id: entityId,
        },
      })

      toast.success(config.deleteSuccessMessage)
      onClose?.()

      if (onDelete) {
        await onDelete()
      }
    } catch (error) {
      console.error(`Failed to delete ${entityType}:`, error)
      toast.error(config.deleteErrorMessage)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{config.title}</DialogTitle>
      </DialogHeader>

      <DialogBody className="gap-6">
        {/* Name Section */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">{config.nameLabel}</label>
            {isEditingName ? (
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateName()
                    if (e.key === 'Escape') handleCancelNameEdit()
                  }}
                  disabled={loading}
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={handleUpdateName}
                  disabled={loading}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={handleCancelNameEdit}
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm flex-1">{savedDisplayName}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => setIsEditingName(true)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-semibold">{config.dangerZoneTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {config.dangerZoneDescription}
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="w-full gap-2"
                disabled={deleteLoading}
              >
                <Trash2 className="h-4 w-4" />
                {config.deleteButtonText}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  {config.deleteDialogTitle}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {config.deleteDialogDescription(savedDisplayName)}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteLoading ? config.deletingButtonText : config.deleteButtonText.replace("...", "")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogBody>
    </>
  )
}
