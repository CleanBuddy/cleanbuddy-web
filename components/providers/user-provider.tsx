"use client";

import React, { createContext, useContext } from "react";
import { useCurrentUserQuery } from "@/lib/api/_gen/gql";

interface UserContextType {
  user: {
    id: string;
    displayName: string;
    role: string;
    email: string;
  } | null;
  loading: boolean;
  error?: Error;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, error, refetch } = useCurrentUserQuery();

  const value: UserContextType = {
    user: data?.currentUser || null,
    loading,
    error: error as Error | undefined,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a UserProvider");
  }
  return context;
}
