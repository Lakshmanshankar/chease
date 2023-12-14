"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import { CheaseUser } from '@/lib/types';
import Login from "./Login";

export default function SignUpComponent() {
  const [user, setUser] = useState<CheaseUser | null>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser!,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/signup",{
      method:"POST",
      headers: {
      "Content-Type": "application/json", // Specify the content type
    },
      body:JSON.stringify(user),
    })
    console.log(await response.json(),"Hello")
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleInputChange}
          value={user?.username || ''}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleInputChange}
          value={user?.email || ''}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleInputChange}
          value={user?.password || ''}
        />
      <button type="submit">Submit</button>
      </form>



      <div className=" w-full h-96 mt-11 bg">  
      <Login/>      
      </div>

    </div>
  );
}
