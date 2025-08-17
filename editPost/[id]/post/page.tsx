import { getPostById } from "@/lib/api/getPostById";
import type { Post } from "@/lib/types";
import { EditForm } from "@/ui/editPost/editForm";

export default async function Page({ params }: { params: Promise<{id: string}>}){
    const Params = await params;
    const id = Params.id;
    const post = await getPostById(Number(id)) as Post;
    return (
        <EditForm post={post} />
    )
}