import { UserRole, CompanyStatus, CurrentUserQuery } from "@/lib/api/_gen/gql";
import { useRouter } from "next/navigation";

type CurrentUser = NonNullable<CurrentUserQuery["currentUser"]>;

export function useAuthFlow() {
  const router = useRouter();

  /**
   * Determines where to redirect after authentication based on user role and company status
   *
   * New simplified flow:
   * - Roles are assigned at auth time based on intent (CLIENT, CLEANER_ADMIN, CLEANER, GLOBAL_ADMIN)
   * - CLEANER_ADMIN users have a company with status (PENDING, APPROVED, REJECTED)
   * - CLEANER users are created via invite link and auto-approved
   */
  function getPostAuthRedirect(
    user: CurrentUser,
    intent: string | null
  ): string {
    const { role, company } = user;

    // Priority 0: Handle invite intent - redirect back to invite page
    if (intent === "invite") {
      const inviteToken = localStorage.getItem("inviteToken");
      if (inviteToken) {
        return `/invite/${inviteToken}`;
      }
    }

    // Priority 1: CLEANER_ADMIN users
    if (role === UserRole.CleanerAdmin) {
      // No company yet - needs to fill out company application form
      if (!company) {
        return "/company-signup";
      }

      // Company pending approval - go to dashboard (shows pending status)
      if (company.status === CompanyStatus.Pending) {
        return "/dashboard";
      }

      // Company rejected - go to dashboard (shows rejection reason, can reapply)
      if (company.status === CompanyStatus.Rejected) {
        return "/dashboard";
      }

      // Company approved - go to dashboard
      return "/dashboard";
    }

    // Priority 2: CLEANER users always go to dashboard
    if (role === UserRole.Cleaner) {
      return "/dashboard";
    }

    // Priority 3: GLOBAL_ADMIN users go to dashboard
    if (role === UserRole.GlobalAdmin) {
      return "/dashboard";
    }

    // Priority 4: CLIENT users
    // If they had a company or cleaner intent, that's handled at auth time now
    // They just go to dashboard
    return "/dashboard";
  }

  /**
   * Navigate to the company signup/application page
   * This is for CLEANER_ADMIN users who haven't submitted their company info yet
   */
  function goToCompanySignup(): void {
    router.push("/company-signup");
  }

  /**
   * Navigate to the invite acceptance page
   */
  function goToInvitePage(token: string): void {
    router.push(`/invite/${token}`);
  }

  return {
    getPostAuthRedirect,
    goToCompanySignup,
    goToInvitePage,
  };
}
