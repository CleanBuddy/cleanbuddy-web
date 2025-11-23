// Client-side secure cookie authentication utilities
// This file only contains client-side functions to avoid next/headers import issues

// Client-side functions (for components)
export async function setAuthCookiesClient(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return;

  // Use fetch to call API route that sets secure httpOnly cookies
  await fetch('/api/auth/set-tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken, refreshToken }),
  });
}

export async function getAuthCookiesClient() {
  if (typeof window === 'undefined') return { accessToken: null, refreshToken: null };

  try {
    const response = await fetch('/api/auth/get-tokens');
    const data = await response.json();
    return {
      accessToken: data.accessToken || null,
      refreshToken: data.refreshToken || null,
    };
  } catch (error) {
    console.error('Failed to get auth cookies:', error);
    return { accessToken: null, refreshToken: null };
  }
}

export async function clearAuthCookiesClient() {
  if (typeof window === 'undefined') return;

  try {
    await fetch('/api/auth/clear-tokens', { method: 'POST' });
  } catch (error) {
    console.error('Failed to clear auth cookies:', error);
  }
}
