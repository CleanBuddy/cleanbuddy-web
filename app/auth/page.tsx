"use client";

import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useCurrentUserQuery, UserRole } from "@/lib/api/_gen/gql";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuthFlow } from "@/lib/hooks/use-auth-flow";

function AuthPageContent() {
  const { data, loading } = useCurrentUserQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  const { getPostAuthRedirect, initiateCleanerFlow, initiateCompanyFlow } = useAuthFlow();

  // Store intent in localStorage before authentication
  useEffect(() => {
    if (intent === "cleaner") {
      localStorage.setItem("authIntent", "cleaner");
    } else if (intent === "company") {
      localStorage.setItem("authIntent", "company");
    } else if (intent === "invite") {
      // Invite intent - token is already stored by invite page
      localStorage.setItem("authIntent", "invite");
    }
  }, [intent]);

  // Redirect authenticated users
  useEffect(() => {
    async function handleAuthRedirect() {
      if (data?.currentUser && !loading) {
        const storedIntent = localStorage.getItem("authIntent");
        const inviteToken = localStorage.getItem("inviteToken");

        // If user has an invite intent, redirect back to invite page
        if (storedIntent === "invite" && inviteToken) {
          router.push(`/invite/${inviteToken}`);
          return;
        }

        // If CLIENT wants to become cleaner, initiate upgrade flow
        if (
          storedIntent === "cleaner" &&
          data.currentUser.role === UserRole.Client
        ) {
          localStorage.removeItem("authIntent");
          try {
            await initiateCleanerFlow();
          } catch (error) {
            console.error("Failed to initiate cleaner flow:", error);
            router.push("/cleaner-signup");
          }
          return;
        }

        // If CLIENT wants to register company, initiate company flow
        if (
          storedIntent === "company" &&
          data.currentUser.role === UserRole.Client
        ) {
          localStorage.removeItem("authIntent");
          try {
            await initiateCompanyFlow();
          } catch (error) {
            console.error("Failed to initiate company flow:", error);
            router.push("/company-signup");
          }
          return;
        }

        // For all other cases, use centralized redirect logic
        const destination = getPostAuthRedirect(
          data.currentUser.role,
          storedIntent
        );
        localStorage.removeItem("authIntent");
        router.push(destination);
      }
    }

    handleAuthRedirect();
  }, [data?.currentUser, loading, router, initiateCleanerFlow, initiateCompanyFlow, getPostAuthRedirect]);

  // Show loading skeleton while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Skeleton className="h-14 w-full rounded-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If user is authenticated, show nothing (redirect will happen)
  if (data?.currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold">
            SaaS Starter
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {intent === "cleaner" ? "Apply as a Cleaner" : intent === "company" ? "Register Your Company" : "Welcome Back"}
            </CardTitle>
            <CardDescription>
              {intent === "cleaner"
                ? "Sign in to continue with your cleaner application"
                : intent === "company"
                ? "Sign in to register your cleaning company"
                : "Sign in to your account to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <GoogleSignInButton />

            <p className="text-sm text-muted-foreground text-center mt-4">
              By signing in, you agree to our{" "}
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

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Skeleton className="h-14 w-full rounded-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}
