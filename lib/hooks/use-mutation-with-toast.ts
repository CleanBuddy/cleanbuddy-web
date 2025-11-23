"use client"

import { DocumentNode, useMutation, MutationHookOptions, MutationTuple } from "@apollo/client"
import { toast } from "sonner"

/**
 * Common refetch configuration for team/project mutations
 */
export const TEAM_MUTATION_CONFIG = {
  refetchQueries: ["CurrentUserTeamsWithProjects"] as string[],
  awaitRefetchQueries: true,
}

export interface UseMutationWithToastOptions<TData, TVariables> extends MutationHookOptions<TData, TVariables> {
  successMessage?: string
  errorMessage?: string
  onSuccess?: (data: TData) => void | Promise<void>
  onError?: (error: Error) => void
}

/**
 * Wrapper around useMutation that automatically handles:
 * - Success/error toast notifications
 * - Common refetch queries for teams/projects
 * - Consistent error handling
 * - Optional success callbacks
 *
 * @example
 * const [createTeam, { loading }] = useMutationWithToast(
 *   CreateTeamDocument,
 *   {
 *     successMessage: "Team created successfully",
 *     errorMessage: "Failed to create team",
 *     onSuccess: async (data) => {
 *       navigateToTeam(data.createTeam.id)
 *     }
 *   }
 * )
 */
export function useMutationWithToast<TData = any, TVariables = any>(
  mutation: DocumentNode,
  options: UseMutationWithToastOptions<TData, TVariables> = {}
): MutationTuple<TData, TVariables> {
  const {
    successMessage,
    errorMessage,
    onSuccess,
    onError: customOnError,
    onCompleted: customOnCompleted,
    ...mutationOptions
  } = options

  const [executeMutation, result] = useMutation<TData, TVariables>(mutation, {
    ...TEAM_MUTATION_CONFIG,
    ...mutationOptions,
    onCompleted: async (data) => {
      if (successMessage) {
        toast.success(successMessage)
      }

      if (onSuccess) {
        await onSuccess(data)
      }

      customOnCompleted?.(data)
    },
    onError: (error) => {
      console.error(errorMessage || "Mutation error:", error)

      if (errorMessage) {
        toast.error(errorMessage)
      }

      if (customOnError) {
        customOnError(error)
      }
    },
  })

  return [executeMutation, result]
}
