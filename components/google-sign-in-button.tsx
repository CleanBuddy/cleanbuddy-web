"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthWithIdentityProviderMutation, AuthIdentityKind } from "@/lib/api/_gen/gql";
import { storeTokens, clearTokens } from "@/lib/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { Loader2Icon } from "lucide-react";
import { apolloClient, isAuthenticatedVar } from "@/lib/apollo-client";

interface GoogleSignInButtonProps {
    className?: string;
    title?: string;
    returnTo?: string;
}

export function GoogleSignInButton({
    className,
    title = "Sign in with Google",
    returnTo
}: GoogleSignInButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    const [authWithIdentityProvider] = useAuthWithIdentityProviderMutation();

    const handleGoogleSuccess = async (tokenResponse: { code: string }) => {
        setIsLoading(true);

        try {
            const { data } = await authWithIdentityProvider({
                variables: {
                    code: tokenResponse.code,
                    kind: AuthIdentityKind.GoogleOAuth2,
                },
            });

            if (data?.authWithIdentityProvider) {
                const { accessToken, refreshToken } = data.authWithIdentityProvider;

                // IMPORTANT: Wait for tokens to be stored before proceeding
                await storeTokens(accessToken, refreshToken);

                // Reset Apollo cache to ensure fresh data is fetched after authentication
                await apolloClient.resetStore();

                // Check for cleaner intent
                const authIntent = localStorage.getItem("authIntent");
                let redirectTo: string;

                if (authIntent === "cleaner") {
                    // If applying as cleaner, redirect to application form
                    localStorage.removeItem("authIntent");
                    redirectTo = "/cleaner-signup";
                } else {
                    // Navigate to return URL or dashboard
                    redirectTo = returnTo || localStorage.getItem("auth_return_url") || "/dashboard";
                    localStorage.removeItem("auth_return_url");
                }

                // Use window.location.href to force a full page reload
                // This ensures cookies are properly set and auth state is fresh
                window.location.href = redirectTo;
            }
        } catch (err) {
            console.error("Authentication error:", err);
            // On error, fall back to auth page
            router.push("/auth");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = (error?: any) => {
        // Ignore popup blocked errors - user might have intentionally closed it
        if (error?.type === 'popup_closed' || error?.error === 'popup_closed_by_user') {
            console.log("Google authentication popup was closed");
            setIsLoading(false);
            return;
        }

        console.error("Google authentication failed:", error);
        setIsLoading(false);

        // Only redirect to auth page for actual errors, not user cancellations
        if (error && error.type !== 'popup_closed') {
            router.push("/auth");
        }
    };

    const login = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        flow: "auth-code",
        ux_mode: "popup",
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        redirect_uri: "postmessage",
    });

    const handleClick = async () => {
        try {
            setIsClearing(true);

            // Clear any existing tokens to prevent "session already associated" errors
            // This ensures a clean authentication state before initiating OAuth flow
            await clearTokens();

            // Clear Apollo cache to remove any cached user data
            await apolloClient.clearStore();

            // Update authentication state
            isAuthenticatedVar(false);

            // Store return URL if provided
            if (returnTo) {
                localStorage.setItem("auth_return_url", returnTo);
            }

            // Small delay to ensure cleanup is complete before OAuth popup
            await new Promise(resolve => setTimeout(resolve, 100));

            setIsClearing(false);

            // Trigger Google login popup
            login();
        } catch (error) {
            console.error("Error during auth preparation:", error);
            setIsClearing(false);
            // Still try to login even if cleanup fails
            login();
        }
    };

    return (
        <Button
            size="lg"
            onClick={handleClick}
            disabled={isLoading || isClearing}
            className={`h-12 sm:h-14 rounded-full pl-2 sm:pl-3 pr-6 sm:pr-8 text-base sm:text-lg font-medium bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-md hover:shadow-[#4285F4]/50 hover:shadow-lg transition-all duration-200 ease-out will-change-transform inline-flex items-center relative ${className}`}
        >
            <div className="bg-white rounded-full p-2 sm:p-2.5 flex items-center justify-center">
                {isLoading || isClearing ? (
                    <Loader2Icon className="h-6 w-6 sm:h-7 sm:w-7 animate-spin text-gray-600" />
                ) : (
                    <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                )}
            </div>
            <span className="ml-1.5 sm:ml-2">{title}</span>
        </Button>
    );
}
