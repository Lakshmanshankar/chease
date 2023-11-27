"use client"
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { Inter_Tight } from 'next/font/google'
import React from 'react'
const interT = Inter_Tight({weight:"400",subsets:["latin"]});
export default function Login() {
  return (
    <div className={` ${interT.className} w-full min-h-screen flex items-center justify-center flex-col`}>
        <h1 className=' text-8xl font-extrabold text-center dark:text-yellow-300 text-yellow-600 py-3'>
             Chease 
        </h1>
        <h2 className=' font-bold text-2xl first-letter:capitalize py-1'> please Login With your Google Account To Continue</h2>
        <Button onClick={() =>signIn('google')} variant={"ghost"} className='w-96 h-14 px-5 py-5 text-2xl my-4' > Google</Button>
    </div>
  )
}
