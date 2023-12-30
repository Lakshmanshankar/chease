'use client';
import React from 'react';
import { useCheaseAuth } from '@/hooks/useCheaseAuth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import SignoutClient from './SignoutClient';
import { CardWithForm } from '@/components/custom/Card';

export default function HomePage() {
  const auth = useCheaseAuth();
  const { data: session } = useSession();
  console.log(auth);
  if (session) {
    if (auth.isLoading) {
      return <div> Loading...</div>;
    } else if (auth.isError) {
      return <div className=' m-2 bg-red-500 p-12 '> Error:{auth.isError.message}</div>;
    } else if (auth.user) {
      return (
        <div className=' kurunji'>
          <h1 className='kurunji bg-bgaccent'> User logged in</h1>
          <h1 className='mullai bg-bgaccent'> User logged in</h1>
          <h1 className='marutham bg-bgaccent'> User logged in</h1>
          {auth.user.id}
          <SignoutClient />
        </div>
      );
    } else {
      return <div> This shoould Not Come</div>;
    }
  } else {
    redirect('/login');
  }
}
