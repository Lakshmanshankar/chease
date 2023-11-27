
import './globals.css'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'

import {authOptions} from '@/lib/Auth'
import SessionProvider from "@/components/SessionProvider"
import Login from './Components/Login';
import { ThemeProvider } from '@/components/ThemeProvider';

import NavBar from '@/components/own/NavBar'
const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>

        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <>
            <NavBar/>
            {children}
            </>
          )}
        </SessionProvider>
      </ThemeProvider>
      </body>
    </html>
  )
}