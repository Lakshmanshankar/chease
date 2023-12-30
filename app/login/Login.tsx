'use client';
import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

import { Bungee } from 'next/font/google';

const bungee = Bungee({ weight: '400', subsets: ['latin'] });

function Login() {
  const { data: session } = useSession();
  if (session) {
    return redirect('/home');
  } else {
    return (
      <div className='login-screen min-h-screen w-full'>
        <div className=' login-screen-container flex h-screen w-full flex-col items-center justify-center backdrop-blur-sm'>
          <div className=' flex flex-col items-center justify-center p-10 py-5 md:p-0'>
            <h1 className={`${bungee.className} text-6xl font-extrabold lg:text-7xl`}> Welcome to Chease </h1>
            <h2 className={`${bungee.className} py-4 text-lg font-bold lg:text-2xl`}>
              Connect your thoughts, Map Chease unlocks creativity
            </h2>
          </div>
          <Button
            onClick={() => signIn('google')}
            type='button'
            className={`${bungee.className} border-1 border-primary_back bg-transparent p-10  text-2xl backdrop-blur-lg`}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
