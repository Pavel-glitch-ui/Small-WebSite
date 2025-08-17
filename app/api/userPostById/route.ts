'use server'
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
 
 
export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')?.toString();
    if(!id){
        return NextResponse.json({ error: 'cannot find id in search params'}, { status: 401 })
    }
    try{
        const res = await prisma.post.findMany({
            where: {
                authorId: id
            }
        })
        if(res.length < 1){
            return NextResponse.json({message: 'posts not found'}, { status: 404 })
        }
        return NextResponse.json(res, { status: 200 })
    }catch(e){
        return NextResponse.json({error: `something went wrong ${e}`}, { status: 400 })
    }

} 