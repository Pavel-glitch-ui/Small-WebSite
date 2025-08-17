'use server'
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { Res } from "@/lib/types";
export  async function GET( req : NextRequest ){
    const { searchParams } = new URL(req.url);
    const  cursor = searchParams.get('cursor');
    const limit = searchParams.get('limit') || '10';
    const limitNumber = parseInt(limit as string, 10);
    const posts = await prisma.post.findMany({
        take: limitNumber + 1,
        orderBy: {createdAt: 'desc'},
        cursor: cursor ? 
        { id: parseInt(cursor as string, 10)} :
        undefined,
        skip: cursor ? 1 : 0,
    })
    let NextCursor = null;
    if(posts.length > limitNumber){
        const NextItem = posts.pop()!;
        NextCursor = String(NextItem.id);
    }
  return NextResponse.json({ posts, NextCursor });
}

