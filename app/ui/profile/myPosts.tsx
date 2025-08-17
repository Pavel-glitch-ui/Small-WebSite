'use client'
import { getUserPosts } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PostContainer } from "../posts/postContainer";
import { MyPostSkeleton } from "./myPostSkeleton";
export function MyPosts(){
    const Session = useSession();
    const id = Session.data?.user?.id;
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUserPosts(String(id))
    })
    const num = data?.length
    if(isError) return (<div className=" items-center"><p className=" text-red-500 text-base">Не удалось загрузить ваши посты {error.message}</p></div>)
    if(!data) return (<div></div>)
    if(isLoading) return <MyPostSkeleton lenght={Number(num)}/>
    return (
       <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
          📝 Мои посты
        </h1>
        <p className="text-gray-600 text-sm">
          Здесь отображаются все посты, которые вы опубликовали.
        </p>
      </section>

      <section className="space-y-6">
        {data.map((p) => (
          <PostContainer key={p.id} post={p} />
        ))}
      </section>
    </div>
    )
    
}