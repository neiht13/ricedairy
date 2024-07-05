'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const {data: session, status} = useSession();
    const router = useRouter();

  useEffect(() => {
    // Implement your authentication logic here
    // For example, check for a valid token in localStorage
    debugger
    if (status === 'loading') {
        router.push('/login');
      }  }, []);

  return (
    <AuthContext.Provider value={{ status }}>
      {children}
    </AuthContext.Provider>
  );
}