'use server'
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('userId');
    if(id) {
    try{
        const user = await prisma.user.findUnique({
            where: { id: id }
        })

        return NextResponse.json(user)
    }catch(e){
        throw new Error(`Database error ${e}`)
    }
}else{
    return NextResponse.json({error: 'missing userId'}, { status: 400 })
}
}