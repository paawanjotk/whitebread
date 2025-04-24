import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check for auth token in cookies
    const authCookie = req.cookies.get('sb-grpzzzmtfxrzkevoqggt-auth-token');
    const hasAuthCookie = !!authCookie;

    // If user is not signed in and the current path is not /auth/*, redirect to /auth/signin
    if (!session && !hasAuthCookie && !req.nextUrl.pathname.startsWith('/auth')) {
      const redirectUrl = new URL('/auth/signin', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is signed in and the current path is /auth/*, redirect to /
    if ((session || hasAuthCookie) && req.nextUrl.pathname.startsWith('/auth')) {
      const redirectUrl = new URL('/', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, allow the request to proceed
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 