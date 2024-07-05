import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Assuming you have some way to check authentication (e.g., token in cookies)
  const isAuthenticated = getSession()

  // If trying to access a protected route and not authenticated, redirect to login
  if (!isAuthenticated ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}