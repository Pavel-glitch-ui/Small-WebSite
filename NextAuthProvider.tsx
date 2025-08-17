'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const client = new QueryClient()

export default function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return (
  <QueryClientProvider client={client}>
  <SessionProvider>
    {children}
    </SessionProvider>
  </QueryClientProvider>
    )
}