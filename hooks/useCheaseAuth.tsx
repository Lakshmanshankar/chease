'use client';
import { CheaseGoogleUser, DatabaseResult } from '@/types/User';
import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import React from 'react';
import axios from 'axios';

interface ErrorType {
  message: string;
}

interface CheaseGoogleUserContextType extends CheaseGoogleUser {
  isError: ErrorType | null;
  isLoading: boolean;
  user: CheaseGoogleUser;
  setUser: React.Dispatch<SetStateAction<CheaseGoogleUser>>;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

const cheaseAuthContext = createContext<CheaseGoogleUserContextType>({} as CheaseGoogleUserContextType);

export function CheaseAuthProvider({ children }: { children: ReactNode }) {
  const values = useCheaseAuthData();
  return <cheaseAuthContext.Provider value={values}>{children}</cheaseAuthContext.Provider>;
}

export function useCheaseAuth() {
  return useContext(cheaseAuthContext);
}

const useCheaseAuthData = (): CheaseGoogleUserContextType => {
  const [user, setUser] = useState<CheaseGoogleUser>({} as CheaseGoogleUser);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        await loginUser();
      } catch (error) {
        setError({ message: `Unable to Login User While Init ${error}` });
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    getUser();
    console.log('helllo', user, 'Jelly');
  }, []);

  const loginUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/login', {
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
      });
      const result: DatabaseResult = response.data;
      if (result.result) {
        setUser(result.data[0] as CheaseGoogleUser);
      } else {
        setError({ message: result.data[0] });
      }
    } catch (error) {
      setError({ message: `Unable to Login User ${error}` });
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      // console.error('Logout failed:', error);
      setError({ message: `Unable to Logout of Session ${error}` });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...user,
    isError: error,
    isLoading: isLoading,
    user: user,
    loginUser: loginUser,
    setUser: setUser,
    logoutUser: logoutUser,
  };
};
