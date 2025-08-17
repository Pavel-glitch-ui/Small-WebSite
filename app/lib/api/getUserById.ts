import prisma from "@/prisma";

export async function getUserById(userId: string): Promise<any>{
    try{  
        const res = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return res
    }catch(e){
        return{
            error: `database error ${e}`
        }
    }
}