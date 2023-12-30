import { authOptions } from '@/lib/authconf';
import NextAuth from 'next-auth';
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// const authOptions: AuthOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || "Not Found",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "Not Found",
//         }),
//     ],
//     secret: process.env.JWT_SECRET,
// };
// export default nextAuth(authOptions);
