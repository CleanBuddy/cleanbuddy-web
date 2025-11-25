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
    // Priority 1: Users who need to complete cleaner application form
    if (userRole === UserRole.PendingApplication) {
      return "/cleaner-signup";
    }

    // Priority 2: Users who need to complete company application form
    if (userRole === UserRole.PendingCompanyApplication) {
      return "/company-signup";
    }

    // Priority 3: Handle company intent for CLIENT users
    if (intent === "company" && userRole === UserRole.Client) {
      return "/company-signup";
    }

    // Priority 4: Handle cleaner intent for CLIENT users
    if (intent === "cleaner" && userRole === UserRole.Client) {
      return "/cleaner-signup";
    }

    // Priority 5: Users with pending, rejected, or active cleaner/company status
    if (
      userRole === UserRole.PendingCleaner ||
      userRole === UserRole.PendingCompanyAdmin ||
      userRole === UserRole.RejectedCleaner ||
      userRole === UserRole.RejectedCompanyAdmin ||
      userRole === UserRole.Cleaner ||
      userRole === UserRole.GlobalAdmin ||
      userRole === UserRole.CompanyAdmin
    ) {
      return "/dashboard";
    }

    // Priority 6: CLIENT users go to dashboard
    return "/dashboard";
  }

  /**
   * Initiates the cleaner application flow for existing users
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

  /**
   * Initiates the company admin application flow for existing users
   */
  async function initiateCompanyFlow(): Promise<void> {
    try {
      // Update role to PENDING_COMPANY_APPLICATION via mutation
      await updateUserRole({
        variables: { role: UserRole.PendingCompanyApplication }
      });

      // Refetch user data to get updated role
      await apolloClient.refetchQueries({
        include: ["CurrentUser"]
      });

      // Redirect to company application form
      router.push("/company-signup");
    } catch (error) {
      console.error("Error initiating company flow:", error);
      throw error;
    }
  }

  return {
    getPostAuthRedirect,
    initiateCleanerFlow,
    initiateCompanyFlow
  };
}
