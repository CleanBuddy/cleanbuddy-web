import { useEffect, useRef } from 'react';
import { refreshTokens } from '@/lib/auth';

/**
 * Hook to proactively refresh access tokens before they expire
 *
 * The access token has a 3-day lifespan on the backend.
 * This hook refreshes the token every 2 days (48 hours) to ensure
 * the user stays authenticated even during periods of inactivity.
 */
export function useTokenRefresh() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Refresh tokens every 2 days (48 hours)
    // This is less than the 3-day access token lifespan
    const REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 2; // 2 days in milliseconds

    // Start the refresh interval
    intervalRef.current = setInterval(async () => {
      console.log('Proactive token refresh triggered');
      try {
        const success = await refreshTokens();
        if (success) {
          console.log('Tokens refreshed successfully');
        } else {
          console.warn('Token refresh failed');
        }
      } catch (error) {
        console.error('Error during proactive token refresh:', error);
      }
    }, REFRESH_INTERVAL);

    // Also do an initial refresh check when the component mounts
    // This ensures we refresh tokens if the user has been inactive
    (async () => {
      try {
        await refreshTokens();
      } catch (error) {
        // Silently fail on initial refresh - user might not be logged in
        console.debug('Initial token refresh check:', error);
      }
    })();

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
