import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// import nextAuth, { AuthOptions } from 'next-auth';
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const getAuth = () => getServerSession(authOptions);
