"use client";

import { UserProvider } from "@/components/providers/user-provider";

export default function CleanerProfileSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
