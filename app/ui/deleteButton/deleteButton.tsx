'use client'
import { deletePostById } from "@/lib/api/api";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { IoReloadSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";


export function DeleteButton({ postId }: { postId: number }){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        try{
        setLoading(true);
       const res = await deletePostById(postId);
       if(!res.ok){
        throw new Error(`database error`)
       }
       setLoading(false);
       router.refresh()
        }catch(e){
            setLoading(false);
            router.refresh();
            throw new Error(`cant delete post issue: ${e}`);
        }
        
    }
    return (
       <div>
    <button
      onClick={handleDelete}
      aria-label="Удалить"
      className="p-2 text-gray-500 hover:text-red-600 transition cursor-pointer"
      disabled={loading}
    >
      {loading ? <IoReloadSharp size={22} className="animate-spin"/> : <AiOutlineDelete size={22} />}
    </button>
  </div>
    )
}