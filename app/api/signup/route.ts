import SingletonCosmos from "@/lib/cosmos";
import { NextRequest } from "next/server";
import { extractUsernameFromEmail } from "@/lib/cheaseutil";

import CheaseDb from "@/lib/db"
import { AccentColorType, CheaseUserProfile } from "@/lib/types";

export function GET(req: NextRequest) {
    return Response.json({ mssage: "Hello this is From Singup" })
}

// export async function POST(req:NextRequest){
//     const {username,email,password} = await req.json();
//     await SingletonCosmos.init();
//     const dataItem = {
//         email:email,
//         username:username,
//         password:password
//     }
//     const responese = await SingletonCosmos.insertitem(dataItem as unknown as Body);
//     console.log(responese)
//     return  Response.json({mssage:"Hello this is From Singup"})
// }

export async function POST(req: NextRequest) {
    const { username, email, password } = await req.json();
    const cheasedb = CheaseDb.build('cosmosdb');
    const item:CheaseUserProfile = {
        id:extractUsernameFromEmail(email) as string,
        username:username,
        email:email,
        password:password,
        accentColor:AccentColorType.Kurunji
    }

    const res = await cheasedb.init()
    if(res.result){
        const resource = await cheasedb.loginExpensive(item);
        console.log(resource.data)
        return Response.json(resource.data)
    }
}