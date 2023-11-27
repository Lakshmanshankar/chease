"use client"
// import { ToggleButton } from "@/components/ToggleBtn";
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { UserRound } from "lucide-react"

type ImgProps = {
    src: string,
    alt: string,
}

function AvatarStyled({ src, alt }: ImgProps) {
    return (
        <Avatar>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>
                <UserRound />
            </AvatarFallback>
        </Avatar>
    )
}

export default function AccountAvatar() {
    const { status, data } = useSession();
    const user = data?.user
    if (status === "loading") {
        return <></>
    }
    if (user && user.image && user.email && user.name) {
        return <>
            <AvatarStyled src={user.image} alt={user.name} />
            {/* <ToggleButton />
            <Button onClick={() => signOut()} variant="destructive"> Signout </Button> */}
        </>
    }
    else {
        <></>
    }
}

