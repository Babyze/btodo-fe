"use client";
import { Session } from "next-auth";
import { SessionProvider as NextSessionProvider } from "next-auth/react";

export function SessionProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}
