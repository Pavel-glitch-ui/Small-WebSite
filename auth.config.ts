import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
const authConfig = { providers:
     [Google({clientId: process.env.AUTH_GOOGLE_ID, 
    clientSecret: process.env.AUTH_GOOGLE_SECRET, 
    authorization: {
        params: {
      access_type: "offline",    
      prompt: "consent",         
      scope: "openid profile email"
    }}
})
], trustHost: true } satisfies NextAuthConfig;
export default authConfig