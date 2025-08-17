"use client"
import { useSession } from "next-auth/react";
import { MyPosts } from "@/ui/profile/myPosts";
import Image from 'next/image'
import { ProfileSkeleton } from "@/ui/profile/profileSkeleton";


export default function Page() {
    const { data, status } = useSession();
    if(status === 'loading') return <ProfileSkeleton />
    return (
        <main>
            <section
  className="flex flex-col md:flex-row items-center justify-center
    bg-white rounded-2xl shadow-md
    p-6 sm:p-8 md:p-10 lg:p-12 mx-auto max-w-xl
    space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300"
>
  <div
    className="w-28 h-28 md:w-36 md:h-36
      rounded-full overflow-hidden
      ring-4 ring-indigo-300 shadow-sm
      flex-shrink-0"
  >
    <Image
      src={data?.user?.image || ""}
      width={300}
      height={300}
      className="object-cover w-full h-full"
      alt="Your image"
    />
  </div>

    <div className="flex flex-col justify-center text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight mb-2">
      {data?.user?.name || "Неизвестный пользователь"}
        </h2>
        <p className="text-gray-600 text-sm">
      Добро пожаловать в ваш профиль! Ниже вы можете просмотреть ваши посты.
        </p>
    </div>
        </section>
            <MyPosts />
        </main>
    )

       
}