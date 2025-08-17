import type { Post } from "@/lib/types";
import InfinityPageSkeleton from "../posts/infinityPageSkeleton";
import { JSX } from "react";


export function MyPostSkeleton({ lenght }: { lenght: number}){
    const posts: JSX.Element[] = []
    if(lenght){
    for(let i = 0; i < lenght; i++){
        posts.push(<InfinityPageSkeleton key={i}/> )
    } 
}
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-10">
  <section className="mb-6">
    <div className="h-8 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
  </section>
        {posts}
  </div>
    )
}