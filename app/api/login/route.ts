import { getServerSession } from 'next-auth';

// types
import { CheaseGoogleUser } from '@/types/User';

// db & utils
import CheaseDb from '@/lib/db';
import { extractUsernameFromEmail } from '@/lib/cheaseutil';

export async function POST() {
  const data = await getServerSession();
  if (!data) {
    return Response.json({ message: 'User Session Not Found ', data });
  }
  const cheasedb = CheaseDb.build('cosmosdb');
  const res = await cheasedb.init();
  if (res.result && data && data.user) {
    const { user } = data;
    const googleUser: CheaseGoogleUser = {
      id: extractUsernameFromEmail(user.email as string) as string,
      email: user.email as string,
      username: user.name!,
      image: user.image as string,
      cheatsheetNames: [],
    };
    const resource = await cheasedb.login(googleUser);
    return Response.json(resource);
  }
  return Response.json({ message: 'Unable to Set User In Cosmos', data });
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
//
// export async function POST(req: NextRequest) {
//   const { username, email, password } = await req.json();
//   const cheasedb = CheaseDb.build('cosmosdb');
//   const item: CheaseUserProfile = {
//     id: extractUsernameFromEmail(email) as string,
//     username: username,
//     email: email,
//     password: password,
//     accentColor: AccentColorType.Mullai,
//   };
//   const res = await cheasedb.init();
//   if (res.result) {
//     const resource = await cheasedb.loginExpensive(item);
//     console.log(resource.data);
//     return Response.json(resource.data);
//   }
// }
//
//
//// import { NextRequest } from 'next/server';

// import { CheaseUserProfile } from '@/types/User';
// import { AccentColorType } from '@/types/CheatsheetT';
//
// import { extractUsernameFromEmail } from '@/lib/cheaseutil';
// import CheaseDb from '@/lib/db';
//

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

// export async function POST(req: NextRequest) {
//   const { username, email, password } = await req.json();
//   const cheasedb = CheaseDb.build('cosmosdb');
//   const item: CheaseUserProfile = {
//     id: extractUsernameFromEmail(email) as string,
//     username: username,
//     email: email,
//     password: password,
//     accentColor: AccentColorType.Kurunji,
//   };
//   const res = await cheasedb.init();
//   if (res.result) {
//     const resource = await cheasedb.loginExpensive(item);
//     console.log(resource.data);
//     return Response.json(resource.data);
//   }
// }
