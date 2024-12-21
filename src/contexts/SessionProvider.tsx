"use client";

import { Session } from "next-auth";
import { SessionProvider as SP } from "next-auth/react";

export default function SessionProvider({
    session,
    children,
}: {
    session: Session | null;
    children: React.ReactNode;
}) {
    return <SP session={session}>{children}</SP>;
}
