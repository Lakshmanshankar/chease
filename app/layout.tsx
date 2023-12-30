import './globals.css';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';
import CheaseSessionProvider from '@/components/SessionProvider';
import { CheaseAuthProvider } from '@/hooks/useCheaseAuth';
const inter = Inter({ subsets: ['latin'] });

import React from 'react';
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {/* for Nextauth Session */}
          <CheaseSessionProvider>
            {/* for CheaseAuth Session  */}
            <CheaseAuthProvider>{children}</CheaseAuthProvider>
          </CheaseSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
