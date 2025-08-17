import { getPostById } from "@/lib/api/getPostById"; 
import { getUserById } from "@/lib/api/getUserById"; 
import { MDXPreview } from "@/ui/createPost/Markdown/MarkDownPreview";
import type { User } from "@/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Post } from "@/lib/types";
export default async function Page({ params }: { params: Promise<{id: string}>}) {
    const props = await params;
    const id = props.id;
    const post = await getPostById(Number(id)) as Post;
    const user = await getUserById(post.authorId) as User;
    const date = post.createdAt.toISOString().split('T')[0];
    if (!post) {
      notFound();
    }
    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e2939] p-6 rounded-lg shadow-lg text-gray-800 dark:text-gray-200 space-y-4">
          <div className="flex items-center space-x-3">
    <Image
    width={40}
    height={40}
      src={user.image}
      alt="Human photo"
      className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
    />
    <div className="text-sm">
      <span className="font-medium">{user.name}</span>
      <span className="block text-xs text-gray-500 dark:text-gray-400">{date}</span>
    </div>
  </div>
  <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
  <div className="prose dark:prose-invert max-w-none">
  <MDXPreview MDXText={String(post?.content)} />
  </div>
</div>
)
}