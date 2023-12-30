'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CheaseGoogleUser } from '@/types/User';
import axios from 'axios';
import { DatabaseResult } from '@/types/Cosmos';

export default function SignUpComponent() {
  const [user, setUser] = useState<CheaseGoogleUser | null>({
    username: '',
    email: '',
    image: '',
    cheatsheetNames: [],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser!,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const response = await fetch('/api/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json', // Specify the content type
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   console.log(await response.json(), 'Hello');
  // };

  const handleSuperSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', user, {
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
      });
      const result: DatabaseResult = response.data;
      if (result.result) {
        console.log(result.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=''>
      <form onSubmit={handleSuperSubmit}>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' onChange={handleInputChange} value={user?.username || ''} />

        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' id='email' onChange={handleInputChange} value={user?.email || ''} />

        <label htmlFor='password'>Password:</label>
        <input
          type='text'
          name='image'
          id='text'
          onChange={handleInputChange}
          placeholder='Enter Some Crappy URL'
          value={user?.image || ''}
        />
        <button type='submit'>Submit</button>
      </form>
      <div className=' bg mt-11 h-96 w-full rounded-md'></div>
    </div>
  );
}
