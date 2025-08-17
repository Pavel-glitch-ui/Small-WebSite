'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '../../../auth'
import prisma from '@/prisma'

export type State = {
    errors?: {
        id?: string[];
        title?: string[];
        description?: string[];
        content?: string[];
        createdAt?: string[];
        updatedAt?: string[];
    };
    message?: null | 'ok' | 'You must be logged in to create a post' | 'Missing fields!' | `Database error ${string}`;
}

const FormSchema = z.object({
    id: z.string(),
    title: z.string('Please enter a title text of at least 3 characters').min(3),
    description: z.string('Please enter a description text of at least 8 characters').min(8),
    content: z.coerce.string('Please enter a text of at least 10 characters').min(10),
    createdAt: z.string(),
    updatedAt: z.string(),
})
const CreatePost = FormSchema.omit({ id: true, createdAt: true, updatedAt: true})
export async function createPost(prevState: State | undefined, data: FormData): Promise<State | undefined>{
    const session = await auth();
    if(!session?.user?.id){
        return {
            message: 'You must be logged in to create a post',
    }
}
    const safeData = CreatePost.safeParse(Object.fromEntries(data.entries()));
    if(!safeData.success){
        return {
            errors: safeData.error?.flatten().fieldErrors,
            message: 'Missing fields!'
        }
    }

    const { title, description, content } = safeData.data;
    try{
        await prisma.post.create({
            data: {
                title: title,
                description: description,
                content: content,
                authorId: session.user.id
            }
        })
        revalidatePath('/');
        return {
            message: 'ok'
        }
    }catch(e){
        return {
            message: `Database error ${e}`
        }
    }
   
}

