import { UserRole, useUpdateUserRoleMutation } from "@/lib/api/_gen/gql";
import { useRouter } from "next/navigation";
import { apolloClient } from "@/lib/apollo-client";

export function useAuthFlow() {
  const router = useRouter();
  const [updateUserRole] = useUpdateUserRoleMutation();

  /**
   * Determines where to redirect after authentication based on user role and intent
   */
  function getPostAuthRedirect(
    userRole: UserRole,
    intent: string | null
  ): string {
    // Priority 1: Users who need to complete application form
    if (userRole === UserRole.PendingApplication) {
      return "/cleaner-signup";
    }

    // Priority 2: Users with pending or active cleaner status
    if (
      userRole === UserRole.PendingCleaner ||
      userRole === UserRole.Cleaner ||
      userRole === UserRole.GlobalAdmin ||
      userRole === UserRole.CompanyAdmin
    ) {
      return "/dashboard";
    }

    // Priority 3: CLIENT users go to dashboard
    return "/dashboard";
  }

  /**
   * Initiates the cleaner application flow for existing users
   * This replaces the token clearing hack
   */
  async function initiateCleanerFlow(): Promise<void> {
    try {
      // Update role to PENDING_APPLICATION via mutation
      await updateUserRole({
        variables: { role: UserRole.PendingApplication }
      });

      // Refetch user data to get updated role
      await apolloClient.refetchQueries({
        include: ["CurrentUser"]
      });

      // Redirect to application form
      router.push("/cleaner-signup");
    } catch (error) {
      console.error("Error initiating cleaner flow:", error);
      throw error;
    }
  }

  return {
    getPostAuthRedirect,
    initiateCleanerFlow
  };
}
