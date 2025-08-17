import NextAuth from "next-auth"
import  authConfig  from "./auth.config";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = req.auth;
  const isLoginPath = req.nextUrl.pathname.startsWith("/login");

  if (!isAuthenticated && !isLoginPath) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  if(isAuthenticated && isLoginPath){
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next();
})

export const config = {
 matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


