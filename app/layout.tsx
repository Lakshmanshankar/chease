
import './globals.css'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/ThemeProvider';
import CheaseSessionProvider from "@/components/SessionProvider"
const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheaseSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </CheaseSessionProvider>
      </body>
    </html>
  )
}