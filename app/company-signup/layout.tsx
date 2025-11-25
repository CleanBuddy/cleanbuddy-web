"use client";

import { UserProvider } from "@/components/providers/user-provider";

export default function CompanySignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
