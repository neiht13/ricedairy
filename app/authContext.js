'use client'
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === '/';
    const isTimeline = pathname === '/timeline';
    const isDynamicRoute = pathname.includes('[');

    if (!isHome && !isTimeline && !isDynamicRoute) {
      router.push('/');
    }
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ status }}>
      {children}
    </AuthContext.Provider>
  );
}