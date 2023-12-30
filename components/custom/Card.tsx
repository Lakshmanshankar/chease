import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function CardWithForm() {
  const { data: session } = useSession();
  if (session) {
    return redirect('/home');
  } else {
    return (
      <Card className=' w-[550px] rounded-2xl px-5  py-10 shadow-xl shadow-fuchsia-400'>
        <CardHeader>
          <CardTitle className=' py-10 text-5xl'>Welcome to Chease</CardTitle>
          <CardDescription>Chease let's you to create Cheatsheets and Mindmaps.</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle className=' p-3 text-center text-3xl font-bold'> Login </CardTitle>
          <Button onClick={() => signIn('google')} className=' w-full py-8 text-xl font-light'>
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className='flex justify-between'></CardFooter>
      </Card>
    );
  }
}
