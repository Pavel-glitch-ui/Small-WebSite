"use client"
import { getUser } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import InfinityPageSkeleton from "./infinityPageSkeleton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type { Post } from "@/lib/types";
import { MdEdit } from "react-icons/md";
import { DeleteButton } from "../deleteButton/deleteButton";


export function PostContainer({ post }: { post: Post }){
    const { data: user, isLoading, isError, error, isPending } = useQuery({
      queryKey: ['user', post.authorId],
      queryFn:() => getUser(post.authorId),
    })
    const session = useSession();
    const userId = session.data?.user?.id
    const date = new Date(post.createdAt)
    if (isLoading) {
    return (
      <InfinityPageSkeleton />
    )
  }
  if (isError || !user) {
    return <p className="text-sm text-red-500">Не удалось загрузить автора</p>
  }
    return (
        <div
      key={post.id}
      className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 
        bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      {isPending ? (
        <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse flex-shrink-0" />
      ) : user.image ? (
        <Image
          width={56}
          height={56}
          src={user.image}
          className="rounded-full object-cover flex-shrink-0 ring-2 ring-transparent group-hover:ring-indigo-400 transition-all"
          alt={user.name || "User avatar"}
          loading="lazy"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gray-300 flex-shrink-0" />
      )}
      <div className="flex-1">
        <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm mb-3 space-x-2">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {user.name || "Unknown"}
          </span>
          <span>•</span>
          <time dateTime={date.toISOString()} className="capitalize">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <Link
          href={`/post/${post.id}/post`}
          className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Читать далее →
        </Link>
      </div>
      {session.data?.user && (
        <div className="flex items-center gap-2">
        <Link
          href={`/editPost/${post.id}/post`}
          className="p-2 text-gray-500 hover:text-indigo-600 transition"
        >
          <MdEdit size={22} />
        </Link>
        <DeleteButton postId={Number(post.id)}/>
        </div>
      )}
      
      </div>
    )
    
}