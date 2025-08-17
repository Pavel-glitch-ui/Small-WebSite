import NextAuthProvider from "../NextAuthProvider" 
export default function LoginLayout({ children }: { children: React.ReactNode }){
    return(
            <NextAuthProvider>
            {children}
            </NextAuthProvider>
    )
}