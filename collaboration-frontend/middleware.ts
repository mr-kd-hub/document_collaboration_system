import { NextResponse, NextRequest } from "next/server";
// import { authenticate } from 'auth-provider'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isSignInRoute = request.nextUrl.pathname === '/sign-in';
  console.log("request.nextUrl.pathname",request.nextUrl.pathname);
  

  if (!token && !isSignInRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  if (token && isSignInRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/","/sign-in"],
};
