import { ApolloClient, InMemoryCache, fromPromise, from, makeVar, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getStoredTokens, refreshTokens } from "./auth";
import { createUploadLink } from "apollo-upload-client";
import fragmentTypes from "./api/_gen/fragmentTypes";
import { paginatedConnection } from "./apollo-pagination";

// Check if we're running in the browser
const isClient = typeof window !== 'undefined';

// Reactive variable to track authentication state
export const isAuthenticatedVar = makeVar(false);

// Initialize authentication state safely
if (isClient) {
  // Only initialize on client side
  // We'll initialize this after the module loads to avoid circular dependency
  setTimeout(async () => {
    const { accessToken } = await getStoredTokens();
    isAuthenticatedVar(!!accessToken);
  }, 0);
}

// Replace createHttpLink with createUploadLink for file upload support
console.log('Apollo HTTP Link Configuration:', {
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  window_location: typeof window !== 'undefined' ? window.location.href : 'server',
});

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

// Create WebSocket link for subscriptions
const getWebSocketUrl = () => {
  const wsEndpoint = process.env.NEXT_PUBLIC_WS_ENDPOINT;
  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  let wsUrl: string = '';
  if (wsEndpoint) {
    wsUrl = wsEndpoint;
  } else if (apiEndpoint) {
    wsUrl = apiEndpoint.replace(/^https?/, 'ws');
  }

  console.log('WebSocket Configuration:', {
    NEXT_PUBLIC_WS_ENDPOINT: wsEndpoint,
    NEXT_PUBLIC_API_ENDPOINT: apiEndpoint,
    computed_ws_url: wsUrl,
  });

  return wsUrl;
};

const wsLink = isClient ? new GraphQLWsLink(createClient({
  url: getWebSocketUrl(),
  connectionParams: async () => {
    const { accessToken } = await getStoredTokens();
    const authHeader = accessToken ? `Bearer ${accessToken}` : "";
    console.log('WebSocket connection params:', {
      hasToken: !!accessToken,
      authHeader: authHeader ? `${authHeader.substring(0, 20)}...` : 'empty'
    });
    return {
      authorization: authHeader,
    };
  },
  on: {
    connected: () => console.log('WebSocket connected successfully to:', getWebSocketUrl()),
    closed: (event) => {
      console.log('WebSocket closed:', event);
      // Check if closure was due to authentication failure
      if (event && typeof event === 'object' && 'code' in event) {
        const closeEvent = event as { code: number };
        if (closeEvent.code === 4401 || closeEvent.code === 4403) {
          console.log('WebSocket closed due to authentication failure');
        }
      }
    },
    error: (error) => {
      console.error('WebSocket error:', error);
      // Additional error handling for auth-related issues could be added here
    },
    connecting: () => console.log('WebSocket connecting to:', getWebSocketUrl()),
    opened: (socket) => console.log('WebSocket opened:', socket),
  },
  retryAttempts: 3,
  shouldRetry: () => true,
})) : null;

const authLink = setContext(async (_, { headers }) => {
  const { accessToken, refreshToken } = await getStoredTokens();

  // If access token is missing but refresh token exists, try to refresh
  if (!accessToken && refreshToken && !isRefreshing) {
    console.log('Access token missing but refresh token exists, attempting refresh...');
    const refreshSuccess = await refreshTokens();
    if (refreshSuccess) {
      const { accessToken: newAccessToken } = await getStoredTokens();
      return {
        headers: {
          ...headers,
          authorization: newAccessToken ? `Bearer ${newAccessToken}` : "",
        },
      };
    }
  }

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

let isRefreshing = false;
type RetryRequest = () => void;
let pendingRequests: RetryRequest[] = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return;

  for (const err of graphQLErrors) {
    if (err.extensions?.code === "FORBIDDEN" && !isRefreshing) {
      isRefreshing = true;

      return fromPromise(
        refreshTokens()
          .then(async (success) => {
            isRefreshing = false;
            if (success) {
              resolvePendingRequests();
              // Retry the failed request with new token
              const { accessToken } = await getStoredTokens();
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${accessToken}`,
                },
              }));
            } else {
              window.location.href = "/auth";
            }
            return forward(operation);
          })
          .catch(() => {
            isRefreshing = false;
            window.location.href = "/auth";
            return forward(operation);
          })
      ).flatMap(() => forward(operation));
    }
  }
});

// Split link to route subscriptions to WebSocket and queries/mutations to HTTP
const splitLink = isClient && wsLink ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  from([authLink, httpLink])
) : from([authLink, httpLink]);

export const apolloClient = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    possibleTypes: fragmentTypes.possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          projects: paginatedConnection(),
        },
      },
      Project: {
        fields: {
          // Add project-specific pagination here if needed
        },
      },
      Team: {
        fields: {
          membersConnection: paginatedConnection(),
          memberInvitesConnection: paginatedConnection(),
          projectsConnection: paginatedConnection(),
        },
      },
      User: {
        fields: {
          ownedTeamsConnection: paginatedConnection(),
          memberTeamsConnection: paginatedConnection(),
        },
      },
    },
  }),
});
