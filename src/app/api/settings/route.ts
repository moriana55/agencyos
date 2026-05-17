export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const settings = await prisma.settings.findUnique({ where: { userId } });
    const data = settings ? JSON.parse(settings.data) : {};

    return NextResponse.json({ settings: data });
  } catch (error) {
    return NextResponse.json({ settings: {} });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const dataStr = JSON.stringify(body);

    await prisma.settings.upsert({
      where: { userId },
      update: { data: dataStr },
      create: { userId, data: dataStr },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}
