import { AuthWithRefreshTokenDocument } from "./api/_gen/gql";
import {
  setAuthCookiesClient,
  getAuthCookiesClient,
  clearAuthCookiesClient
} from "./cookie-auth";

// Check if we're running in the browser
const isClient = typeof window !== 'undefined';

// We'll import apolloClient lazily to avoid circular dependency
let apolloClientInstance: typeof import("./apollo-client").apolloClient | null = null;

// Function to update authentication state
async function updateAuthState(isAuthenticated: boolean) {
  if (!isClient) return;

  try {
    const { isAuthenticatedVar } = await import("./apollo-client");
    isAuthenticatedVar(isAuthenticated);
  } catch {
    // Ignore errors during module loading
  }
}

export async function storeTokens(accessToken: string, refreshToken: string) {
  if (!isClient) return;

  // Store tokens in secure httpOnly cookies (maximum security)
  await setAuthCookiesClient(accessToken, refreshToken);
  await updateAuthState(true);
}

export async function getStoredTokens() {
  if (!isClient) {
    return { accessToken: null, refreshToken: null };
  }

  // Get tokens from secure httpOnly cookies (maximum security)
  return await getAuthCookiesClient();
}

export async function clearTokens() {
  if (!isClient) return;

  // Clear secure httpOnly cookies (maximum security)
  await clearAuthCookiesClient();
  updateAuthState(false);
}

export async function signOut() {
  if (!isClient) return;

  try {
    // 1. Call server-side signOut mutation to invalidate sessions
    if (!apolloClientInstance) {
      const { apolloClient } = await import("./apollo-client");
      apolloClientInstance = apolloClient;
    }

    // Import the SignOut mutation
    const { SignOutDocument } = await import("./api/_gen/gql");

    // Call the signOut mutation (ignoring errors as we'll clean up locally anyway)
    try {
      await apolloClientInstance.mutate({
        mutation: SignOutDocument,
      });
    } catch (error) {
      console.warn("Server-side sign out failed, proceeding with local cleanup:", error);
    }

    // 2. Clear all cookies
    await clearTokens();

    // 3. Clear all localStorage items
    localStorage.removeItem('auth_return_url');
    localStorage.removeItem('accessToken');  // Legacy cleanup
    localStorage.removeItem('refreshToken'); // Legacy cleanup

    // 4. Reset Apollo cache and auth state
    await apolloClientInstance.resetStore();

    // 5. Navigate to home page
    window.location.href = '/';
  } catch (error) {
    console.error("Error during sign out:", error);
    // Even if there's an error, try to navigate away
    window.location.href = '/';
  }
}

export async function refreshTokens(): Promise<boolean> {
  const { refreshToken } = await getStoredTokens();

  if (!refreshToken) {
    return false;
  }

  try {
    // Lazy load apollo client to avoid circular dependency
    if (!apolloClientInstance) {
      const { apolloClient } = await import("./apollo-client");
      apolloClientInstance = apolloClient;
    }

    const { data } = await apolloClientInstance.mutate({
      mutation: AuthWithRefreshTokenDocument,
      variables: { token: refreshToken },
    });

    const { accessToken, refreshToken: newRefreshToken } = data.authWithRefreshToken;
    await storeTokens(accessToken, newRefreshToken);
    return true;
  } catch (err) {
    console.error("Failed to refresh tokens:", err);
    await clearTokens();
    return false;
  }
}
