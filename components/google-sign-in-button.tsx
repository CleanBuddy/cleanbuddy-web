"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthWithIdentityProviderMutation, AuthIdentityKind, CurrentUserDocument } from "@/lib/api/_gen/gql";
import { storeTokens } from "@/lib/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { Loader2Icon } from "lucide-react";
import { apolloClient, isAuthenticatedVar } from "@/lib/apollo-client";
import { useAuthFlow } from "@/lib/hooks/use-auth-flow";

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
    const { getPostAuthRedirect } = useAuthFlow();

    const [authWithIdentityProvider] = useAuthWithIdentityProviderMutation();

    const handleGoogleSuccess = async (tokenResponse: { code: string }) => {
        setIsLoading(true);

        try {
            const authIntent = localStorage.getItem("authIntent");

            const { data } = await authWithIdentityProvider({
                variables: {
                    code: tokenResponse.code,
                    kind: AuthIdentityKind.GoogleOAuth2,
                    intent: authIntent,
                },
            });

            if (data?.authWithIdentityProvider) {
                const { accessToken, refreshToken } = data.authWithIdentityProvider;

                await storeTokens(accessToken, refreshToken);
                await apolloClient.resetStore();
                isAuthenticatedVar(true);

                const { data: userData } = await apolloClient.query({
                    query: CurrentUserDocument,
                    fetchPolicy: 'network-only',
                });

                if (userData?.currentUser) {
                    const destination = getPostAuthRedirect(
                        userData.currentUser.role,
                        authIntent
                    );
                    // Don't clear authIntent for invite - the invite page needs it
                    if (authIntent !== "invite") {
                        localStorage.removeItem("authIntent");
                    }
                    router.push(destination);
                }
            }
        } catch (err) {
            console.error("Authentication error:", err);
            router.push("/auth");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleError = (error?: any) => {
        // Ignore popup blocked errors - user might have intentionally closed it
        if (error?.type === 'popup_closed' || error?.error === 'popup_closed_by_user') {
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

    const handleClick = () => {
        // Store return URL if provided
        if (returnTo) {
            localStorage.setItem("auth_return_url", returnTo);
        }

        // Trigger Google login popup
        login();
    };

    return (
        <Button
            size="lg"
            onClick={handleClick}
            disabled={isLoading}
            className={`h-12 sm:h-14 rounded-full pl-2 sm:pl-3 pr-6 sm:pr-8 text-base sm:text-lg font-medium bg-[#4285F4] hover:bg-[#3367D6] text-white shadow-md hover:shadow-[#4285F4]/50 hover:shadow-lg transition-all duration-200 ease-out will-change-transform inline-flex items-center relative ${className}`}
        >
            <div className="bg-white rounded-full p-2 sm:p-2.5 flex items-center justify-center">
                {isLoading ? (
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
