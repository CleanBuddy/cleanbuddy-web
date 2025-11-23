"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo-client";
import { useTokenRefresh } from "@/hooks/use-token-refresh";

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proactively refresh tokens to prevent expiration during inactivity
  useTokenRefresh();

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
