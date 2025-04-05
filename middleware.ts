import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Middleware simple que solo protege las rutas del dashboard
export async function middleware(request: NextRequest) {
  // Solo verificar rutas del dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // Si no hay token, redirigir al login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}; 