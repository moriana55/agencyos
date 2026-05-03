export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const knowledge = await prisma.agencyKnowledge.findUnique({
      where: { userId }
    });

    return NextResponse.json({ content: knowledge?.content || '' });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const { content } = await req.json();

    const knowledge = await prisma.agencyKnowledge.upsert({
      where: { userId },
      update: { content },
      create: { userId, content }
    });

    return NextResponse.json({ knowledge });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}
