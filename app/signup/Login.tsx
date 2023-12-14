
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

function Login() {
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                <h1>User Logged in</h1>
                <h1>{session.user?.email}</h1>
                <h1>{session.user?.name}</h1>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        );
    } else {
        return (
            <div>
                <h1>User not logged in</h1>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    }
}

export default Login;
