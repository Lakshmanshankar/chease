"use client";
import { AccountAvatar } from "@/components/own/Avatar";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { status, data } = useSession();
  const user = data?.user;
  if (status === "loading") {
    return <>loading</>;
  }
  if (user && user.image !== null && user.email && user.name) {
    return <>
      {user.name} | {user.email} {user.image}
      <AccountAvatar src={user.image!} alt={user.name} />

      <Image<ToggleButton> />
      <button onClick={() => signOut()}> Signout </button>
    </>;
  }
}
