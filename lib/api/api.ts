import type { Post } from "../types" 

type NextCursor = string | null
export type result = {
    posts: Post[],
    NextCursor: NextCursor
}
export async function getPosts(params: {
    limit: number,
    cursor: string | null | void
}): Promise<result> {
    const url = new URL('api/posts', window.location.origin)
    const { limit, cursor } = params;
    url.searchParams.set('limit', String(limit));
    if(params.cursor){
        url.searchParams.set('cursor', cursor || '');
    }
    try{
        const res = await fetch(url);
        if(!res.ok) throw new Error('server error')
        return res.json();
    }catch(e){
        throw new Error('Something went wrong' + e)
    }
}
export async function getUser(userId: string){
    const url = new URL('api/user', window.location.origin)
    url.searchParams.set('userId', userId.toString());
    try{
        const res = await fetch(url);
        if(!res.ok) throw new Error(`Server Error`)
        return res.json()

    }catch(e){
        throw new Error(`Something went wrong ${e}`)
    }
}

export async function getUserPosts(id: string): Promise<Post[]>{
    const url = new URL('api/userPostById', window.location.origin)
    url.searchParams.set('id', id.toString());
    try{
        const res = await fetch(url);
        if(!res.ok) throw new Error(`Server Error`)
        return res.json()

    }catch(e){
        throw new Error(`Something went wrong ${e}`)
    }
}

export async function deletePostById(id: number){
    const url = new URL('api/deletePostById', window.location.origin)
    url.searchParams.set('id', id.toString());
    try{
        const res = await fetch(url, {
            method: "DELETE"
        });
        if(!res.ok) {
            const errText = await res.text() 
        throw new Error(`Server Error ${errText}`) }
        return res.json()

    }catch(e){
        throw new Error(`Something went wrong ${e}`)
    }
}