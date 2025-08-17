'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '../../../auth'
import prisma from '@/prisma'
import { redirect } from 'next/navigation'


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
    id: z.coerce.number(),
    title: z.string('Please enter a title text of at least 3 characters').min(3),
    description: z.string('Please enter a description text of at least 8 characters').min(8),
    content: z.coerce.string('Please enter a text of at least 10 characters').min(10),
    createdAt: z.string(),
    updatedAt: z.string(),
})
const EditPost = FormSchema.omit({ createdAt: true, updatedAt: true})
export async function editPost(prevState: State | undefined, data: FormData): Promise<State | undefined>{
    const session = await auth();
    if(!session?.user?.id){
        return {
            message: 'You must be logged in to create a post',
    }
}
    const safeData = EditPost.safeParse(Object.fromEntries(data.entries()));
    if(!safeData.success){
        return {
            errors: safeData.error?.flatten().fieldErrors,
            message: 'Missing fields!'
        }
    }

    const { title, description, content, id } = safeData.data;
    try{
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                description: description,
                content: content,
                authorId: session.user.id
            }
        })
        revalidatePath('/')
        redirect('/profile')
        return {
            message: 'ok'
        }
    }catch(e){
        return {
            message: `Database error ${e}`
        }
    }
    
}

