"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Building2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import {
  useValidateCleanerInviteTokenQuery,
  useAcceptCleanerInviteMutation,
  useCurrentUserQuery
} from "@/lib/api/_gen/gql";
import Link from "next/link";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [acceptSuccess, setAcceptSuccess] = useState(false);

  const { data: userData, loading: userLoading } = useCurrentUserQuery();
  const { data, loading, error } = useValidateCleanerInviteTokenQuery({
    variables: { token },
    skip: !token,
  });

  const [acceptInvite] = useAcceptCleanerInviteMutation();

  // Store invite token in localStorage when user is not logged in
  useEffect(() => {
    if (data?.validateCleanerInviteToken.valid && !userData?.currentUser) {
      localStorage.setItem("inviteToken", token);
      localStorage.setItem("authIntent", "invite");
    }
  }, [data, userData, token]);

  // Handle invite acceptance for logged-in users
  const handleAcceptInvite = async () => {
    setIsAccepting(true);
    setAcceptError(null);

    try {
      const result = await acceptInvite({
        variables: { token },
      });

      if (result.data?.acceptCleanerInvite.success) {
        setAcceptSuccess(true);
        localStorage.removeItem("inviteToken");
        localStorage.removeItem("authIntent");

        // Redirect to cleaner profile setup after a short delay
        setTimeout(() => {
          router.push("/cleaner-profile-setup");
        }, 2000);
      }
    } catch (err) {
      setAcceptError(err instanceof Error ? err.message : "Failed to accept invite");
    } finally {
      setIsAccepting(false);
    }
  };

  // Check if user arrived after OAuth and has a pending invite
  useEffect(() => {
    const storedToken = localStorage.getItem("inviteToken");
    const storedIntent = localStorage.getItem("authIntent");

    if (userData?.currentUser && storedIntent === "invite" && storedToken === token) {
      // User just logged in with invite intent - auto-accept
      handleAcceptInvite();
    }
  }, [userData?.currentUser, token]);

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <div className="w-full max-w-md space-y-4">
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show success state
  if (acceptSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Welcome to the Team!</CardTitle>
              <CardDescription>
                You've successfully joined {data?.validateCleanerInviteToken.company?.companyName}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Redirecting you to complete your profile setup...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !data?.validateCleanerInviteToken.valid) {
    const errorMessage = data?.validateCleanerInviteToken.errorMessage || error?.message || "Invalid invite link";

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Invalid Invite</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to Process Invite</AlertTitle>
                <AlertDescription>
                  This invite link may have expired, been revoked, or already been used.
                  Please contact your company administrator for a new invite.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Link href="/">
                  <Button variant="outline">Return Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const company = data.validateCleanerInviteToken.company;
  const invite = data.validateCleanerInviteToken.invite;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold">
            CleanBuddy
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">You're Invited!</CardTitle>
            <CardDescription>
              {company?.companyName} has invited you to join their cleaning team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Info */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{company?.companyName}</span>
              </div>
              {company?.companyCity && (
                <p className="text-sm text-muted-foreground pl-7">
                  {company.companyCity}
                </p>
              )}
              {company?.businessType && (
                <p className="text-sm text-muted-foreground pl-7">
                  {company.businessType === "limited_liability" ? "SRL" :
                   company.businessType === "sole_proprietorship" ? "PFA" :
                   company.businessType}
                </p>
              )}
            </div>

            {/* Custom Message */}
            {invite?.message && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 italic">"{invite.message}"</p>
              </div>
            )}

            {/* Expiry Notice */}
            {invite?.expiresAt && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  This invite expires {new Date(invite.expiresAt).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Accept Error */}
            {acceptError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{acceptError}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            {userData?.currentUser ? (
              // Logged in user - show accept button
              <Button
                className="w-full"
                size="lg"
                onClick={handleAcceptInvite}
                disabled={isAccepting}
              >
                {isAccepting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Accepting Invite...
                  </>
                ) : (
                  "Accept Invite & Join Team"
                )}
              </Button>
            ) : (
              // Not logged in - show Google sign in
              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Sign in with Google to accept this invite
                </p>
                <GoogleSignInButton />
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              By accepting, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
