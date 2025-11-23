"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useCurrentUserTeamsWithProjectsQuery, useCreateTeamMutation } from "@/lib/api/_gen/gql"
import { getStoredTokens } from "@/lib/auth"
import { isAuthenticatedVar } from "@/lib/apollo-client"


interface Project {
  id: string
  displayName: string
  teamId: string
}
interface Team {
  id: string
  displayName: string
  role: "owner" | "member"
  projects: Project[]
}
interface TeamContextType {
  selectedTeam: Team | null
  selectedProject: Project | null
  setSelectedTeam: (teamID: string, projectID?: string) => void

  // Navigation state
  isNavigating: boolean
  shouldShowOnboarding: boolean
  navigationError: string | null

  // Centralized navigation methods
  navigateAfterProjectDeletion: (teamId: string, deletedProjectId: string) => Promise<void>
  navigateAfterTeamDeletion: (deletedTeamId: string) => Promise<void>
  navigateToTeamOnboarding: (teamId: string) => void
  navigateToProject: (teamId: string, projectId: string) => void
  ensureValidTeamAndProject: () => void

  user: {
    loading: boolean
    error?: Error
    data?: {
      id: string
      displayName: string
      email: string

      teams: Team[]
    }
  }
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

export function TeamProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isCreatingDefaultTeam, setIsCreatingDefaultTeam] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationError, setNavigationError] = useState<string | null>(null)
  const [createTeam] = useCreateTeamMutation()

  // Initialize client-side state and authentication state together
  useEffect(() => {
    setIsClient(true)

    // Check authentication immediately when component mounts
    const checkAuth = async () => {
      setIsCheckingAuth(true)
      const { accessToken } = await getStoredTokens();
      const hasToken = !!accessToken;
      isAuthenticatedVar(hasToken); // Keep reactive var in sync for other parts of the app
      setIsAuthenticated(hasToken); // Use local state to trigger re-render
      setIsCheckingAuth(false)
    };
    checkAuth();
  }, []) // Run only once on mount

  // Simple regex parsing - extract team and project IDs from any /teams/ URL
  const teamMatch = pathname.match(/\/teams\/([^/]+)/)
  const projectMatch = pathname.match(/\/teams\/[^/]+\/projects\/([^/]+)/)

  const pathTeamId = teamMatch ? teamMatch[1] : null
  const pathProjectId = projectMatch ? projectMatch[1] : null


  // Load user, teams, and projects data in a single query
  const shouldSkipQuery = !isAuthenticated || !isClient;

  const { data, loading, error, refetch } = useCurrentUserTeamsWithProjectsQuery({
    // Skip the query if we don't have an access token (user not authenticated) or not yet client-side
    skip: shouldSkipQuery,
    // Add error policy to handle authentication errors gracefully
    errorPolicy: 'all',
    // Use cache-and-network to ensure fresh data after authentication while still using cache when available
    fetchPolicy: 'cache-and-network',
    // Use cache-first for subsequent fetches to avoid unnecessary network requests
    nextFetchPolicy: 'cache-first'
  })

  // Detect corrupted cache state (has data object but no currentUser) and refetch
  // This can happen during Fast Refresh in development
  useEffect(() => {
    if (!loading && data && !data.currentUser && isAuthenticated && isClient) {
      refetch()
    }
  }, [loading, data, isAuthenticated, isClient, refetch])


  // Process teams data with their projects
  const teams: Team[] = React.useMemo(() => {
    if (!data?.currentUser) {
      return []
    }

    const ownedTeams = data.currentUser.ownedTeamsConnection.edges || []
    const memberTeams = data.currentUser.memberTeamsConnection.edges || []

    const teamMap = new Map()

    // Process owned teams with projects
    ownedTeams.forEach(edge => {
      if (edge?.node) {
        const projects = edge.node.projectsConnection?.edges?.map(projectEdge => ({
          id: projectEdge?.node.id,
          displayName: projectEdge?.node.displayName,
          teamId: edge.node.id
        })) || []

        teamMap.set(edge.node.id, {
          id: edge.node.id,
          displayName: edge.node.displayName,
          role: "owner",
          projects: projects
        })
      }
    })

    // Process member teams with projects
    memberTeams.forEach(edge => {
      if (edge?.node) {
        const projects = edge.node.projectsConnection?.edges?.map(projectEdge => ({
          id: projectEdge?.node.id,
          displayName: projectEdge?.node.displayName,
          teamId: edge.node.id
        })) || []

        teamMap.set(edge.node.id, {
          id: edge.node.id,
          displayName: edge.node.displayName,
          role: "member",
          projects: projects
        })
      }
    })

    return Array.from(teamMap.values())
  }, [data])




  // Synchronous computation of current team and project from URL
  const selectedTeam = useMemo(() => {
    if (!data?.currentUser || !pathTeamId) {
      return null
    }
    return teams.find(team => team.id === pathTeamId) || null
  }, [data?.currentUser, teams, pathTeamId])

  const selectedProject = useMemo(() => {
    if (!selectedTeam || !pathProjectId) {
      return null
    }
    return selectedTeam.projects.find(project => project.id === pathProjectId) || null
  }, [selectedTeam, pathProjectId])

  const handleSetSelectedTeam = useCallback((teamID: string, projectID?: string) => {
    if (projectID) {
      router.push(`/dashboard/teams/${teamID}/projects/${projectID}`)
    } else {
      // No standalone team page - redirect to dashboard
      router.push('/dashboard')
    }
  }, [router])

  // Compute if we should show onboarding
  const shouldShowOnboarding = useMemo(() => {
    // Show onboarding if on dashboard and selected team has no projects
    if (pathname === '/dashboard' && selectedTeam && selectedTeam.projects.length === 0) {
      return true
    }
    // Show onboarding if on dashboard and first team has no projects
    if (pathname === '/dashboard' && teams.length > 0 && teams[0].projects.length === 0) {
      return true
    }
    return false
  }, [pathname, selectedTeam, teams])

  // Centralized navigation method: Navigate to a specific project
  const navigateToProject = useCallback((teamId: string, projectId: string) => {
    if (isNavigating) return
    setNavigationError(null)
    router.push(`/dashboard/teams/${teamId}/projects/${projectId}`)
  }, [router, isNavigating])

  // Centralized navigation method: Navigate to team onboarding (dashboard with team context)
  const navigateToTeamOnboarding = useCallback((teamId: string) => {
    if (isNavigating) return
    setNavigationError(null)
    // Include teamId in URL query params so dashboard knows which team to show
    router.push(`/dashboard?teamId=${teamId}`)
  }, [router, isNavigating])

  // Centralized navigation method: Handle navigation after project deletion
  const navigateAfterProjectDeletion = useCallback(async (teamId: string, deletedProjectId: string) => {
    if (isNavigating) return

    setIsNavigating(true)
    setNavigationError(null)

    try {
      // Refetch to get latest data
      const result = await refetch()

      if (!result.data?.currentUser) {
        throw new Error('Failed to fetch user data')
      }

      // Find the team that the deleted project belonged to
      const allTeams = [
        ...(result.data.currentUser.ownedTeamsConnection.edges || []),
        ...(result.data.currentUser.memberTeamsConnection.edges || [])
      ]

      const team = allTeams.find(edge => edge?.node?.id === teamId)?.node

      if (!team) {
        // Team no longer exists, go to dashboard
        router.push('/dashboard')
        return
      }

      const remainingProjects = team.projectsConnection?.edges || []

      if (remainingProjects.length > 0) {
        // Navigate to first remaining project in the team
        const firstProject = remainingProjects[0]?.node
        if (firstProject) {
          router.push(`/dashboard/teams/${teamId}/projects/${firstProject.id}`)
        }
      } else {
        // No projects left in team - show onboarding for this team
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Navigation error after project deletion:', error)
      setNavigationError('Failed to navigate after project deletion')
      // Fallback to dashboard
      router.push('/dashboard')
    } finally {
      setIsNavigating(false)
    }
  }, [refetch, router, isNavigating])

  // Centralized navigation method: Handle navigation after team deletion
  const navigateAfterTeamDeletion = useCallback(async (deletedTeamId: string) => {
    if (isNavigating) return

    setIsNavigating(true)
    setNavigationError(null)

    try {
      // Refetch to get latest data
      const result = await refetch()

      if (!result.data?.currentUser) {
        throw new Error('Failed to fetch user data')
      }

      // Get all remaining teams
      const allTeams = [
        ...(result.data.currentUser.ownedTeamsConnection.edges || []),
        ...(result.data.currentUser.memberTeamsConnection.edges || [])
      ]

      if (allTeams.length > 0) {
        // User has other teams - switch to first team
        const firstTeam = allTeams[0]?.node
        if (firstTeam) {
          const projects = firstTeam.projectsConnection?.edges || []

          if (projects.length > 0) {
            // Navigate to first project of first team
            const firstProject = projects[0]?.node
            if (firstProject) {
              router.push(`/dashboard/teams/${firstTeam.id}/projects/${firstProject.id}`)
              return
            }
          } else {
            // Team has no projects - show onboarding
            router.push('/dashboard')
            return
          }
        }
      }

      // No teams exist - redirect to dashboard
      // The auto-create default team logic will kick in
      router.push('/dashboard')
    } catch (error) {
      console.error('Navigation error after team deletion:', error)
      setNavigationError('Failed to navigate after team deletion')
      // Fallback to dashboard
      router.push('/dashboard')
    } finally {
      setIsNavigating(false)
    }
  }, [refetch, router, isNavigating])

  // Centralized validation method: Ensure current team and project are valid
  const ensureValidTeamAndProject = useCallback(() => {
    // This is now handled by the redirect effect
    // Kept for backward compatibility
    if (!selectedTeam && pathTeamId) {
      router.push('/dashboard')
    } else if (!selectedProject && pathProjectId) {
      router.push('/dashboard')
    }
  }, [selectedTeam, selectedProject, pathTeamId, pathProjectId, router])

  // Auto-create default team if user has no teams
  useEffect(() => {
    const createDefaultTeam = async () => {
      if (data?.currentUser && teams.length === 0 && !isCreatingDefaultTeam && !loading) {
        setIsCreatingDefaultTeam(true)
        setNavigationError(null)
        try {
          const result = await createTeam({
            variables: {
              displayName: data.currentUser.email,
            },
            refetchQueries: ["CurrentUserTeamsWithProjects"],
            awaitRefetchQueries: true,
          })

          if (result.data?.createTeam) {
            console.log(`Default team created: ${result.data.createTeam.displayName}`)
          }
        } catch (error) {
          console.error("Failed to create default team:", error)
          setNavigationError("Failed to create default team. Please refresh the page.")
        } finally {
          setIsCreatingDefaultTeam(false)
        }
      }
    }

    createDefaultTeam()
  }, [data?.currentUser, teams.length, isCreatingDefaultTeam, loading, createTeam])

  // Single redirect effect - handles all navigation
  // Use ref to track if we've already redirected to prevent loops
  const hasRedirected = React.useRef(false)

  // Reset redirect flag when teams list changes (team created/deleted)
  useEffect(() => {
    hasRedirected.current = false
  }, [teams.length])

  useEffect(() => {
    // Skip while loading, creating default team, or if no data yet
    if (loading || isCreatingDefaultTeam || !data?.currentUser || teams.length === 0) {
      hasRedirected.current = false
      return
    }

    // Prevent infinite redirect loops
    if (hasRedirected.current) {
      return
    }

    // Get the route prefix (everything before /teams/)
    const routePrefix = pathname.replace(/\/teams\/.*$/, '') || '/dashboard'

    // Invalid team in URL - redirect to dashboard
    if (pathTeamId && !selectedTeam) {
      hasRedirected.current = true
      router.push('/dashboard')
      return
    }

    // Invalid project in URL - redirect to dashboard for onboarding
    if (pathProjectId && selectedTeam && !selectedProject) {
      hasRedirected.current = true
      router.push('/dashboard')
      return
    }

    // On dashboard but no team in URL - check for teamId query param or use first team
    if (pathname.startsWith('/dashboard') && !pathTeamId && teams.length > 0) {
      hasRedirected.current = true

      // Check for teamId in query params (e.g., /dashboard?teamId=xyz)
      const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
      const targetTeamId = searchParams.get('teamId')

      // Find target team or fall back to first team
      const targetTeam = targetTeamId
        ? teams.find(t => t.id === targetTeamId) || teams[0]
        : teams[0]

      const firstProject = targetTeam.projects[0]

      if (firstProject) {
        // Has projects - redirect to first project
        router.push(`/dashboard/teams/${targetTeam.id}/projects/${firstProject.id}`)
      }
      // No projects - stay on /dashboard for onboarding with target team
      return
    }
  }, [loading, isCreatingDefaultTeam, teams, pathTeamId, pathProjectId, router, pathname, selectedTeam, selectedProject, data?.currentUser])

  // Handle authentication errors by redirecting to auth page
  useEffect(() => {
    if (error && !loading) {
      // Check if the error is related to authentication
      const isAuthError = error.message.includes('Unauthorized') ||
        error.message.includes('Forbidden') ||
        error.message.includes('Authentication required');

      if (isAuthError) {
        // Redirect to auth page (token cleanup handled by auth flow)
        isAuthenticatedVar(false);
        router.push('/auth');
      }
    }
  }, [error, loading, router])

  const value: TeamContextType = useMemo(() => {
    // User is loading if:
    // 1. Still checking authentication
    // 2. Not yet client-side
    // 3. Query is actively loading (not skipped)
    // 4. Creating default team
    const userLoading = isCheckingAuth || !isClient || loading || isCreatingDefaultTeam

    return {
      user: {
        loading: userLoading,
        error: error,
        data: data?.currentUser != null ? {
          id: data.currentUser.id,
          displayName: data.currentUser.displayName,
          email: data.currentUser.email,
          teams: teams,
        } : undefined,
      },
      selectedTeam: selectedTeam,
      selectedProject: selectedProject,
      setSelectedTeam: handleSetSelectedTeam,

      // Navigation state
      isNavigating: isNavigating,
      shouldShowOnboarding: shouldShowOnboarding,
      navigationError: navigationError,

      // Centralized navigation methods
      navigateAfterProjectDeletion,
      navigateAfterTeamDeletion,
      navigateToTeamOnboarding,
      navigateToProject,
      ensureValidTeamAndProject,
    }
  }, [
    teams,
    data,
    loading,
    error,
    selectedTeam,
    selectedProject,
    handleSetSelectedTeam,
    isClient,
    isCheckingAuth,
    isCreatingDefaultTeam,
    isNavigating,
    shouldShowOnboarding,
    navigationError,
    navigateAfterProjectDeletion,
    navigateAfterTeamDeletion,
    navigateToTeamOnboarding,
    navigateToProject,
    ensureValidTeamAndProject,
  ])

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider")
  }
  return context
}
