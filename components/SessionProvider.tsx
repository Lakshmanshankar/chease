"use client"
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

function CheaseSessionProvider({ children }: { children: ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
export default CheaseSessionProvider;
