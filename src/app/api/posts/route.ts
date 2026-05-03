export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const posts = await prisma.post.findMany({
      where: { client: { userId } },
      include: { client: true },
      orderBy: { scheduledAt: 'asc' }
    });

    // Map DB fields to what the UI expects
    const mappedPosts = posts.map((p: any) => ({
      id: p.id,
      client_id: p.clientId,
      client_name: p.client.name,
      title: p.title,
      caption: p.caption,
      platforms: p.platforms.split(','),
      scheduled_at: p.scheduledAt?.toISOString() || null,
      status: p.status,
      created_at: p.createdAt.toISOString()
    }));

    return NextResponse.json({ posts: mappedPosts });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const body = await req.json();
    const { title, caption, platforms, scheduled_at, client_id } = body;

    const post = await prisma.post.create({
      data: {
        title,
        caption,
        platforms: platforms.join(','),
        scheduledAt: scheduled_at ? new Date(scheduled_at) : null,
        clientId: client_id,
        status: scheduled_at ? 'scheduled' : 'draft'
      }
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const { id } = await req.json();
    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}
