"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import AccountAvatar from "./AccountAvatar"
import { Inter } from "next/font/google"
import { useTheme } from "next-themes"

const inter = Inter({ weight: "400", subsets: ["latin"] })
import { useSession, signOut } from "next-auth/react"
import Login from "@/app/Components/Login"

// export default function AccountAvatar() {
//     const { status, data } = useSession();
//     const user = data?.user
//     if (status === "loading") {
//         return <></>
//     }
//     if (user && user.image && user.email && user.name) {
//         return <>
//             <AvatarStyled src={user.image} alt={user.name} />
//             {/* <ToggleButton />
//             <Button onClick={() => signOut()} variant="destructive"> Signout </Button> */}
//         </>
//     }
//     else {
//         <></>
//     }
// }

export function AccountDialogMenu() {
    const {setTheme} = useTheme();
    const { status,data} = useSession();
    const user  = data?.user;
    if (user && user.image && user.email && user.name) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"empty"} size={"sm"} className="rounded-full focus:bg-transparent mt-2">
                    <AccountAvatar />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`${inter.className} w-72 p-2 rounded-lg`}>
                <DropdownMenuLabel className="text-center text-lg font-thin">
                    Profile
                </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-thin text-lg">
                        {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {user.email}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button className=" w-full " variant={"destructive"} onClick={()=>signOut()}> Signout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
    }
    else{
        <Login/>
    }
}
