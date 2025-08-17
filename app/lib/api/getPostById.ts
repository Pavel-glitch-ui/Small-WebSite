import prisma from "@/prisma";

export async function getPostById(id: number): Promise<any> {
    try{
        const res = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        return res
    }catch(e){
        return {
            error: `Database error ${e}`
        }
    }
}