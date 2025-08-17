'use client'
import InfinityPage from "./ui/posts/InfinityPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function page() { 
    const queryClient = new QueryClient()
    return (
    <QueryClientProvider client={queryClient}>
    <main>
    <section>
        <InfinityPage />
    </section>
    </main>
    </QueryClientProvider>
    )
}
