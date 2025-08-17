'use client'
import { PostContainer } from './postContainer';
import { getPosts } from '@/lib/api/api';
import { Post } from '@/lib/types'; 
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfinityPageSkeleton from './infinityPageSkeleton';
import { useInView } from "react-intersection-observer";
import type { result } from '@/lib/api/api';
export default function InfinityPage(){
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status, error } = useInfiniteQuery({
        initialPageParam: null,
        queryKey: [`posts`],
        queryFn: ({ pageParam }: { pageParam: string | null} ) => getPosts({ cursor: pageParam, limit: 10 }),
        getNextPageParam: (last) => last.NextCursor,
        staleTime: 1000 * 60 * 2,
    }  
    );
    const posts = data ? 
        data.pages.flatMap((page: result) => page.posts) :
    [];
    const { ref, inView} = useInView({
        rootMargin: "200px",
    });
    useEffect(() => {
        if(inView && hasNextPage && !isFetchingNextPage){
            fetchNextPage();
        }
    }, [inView])
    if (status === "pending") return (
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <InfinityPageSkeleton />
        <InfinityPageSkeleton />
        <InfinityPageSkeleton />
        <InfinityPageSkeleton />
        </div>
    );
    if (status === "error")
    return <p>Ошибка: {(error as Error).message}</p>;
    return (
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6'>
            {posts.map((post: Post) => (
                <PostContainer key={post.id} post={post}/>
            ))}
        {isFetchingNextPage && <p className='mt-8 text-center text-gray-500'>Загружаем ещё…</p>}

      <div ref={ref} />

      {!hasNextPage && <p className="mt-8 text-center text-gray-500">Больше нет постов</p>}
    </div>
    </div>
        
    )
}