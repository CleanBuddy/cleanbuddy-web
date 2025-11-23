"use client"

import { DialogDescription, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { DocumentNode } from "@apollo/client"
import { useMutationWithToast } from "@/lib/hooks/use-mutation-with-toast"

type EntityType = "team" | "project"

interface BaseEntityCreateDialogProps {
  entityType: EntityType
  onClose?: () => void
  onDismiss?: () => void
  onSuccess?: (entityId: string) => void | Promise<void>
}

interface TeamCreateDialogProps extends BaseEntityCreateDialogProps {
  entityType: "team"
  mutation: DocumentNode
}

interface ProjectCreateDialogProps extends BaseEntityCreateDialogProps {
  entityType: "project"
  mutation: DocumentNode
  teamId: string
  teamName?: string
}

type EntityCreateDialogProps = TeamCreateDialogProps | ProjectCreateDialogProps

const ENTITY_CONFIG = {
  team: {
    title: "Create New Team",
    description: "Teams help you organize your projects and collaborate with others",
    placeholder: "e.g., Acme Corp",
    label: "Name",
    inputId: "teamName",
    successKey: "createTeam",
    createButtonText: "Create Team",
    creatingButtonText: "Creating...",
  },
  project: {
    title: "Create New Project",
    description: "Projects help you organize your work",
    placeholder: "e.g., My Project",
    label: "Project Name",
    inputId: "projectName",
    successKey: "createProject",
    createButtonText: "Create Project",
    creatingButtonText: "Creating...",
  },
} as const

/**
 * Generic dialog component for creating teams or projects
 * Consolidates duplicate logic from create-team-dialog and create-project-dialog
 *
 * @example Team
 * <EntityCreateDialog
 *   entityType="team"
 *   mutation={CreateTeamDocument}
 *   onSuccess={(teamId) => navigateToTeam(teamId)}
 * />
 *
 * @example Project
 * <EntityCreateDialog
 *   entityType="project"
 *   mutation={CreateProjectDocument}
 *   teamId="team-123"
 *   teamName="Acme Corp"
 *   onSuccess={(projectId) => navigateToProject(teamId, projectId)}
 * />
 */
export function EntityCreateDialog(props: EntityCreateDialogProps) {
  const { entityType, mutation, onClose, onDismiss, onSuccess } = props
  const [displayName, setDisplayName] = useState("")
  const [loading, setLoading] = useState(false)

  const config = ENTITY_CONFIG[entityType]
  const isProjectDialog = entityType === "project"
  const teamId = isProjectDialog ? props.teamId : undefined
  const teamName = isProjectDialog ? props.teamName : undefined

  const [executeMutation] = useMutationWithToast(mutation, {
    successMessage: `${entityType === "team" ? "Team" : "Project"} created successfully`,
    errorMessage: `Failed to create ${entityType}`,
  })

  const handleSubmit = async () => {
    if (!displayName.trim() || loading) return

    setLoading(true)

    try {
      const variables = entityType === "team"
        ? { displayName: displayName.trim() }
        : { displayName: displayName.trim(), teamID: teamId }

      const result = await executeMutation({ variables })

      const createdEntity = result.data?.[config.successKey]

      if (createdEntity) {
        onClose?.()

        if (onSuccess) {
          await onSuccess(createdEntity.id)
        }
      }
    } catch (error) {
      // Error already handled by useMutationWithToast
      console.error(`Failed to create ${entityType}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{config.title}</DialogTitle>
        <DialogDescription>
          {entityType === "project" && teamName ? (
            <>
              Create a new project for team <Badge variant="outline">{teamName}</Badge>.
            </>
          ) : (
            config.description
          )}
        </DialogDescription>
      </DialogHeader>

      <DialogBody>
        <div className="grid gap-2">
          <Label htmlFor={config.inputId}>{config.label}</Label>
          <Input
            id={config.inputId}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={config.placeholder}
            disabled={loading}
            autoFocus
          />
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="outline" onClick={() => onDismiss?.()} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!displayName.trim() || loading}>
          {loading ? config.creatingButtonText : config.createButtonText}
        </Button>
      </DialogFooter>
    </>
  )
}
