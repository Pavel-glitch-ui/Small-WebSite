import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import type { Adapter } from "next-auth/adapters"
import prisma from '@/prisma'
// Set up google provider and NextAuth
export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
  session: {strategy: "jwt"},
  ...authConfig,
    callbacks: {
        async authorized({ request, auth }){
            // if user is authenticated
            if(auth){
                return true
            }
            // if user is not authenticated and request is not for login page
            if(request.nextUrl.pathname !== '/login'){
                return false
            }
            // if user is not authenticated and request is for login page
            return true
        },
        async jwt({token, account}){
            // if we get account
            if(account){
                return{
                    // return our token and new information
                    ...token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    refresh_token: account.refresh_token,
                }
            }else if(Date.now() < Number(token?.expires_at) * 1000){
                // if token still valid return token
                return token
            }else{
                if(!token.refresh_token){
                    throw TypeError('Missing refresh token!')
                }
                try{
                    // trying to get new access token and refresh (optionaly)
                    const response = await fetch('https://oauth2.googleapis.com/token',{
                        method: "POST",
                        body: new URLSearchParams({
                           client_id: process.env.AUTH_GOOGLE_ID!,
                           client_secret: process.env.AUTH_GOOGLE_SECRET!,
                           grant_type: "refresh_token",
                           refresh_token: String(token.refresh_token!),
                        }),
                    })
                    const tokensOrError = await response.json()
                    if(!response.ok) throw tokensOrError;
                    const newToken = tokensOrError as {
                        access_token: string
                        expires_in: number
                        refresh_token?: string
                    }
                    return {
                        ...token,
                        access_token: newToken.access_token,
                        expires_at: Math.floor(Date.now() / 1000 + newToken.expires_in),
                        refresh_token: newToken.refresh_token ?
                        newToken.refresh_token : token.refresh_token
                    }
                }catch(e){
                    console.error('error refreshing access token' + e)
                    token.error = "RefreshTokenError"
                    return token
                }
            }
            
        },
        async session({session, token, user}){
            // catch token error using session
            // @ts-ignore
            session.error = token.error as typeof session.error;
            session.user.id = token.sub || session.user.id || '';
            return session
        }
    }
})


declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}

declare module "next-auth" {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token?: string
    error?: "RefreshTokenError"
  }
}