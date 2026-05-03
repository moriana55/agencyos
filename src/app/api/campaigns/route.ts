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

    const campaigns = await prisma.campaign.findMany({
      where: { client: { userId } },
      include: { client: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const body = await req.json();
    const { name, platform, budget, status, clientId } = body;

    const campaign = await prisma.campaign.create({
      data: {
        name,
        platform,
        budget: parseFloat(budget),
        status: status || 'active',
        clientId
      }
    });

    return NextResponse.json({ campaign });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}
